create or replace function public.admin_delete_tag(
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
  v_label text;
  v_rows integer;
begin
  if auth.uid() is null then
    raise exception 'Admin nao autenticado.';
  end if;

  v_label := left(trim(regexp_replace(coalesce(p_label, ''), '\s+', ' ', 'g')), 40);

  if length(v_label) = 0 then
    raise exception 'Etiqueta invalida.';
  end if;

  v_owner_column := public.admin_store_owner_column();

  execute format(
    'delete from public.prospect_tags pt
     using public.stores s
     where pt.store_id = s.id
       and pt.store_id = $1
       and lower(pt.label) = lower($2)
       and s.%I = $3
       and s.deleted_at is null',
    v_owner_column
  )
  using p_store_id, v_label, auth.uid();

  get diagnostics v_rows = row_count;

  if v_rows = 0 then
    raise exception 'Etiqueta nao encontrada para esta loja.';
  end if;
end;
$$;

grant execute on function public.admin_delete_tag(uuid, text) to authenticated;

notify pgrst, 'reload schema';
