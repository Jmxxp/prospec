do $$
declare
  v_table_name text;
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    foreach v_table_name in array array['stores', 'prospects', 'prospect_tags', 'prospect_professionals']
    loop
      if to_regclass(format('public.%I', v_table_name)) is not null
        and not exists (
          select 1
          from pg_publication_tables
          where pubname = 'supabase_realtime'
            and schemaname = 'public'
            and tablename = v_table_name
        )
      then
        execute format('alter publication supabase_realtime add table public.%I', v_table_name);
      end if;
    end loop;
  end if;
end $$;

create or replace function public.prospec_broadcast_store_change()
returns trigger
language plpgsql
security definer
set search_path = public, realtime, extensions
as $$
declare
  v_store_id uuid;
begin
  if TG_TABLE_NAME = 'stores' then
    v_store_id := coalesce(new.id, old.id);
  else
    v_store_id := coalesce(new.store_id, old.store_id);
  end if;

  if v_store_id is not null then
    perform realtime.send(
      jsonb_build_object(
        'table', TG_TABLE_NAME,
        'operation', TG_OP,
        'store_id', v_store_id::text
      ),
      'changed',
      'prospec-store:' || v_store_id::text,
      false
    );
  end if;

  return null;
end;
$$;

do $$
declare
  v_table_name text;
begin
  foreach v_table_name in array array['stores', 'prospects', 'prospect_tags', 'prospect_professionals']
  loop
    if to_regclass(format('public.%I', v_table_name)) is not null then
      execute format('drop trigger if exists %I on public.%I', 'prospec_broadcast_' || v_table_name, v_table_name);
      execute format(
        'create trigger %I
         after insert or update or delete on public.%I
         for each row execute function public.prospec_broadcast_store_change()',
        'prospec_broadcast_' || v_table_name,
        v_table_name
      );
    end if;
  end loop;
end $$;

create or replace function public.store_mark_returned(
  p_token text,
  p_id uuid
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
  set returned_at = coalesce(returned_at, now()),
      updated_at = now()
  where id = p_id
    and store_id = v_store_id;

  if not found then
    raise exception 'Prospeccao nao encontrada para esta loja.';
  end if;
end;
$$;

grant execute on function public.store_mark_returned(text, uuid) to anon, authenticated;

create or replace function public.store_unmark_returned(
  p_token text,
  p_id uuid
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
  set returned_at = null,
      updated_at = now()
  where id = p_id
    and store_id = v_store_id;

  if not found then
    raise exception 'Prospeccao nao encontrada para esta loja.';
  end if;
end;
$$;

grant execute on function public.store_unmark_returned(text, uuid) to anon, authenticated;

notify pgrst, 'reload schema';
