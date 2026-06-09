alter table public.stores
add column if not exists sort_order integer not null default 9999;

alter table public.stores
add column if not exists daily_goal integer not null default 15;

alter table public.stores
add column if not exists accent_color text not null default 'blue';

alter table public.prospects
add column if not exists tags text[] not null default '{}'::text[];

do $$
begin
  alter table public.stores drop constraint if exists stores_daily_goal_positive;
  alter table public.stores add constraint stores_daily_goal_positive check (daily_goal > 0);

  alter table public.stores drop constraint if exists stores_accent_color_valid;
  alter table public.stores add constraint stores_accent_color_valid
  check (accent_color in (
    'blue', 'slate', 'teal', 'green', 'wine', 'amber',
    'indigo', 'cyan', 'emerald', 'rose', 'violet', 'orange', 'black'
  ));
end $$;

create table if not exists public.prospect_tags (
  id uuid primary key default extensions.gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  label text not null,
  created_at timestamptz not null default now(),
  constraint prospect_tags_label_not_blank check (length(trim(label)) > 0),
  constraint prospect_tags_store_label_key unique (store_id, label)
);

alter table public.prospect_tags enable row level security;
revoke all on public.prospect_tags from anon, authenticated;

with ranked as (
  select id, row_number() over (order by sort_order, name) as position
  from public.stores
  where deleted_at is null
)
update public.stores s
set sort_order = ranked.position
from ranked
where s.id = ranked.id
  and s.sort_order = 9999;

insert into public.prospect_tags (store_id, label)
select s.id, seed.label
from public.stores s
cross join (values ('Receita vencida'), ('Aniversário')) as seed(label)
where s.deleted_at is null
on conflict (store_id, label) do nothing;

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

create or replace function public.store_session_token_column()
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
    and table_name = 'store_sessions'
    and column_name in ('token', 'session_token')
  order by case column_name when 'token' then 1 else 2 end
  limit 1;

  if v_column is null then
    raise exception 'A tabela store_sessions precisa ter token ou session_token.';
  end if;

  return v_column;
end;
$$;

revoke all on function public.store_session_token_column() from public;

create or replace function public.store_id_from_session(p_token text)
returns uuid
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_token_column text;
  v_store_id uuid;
begin
  v_token_column := public.store_session_token_column();

  execute format(
    'select ss.store_id
     from public.store_sessions ss
     join public.stores s on s.id = ss.store_id
     where ss.%I = $1
       and ss.expires_at > now()
       and s.deleted_at is null
     limit 1',
    v_token_column
  )
  into v_store_id
  using p_token;

  if v_store_id is null then
    raise exception 'Sessão da loja inválida.';
  end if;

  return v_store_id;
end;
$$;

revoke all on function public.store_id_from_session(text) from public;

create or replace function public.admin_update_store_order(p_order jsonb)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_owner_column text;
  v_item jsonb;
begin
  if auth.uid() is null then
    raise exception 'Admin não autenticado.';
  end if;

  v_owner_column := public.admin_store_owner_column();

  for v_item in select * from jsonb_array_elements(p_order)
  loop
    execute format(
      'update public.stores
       set sort_order = $1
       where id = $2
         and %I = $3
         and deleted_at is null',
      v_owner_column
    )
    using (v_item->>'sort_order')::integer, (v_item->>'id')::uuid, auth.uid();
  end loop;
end;
$$;

grant execute on function public.admin_update_store_order(jsonb) to authenticated;

create or replace function public.admin_update_store_settings(
  p_store_id uuid,
  p_name text,
  p_daily_goal integer,
  p_accent_color text,
  p_sort_order integer
)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_owner_column text;
  v_rows integer;
begin
  if auth.uid() is null then
    raise exception 'Admin não autenticado.';
  end if;

  if length(trim(coalesce(p_name, ''))) = 0 then
    raise exception 'Nome da loja inválido.';
  end if;

  if p_daily_goal is null or p_daily_goal < 1 then
    raise exception 'Meta inválida.';
  end if;

  if p_accent_color not in (
    'blue', 'slate', 'teal', 'green', 'wine', 'amber',
    'indigo', 'cyan', 'emerald', 'rose', 'violet', 'orange', 'black'
  ) then
    raise exception 'Cor inválida.';
  end if;

  v_owner_column := public.admin_store_owner_column();

  execute format(
    'update public.stores
     set name = $1,
         daily_goal = $2,
         accent_color = $3,
         sort_order = $4
     where id = $5
       and %I = $6
       and deleted_at is null',
    v_owner_column
  )
  using trim(p_name), p_daily_goal, p_accent_color, coalesce(p_sort_order, 9999), p_store_id, auth.uid();

  get diagnostics v_rows = row_count;

  if v_rows = 0 then
    raise exception 'Loja não encontrada para este admin.';
  end if;
end;
$$;

grant execute on function public.admin_update_store_settings(uuid, text, integer, text, integer) to authenticated;

create or replace function public.admin_create_tag(
  p_store_id uuid,
  p_label text
)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_owner_column text;
  v_allowed integer;
  v_label text;
begin
  if auth.uid() is null then
    raise exception 'Admin não autenticado.';
  end if;

  v_label := left(trim(regexp_replace(coalesce(p_label, ''), '\s+', ' ', 'g')), 40);

  if length(v_label) = 0 then
    raise exception 'Etiqueta inválida.';
  end if;

  v_owner_column := public.admin_store_owner_column();

  execute format(
    'select 1
     from public.stores
     where id = $1
       and %I = $2
       and deleted_at is null
     limit 1',
    v_owner_column
  )
  into v_allowed
  using p_store_id, auth.uid();

  if v_allowed is null then
    raise exception 'Loja não encontrada para este admin.';
  end if;

  insert into public.prospect_tags (store_id, label)
  values (p_store_id, v_label)
  on conflict (store_id, label) do nothing;
end;
$$;

grant execute on function public.admin_create_tag(uuid, text) to authenticated;

create or replace function public.admin_get_tags()
returns table(store_id uuid, label text)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_owner_column text;
begin
  if auth.uid() is null then
    raise exception 'Admin não autenticado.';
  end if;

  v_owner_column := public.admin_store_owner_column();

  return query execute format(
    'select pt.store_id, pt.label
     from public.prospect_tags pt
     join public.stores s on s.id = pt.store_id
     where s.%I = $1
       and s.deleted_at is null
     order by s.sort_order, s.name, pt.label',
    v_owner_column
  )
  using auth.uid();
end;
$$;

grant execute on function public.admin_get_tags() to authenticated;

create or replace function public.admin_open_store(p_store_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_owner_column text;
  v_token_column text;
  v_token text;
  v_store public.stores%rowtype;
begin
  if auth.uid() is null then
    raise exception 'Admin não autenticado.';
  end if;

  v_owner_column := public.admin_store_owner_column();
  v_token_column := public.store_session_token_column();

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

  execute format(
    'insert into public.store_sessions (store_id, %I, expires_at)
     values ($1, $2, now() + interval ''30 days'')',
    v_token_column
  )
  using v_store.id, v_token;

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

create or replace function public.store_create_prospect(
  p_token text,
  p_name text,
  p_phone text,
  p_cpf text,
  p_notes text,
  p_probability text,
  p_tags text[] default '{}'::text[]
)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_store_id uuid;
begin
  v_store_id := public.store_id_from_session(p_token);

  insert into public.prospects (
    store_id,
    name,
    phone,
    cpf,
    notes,
    probability,
    tags,
    created_at,
    updated_at
  )
  values (
    v_store_id,
    nullif(trim(coalesce(p_name, '')), ''),
    nullif(trim(coalesce(p_phone, '')), ''),
    nullif(trim(coalesce(p_cpf, '')), ''),
    nullif(trim(coalesce(p_notes, '')), ''),
    coalesce(p_probability, 'blue'),
    coalesce(p_tags, '{}'::text[]),
    now(),
    now()
  );
end;
$$;

grant execute on function public.store_create_prospect(text, text, text, text, text, text, text[]) to anon, authenticated;

create or replace function public.store_update_prospect(
  p_id uuid,
  p_token text,
  p_name text,
  p_phone text,
  p_cpf text,
  p_notes text,
  p_probability text,
  p_tags text[] default '{}'::text[]
)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_store_id uuid;
begin
  v_store_id := public.store_id_from_session(p_token);

  update public.prospects
  set
    name = nullif(trim(coalesce(p_name, '')), ''),
    phone = nullif(trim(coalesce(p_phone, '')), ''),
    cpf = nullif(trim(coalesce(p_cpf, '')), ''),
    notes = nullif(trim(coalesce(p_notes, '')), ''),
    probability = coalesce(p_probability, 'blue'),
    tags = coalesce(p_tags, '{}'::text[]),
    updated_at = now()
  where id = p_id
    and store_id = v_store_id;

  if not found then
    raise exception 'Prospecção não encontrada para esta loja.';
  end if;
end;
$$;

grant execute on function public.store_update_prospect(uuid, text, text, text, text, text, text, text[]) to anon, authenticated;

notify pgrst, 'reload schema';
