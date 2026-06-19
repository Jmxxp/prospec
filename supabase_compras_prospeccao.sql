alter table public.prospects
add column if not exists purchased_at timestamptz;

create index if not exists prospects_store_purchased_at_idx
on public.prospects (store_id, purchased_at desc)
where purchased_at is not null;

create or replace function public.store_mark_purchased(
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
  set purchased_at = coalesce(purchased_at, now()),
      returned_at = coalesce(returned_at, now()),
      updated_at = now()
  where id = p_id
    and store_id = v_store_id;

  if not found then
    raise exception 'Prospeccao nao encontrada para esta loja.';
  end if;
end;
$$;

grant execute on function public.store_mark_purchased(text, uuid) to anon, authenticated;

create or replace function public.store_unmark_purchased(
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
  set purchased_at = null,
      updated_at = now()
  where id = p_id
    and store_id = v_store_id;

  if not found then
    raise exception 'Prospeccao nao encontrada para esta loja.';
  end if;
end;
$$;

grant execute on function public.store_unmark_purchased(text, uuid) to anon, authenticated;

notify pgrst, 'reload schema';
