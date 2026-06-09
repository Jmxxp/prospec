create table if not exists public.prospect_professionals (
  id uuid primary key default extensions.gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  name text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint prospect_professionals_name_not_blank check (length(trim(name)) > 0)
);

alter table public.prospect_professionals enable row level security;
revoke all on public.prospect_professionals from anon, authenticated;

create unique index if not exists prospect_professionals_store_name_uidx
on public.prospect_professionals (store_id, lower(name));

alter table public.prospects
add column if not exists professional_id uuid references public.prospect_professionals(id) on delete set null;

alter table public.prospects
add column if not exists professional_name_snapshot text;

drop function if exists public.admin_create_professional(uuid, text);

create function public.admin_create_professional(
  p_store_id uuid,
  p_name text
)
returns table(id uuid, name text, is_active boolean)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_owner_column text;
  v_name text;
  v_allowed integer;
  v_rows integer;
begin
  if auth.uid() is null then
    raise exception 'Admin nao autenticado.';
  end if;

  v_name := left(trim(regexp_replace(coalesce(p_name, ''), '\s+', ' ', 'g')), 80);
  if length(v_name) = 0 then
    raise exception 'Profissional invalido.';
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
    raise exception 'Loja nao encontrada para este admin.';
  end if;

  update public.prospect_professionals pp
  set name = v_name,
      is_active = true,
      updated_at = now()
  where pp.store_id = p_store_id
    and lower(pp.name) = lower(v_name);

  get diagnostics v_rows = row_count;
  if v_rows = 0 then
    insert into public.prospect_professionals (store_id, name, is_active)
    values (p_store_id, v_name, true);
  end if;

  return query
  select pp.id, pp.name, pp.is_active
  from public.prospect_professionals pp
  where pp.store_id = p_store_id
    and lower(pp.name) = lower(v_name)
  limit 1;
end;
$$;

grant execute on function public.admin_create_professional(uuid, text) to authenticated;

create or replace function public.admin_update_professional(
  p_store_id uuid,
  p_professional_id uuid,
  p_name text,
  p_is_active boolean
)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_owner_column text;
  v_name text;
  v_rows integer;
begin
  if auth.uid() is null then
    raise exception 'Admin nao autenticado.';
  end if;

  v_name := left(trim(regexp_replace(coalesce(p_name, ''), '\s+', ' ', 'g')), 80);
  if length(v_name) = 0 then
    raise exception 'Profissional invalido.';
  end if;

  v_owner_column := public.admin_store_owner_column();

  execute format(
    'update public.prospect_professionals pp
     set name = $1,
         is_active = coalesce($2, true),
         updated_at = now()
     from public.stores s
     where pp.id = $3
       and pp.store_id = $4
       and pp.store_id = s.id
       and s.%I = $5
       and s.deleted_at is null',
    v_owner_column
  )
  using v_name, p_is_active, p_professional_id, p_store_id, auth.uid();

  get diagnostics v_rows = row_count;
  if v_rows = 0 then
    raise exception 'Profissional nao encontrado para este admin.';
  end if;
end;
$$;

grant execute on function public.admin_update_professional(uuid, uuid, text, boolean) to authenticated;

create or replace function public.admin_get_professionals()
returns table(id uuid, store_id uuid, name text, is_active boolean, created_at timestamptz, updated_at timestamptz)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_owner_column text;
begin
  if auth.uid() is null then
    raise exception 'Admin nao autenticado.';
  end if;

  v_owner_column := public.admin_store_owner_column();

  return query execute format(
    'select pp.id, pp.store_id, pp.name, pp.is_active, pp.created_at, pp.updated_at
     from public.prospect_professionals pp
     join public.stores s on s.id = pp.store_id
     where s.%I = $1
       and s.deleted_at is null
     order by s.sort_order, s.name, pp.name',
    v_owner_column
  )
  using auth.uid();
end;
$$;

grant execute on function public.admin_get_professionals() to authenticated;

create or replace function public.store_get_professionals(p_token text)
returns table(id uuid, name text)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_store_id uuid;
begin
  v_store_id := public.store_id_from_session(p_token);

  return query
  select pp.id, pp.name
  from public.prospect_professionals pp
  where pp.store_id = v_store_id
    and pp.is_active = true
  order by pp.name;
end;
$$;

grant execute on function public.store_get_professionals(text) to anon, authenticated;

drop function if exists public.store_create_prospect(text, text, text, text, text, text);
drop function if exists public.store_create_prospect(text, text, text, text, text, text, text[]);
drop function if exists public.store_create_prospect(text, text, text, text, text, text, text[], uuid);

create function public.store_create_prospect(
  p_token text,
  p_name text,
  p_phone text,
  p_cpf text,
  p_notes text,
  p_probability text,
  p_tags text[] default '{}'::text[],
  p_professional_id uuid default null
)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_store_id uuid;
  v_professional_name text;
begin
  v_store_id := public.store_id_from_session(p_token);

  if p_professional_id is not null then
    select pp.name
    into v_professional_name
    from public.prospect_professionals pp
    where pp.id = p_professional_id
      and pp.store_id = v_store_id
    limit 1;

    if v_professional_name is null then
      raise exception 'Profissional nao encontrado para esta loja.';
    end if;
  end if;

  insert into public.prospects (
    store_id,
    name,
    phone,
    cpf,
    notes,
    probability,
    tags,
    professional_id,
    professional_name_snapshot,
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
    p_professional_id,
    v_professional_name,
    now(),
    now()
  );
end;
$$;

grant execute on function public.store_create_prospect(text, text, text, text, text, text, text[], uuid) to anon, authenticated;

drop function if exists public.store_update_prospect(uuid, text, text, text, text, text, text);
drop function if exists public.store_update_prospect(uuid, text, text, text, text, text, text, text[]);
drop function if exists public.store_update_prospect(uuid, text, text, text, text, text, text, text[], uuid);

create function public.store_update_prospect(
  p_id uuid,
  p_token text,
  p_name text,
  p_phone text,
  p_cpf text,
  p_notes text,
  p_probability text,
  p_tags text[] default '{}'::text[],
  p_professional_id uuid default null
)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_store_id uuid;
  v_professional_name text;
begin
  v_store_id := public.store_id_from_session(p_token);

  if p_professional_id is not null then
    select pp.name
    into v_professional_name
    from public.prospect_professionals pp
    where pp.id = p_professional_id
      and pp.store_id = v_store_id
    limit 1;

    if v_professional_name is null then
      raise exception 'Profissional nao encontrado para esta loja.';
    end if;
  end if;

  update public.prospects
  set
    name = nullif(trim(coalesce(p_name, '')), ''),
    phone = nullif(trim(coalesce(p_phone, '')), ''),
    cpf = nullif(trim(coalesce(p_cpf, '')), ''),
    notes = nullif(trim(coalesce(p_notes, '')), ''),
    probability = coalesce(p_probability, 'blue'),
    tags = coalesce(p_tags, '{}'::text[]),
    professional_id = p_professional_id,
    professional_name_snapshot = v_professional_name,
    updated_at = now()
  where id = p_id
    and store_id = v_store_id;

  if not found then
    raise exception 'Prospeccao nao encontrada para esta loja.';
  end if;
end;
$$;

grant execute on function public.store_update_prospect(uuid, text, text, text, text, text, text, text[], uuid) to anon, authenticated;

notify pgrst, 'reload schema';
