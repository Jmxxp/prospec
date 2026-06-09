create extension if not exists pgcrypto with schema extensions;

alter table public.store_sessions
add column if not exists token text;

create or replace function public.admin_store_owner_column()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_column text;
begin
  select column_name
  into v_column
  from information_schema.columns
  where table_schema = 'public'
    and table_name = 'stores'
    and column_name in ('admin_id', 'created_by')
  order by case column_name when 'admin_id' then 1 else 2 end
  limit 1;

  if v_column is null then
    raise exception 'A tabela stores precisa ter admin_id ou created_by.';
  end if;

  return v_column;
end;
$$;

revoke all on function public.admin_store_owner_column() from public;

create or replace function public.store_token_hash(p_token text)
returns text
language sql
security definer
set search_path = public, extensions
as $$
  select encode(extensions.digest(coalesce(p_token, ''), 'sha256'), 'hex')
$$;

revoke all on function public.store_token_hash(text) from public;

create or replace function public.store_password_matches(p_password text, p_password_hash text)
returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if p_password_hash is null then
    return false;
  end if;

  if p_password_hash = p_password then
    return true;
  end if;

  if p_password_hash = public.store_token_hash(p_password) then
    return true;
  end if;

  begin
    if p_password_hash = extensions.crypt(p_password, p_password_hash) then
      return true;
    end if;
  exception
    when others then
      return false;
  end;

  return false;
end;
$$;

revoke all on function public.store_password_matches(text, text) from public;

create or replace function public.store_id_from_session(p_token text)
returns uuid
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_store_id uuid;
begin
  select ss.store_id
  into v_store_id
  from public.store_sessions ss
  join public.stores s on s.id = ss.store_id
  where coalesce(ss.expires_at, now() + interval '1 day') > now()
    and s.deleted_at is null
    and (
      ss.token = p_token
      or ss.token_hash = p_token
      or ss.token_hash = public.store_token_hash(p_token)
      or (
        ss.token_hash like '$%'
        and ss.token_hash = extensions.crypt(p_token, ss.token_hash)
      )
    )
  limit 1;

  if v_store_id is null then
    raise exception 'Sessão da loja inválida.';
  end if;

  return v_store_id;
end;
$$;

revoke all on function public.store_id_from_session(text) from public;

create or replace function public.store_login(p_username text, p_password text)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_store public.stores%rowtype;
  v_token text;
begin
  select *
  into v_store
  from public.stores
  where username = lower(trim(p_username))
    and deleted_at is null
  limit 1;

  if v_store.id is null or not public.store_password_matches(p_password, v_store.password_hash) then
    raise exception 'Usuário ou senha inválidos.';
  end if;

  v_token := encode(extensions.gen_random_bytes(32), 'hex');

  insert into public.store_sessions (store_id, token, token_hash, expires_at)
  values (v_store.id, v_token, public.store_token_hash(v_token), now() + interval '30 days');

  return jsonb_build_object(
    'token', v_token,
    'id', v_store.id,
    'store_id', v_store.id,
    'name', v_store.name,
    'username', v_store.username
  );
end;
$$;

grant execute on function public.store_login(text, text) to anon, authenticated;

create or replace function public.admin_open_store(p_store_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_owner_column text;
  v_token text;
  v_store public.stores%rowtype;
begin
  if auth.uid() is null then
    raise exception 'Admin não autenticado.';
  end if;

  v_owner_column := public.admin_store_owner_column();

  execute format(
    'select *
     from public.stores
     where id = $1
       and %I = $2
       and deleted_at is null
     limit 1',
    v_owner_column
  )
  into v_store
  using p_store_id, auth.uid();

  if v_store.id is null then
    raise exception 'Loja não encontrada para este admin.';
  end if;

  v_token := encode(extensions.gen_random_bytes(32), 'hex');

  insert into public.store_sessions (store_id, token, token_hash, expires_at)
  values (v_store.id, v_token, public.store_token_hash(v_token), now() + interval '30 days');

  return jsonb_build_object(
    'token', v_token,
    'id', v_store.id,
    'store_id', v_store.id,
    'name', v_store.name,
    'username', v_store.username
  );
end;
$$;

grant execute on function public.admin_open_store(uuid) to authenticated;

create or replace function public.store_logout(p_token text)
returns void
language sql
security definer
set search_path = public, extensions
as $$
  delete from public.store_sessions
  where token = p_token
     or token_hash = p_token
     or token_hash = public.store_token_hash(p_token)
$$;

grant execute on function public.store_logout(text) to anon, authenticated;

create or replace function public.store_get_tags(p_token text)
returns table(label text)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_store_id uuid;
begin
  v_store_id := public.store_id_from_session(p_token);

  return query
  select pt.label
  from public.prospect_tags pt
  where pt.store_id = v_store_id
  order by pt.label;
end;
$$;

grant execute on function public.store_get_tags(text) to anon, authenticated;

insert into public.prospect_tags (store_id, label)
select s.id, seed.label
from public.stores s
cross join (values ('Receita vencida'), ('Aniversário')) as seed(label)
where s.deleted_at is null
on conflict (store_id, label) do nothing;

notify pgrst, 'reload schema';
