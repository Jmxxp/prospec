alter table public.prospects
add column if not exists purchased_at timestamptz;

alter table public.prospects
add column if not exists purchase_value numeric(12,2);

alter table public.prospects
add column if not exists purchase_os text;

alter table public.prospects
drop constraint if exists prospects_purchase_value_positive;

alter table public.prospects
add constraint prospects_purchase_value_positive
check (purchase_value is null or purchase_value > 0);

create index if not exists prospects_store_purchased_at_idx
on public.prospects (store_id, purchased_at desc)
where purchased_at is not null;

drop function if exists public.store_mark_purchased(text, uuid);
drop function if exists public.store_mark_purchased(text, uuid, numeric, text);

create function public.store_mark_purchased(
  p_token text,
  p_id uuid,
  p_purchase_value numeric,
  p_purchase_os text
)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_store_id uuid;
  v_purchase_os text;
begin
  v_store_id := public.store_id_from_session(p_token);
  v_purchase_os := left(trim(regexp_replace(coalesce(p_purchase_os, ''), '\s+', ' ', 'g')), 80);

  if p_purchase_value is null or p_purchase_value <= 0 then
    raise exception 'Informe um valor de compra maior que zero.';
  end if;

  if length(v_purchase_os) = 0 then
    raise exception 'Informe a OS da compra.';
  end if;

  update public.prospects
  set purchased_at = coalesce(purchased_at, now()),
      returned_at = coalesce(returned_at, now()),
      purchase_value = round(p_purchase_value, 2),
      purchase_os = v_purchase_os,
      updated_at = now()
  where id = p_id
    and store_id = v_store_id;

  if not found then
    raise exception 'Prospeccao nao encontrada para esta loja.';
  end if;
end;
$$;

grant execute on function public.store_mark_purchased(text, uuid, numeric, text) to anon, authenticated;

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
      purchase_value = null,
      purchase_os = null,
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
