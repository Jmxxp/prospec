alter table public.store_sessions
add column if not exists token text;

create or replace function public.store_id_from_session(p_token text)
returns uuid
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_column record;
  v_store_id uuid;
begin
  for v_column in
    select column_name
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'store_sessions'
      and column_name not in ('store_id', 'expires_at', 'created_at', 'updated_at')
      and data_type in ('text', 'uuid', 'character varying')
    order by case column_name
      when 'token' then 1
      when 'session_token' then 2
      when 'id' then 3
      else 9
    end
  loop
    execute format(
      'select ss.store_id
       from public.store_sessions ss
       join public.stores s on s.id = ss.store_id
       where ss.%I::text = $1
         and coalesce(ss.expires_at, now() + interval ''1 day'') > now()
         and s.deleted_at is null
       limit 1',
      v_column.column_name
    )
    into v_store_id
    using p_token;

    if v_store_id is not null then
      return v_store_id;
    end if;
  end loop;

  raise exception 'Sessão da loja inválida.';
end;
$$;

revoke all on function public.store_id_from_session(text) from public;

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

  insert into public.store_sessions (store_id, token, expires_at)
  values (v_store.id, v_token, now() + interval '30 days');

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

notify pgrst, 'reload schema';
