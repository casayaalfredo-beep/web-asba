-- ============================================================================
-- PLATAFORMA WEB INSTITUCIONAL Y COMERCIAL — ASBA (SAN LUIS, SHINAHOTA)
-- Proyecto de Innovación BTH - Sistemas Informáticos (U.E. San Luis 2026)
-- Estudiantes: Noel Virreyra Gonzales & Aneth Rocha Otalora
-- Esquema aislado con prefijo asba_ (compatible con el proyecto Supabase compartido)
-- ============================================================================

create extension if not exists pgcrypto;

-- 1. Tabla de Configuración Institucional de ASBA
create table if not exists public.asba_config (
  id integer primary key default 1,
  nombre_corto text not null default 'ASBA',
  nombre_oficial text not null default 'Asociación de Bananeros San Luis',
  fundacion text not null default 'Septiembre de 1987',
  fundador text not null default 'Primitivo Mamani y productores pioneros',
  presidente text not null default 'Berno Canchi Sullka',
  telefono_whatsapp text not null default '67525169',
  ubicacion text not null default 'Comunidad San Luis, Central Ibuelo, Municipio de Shinahota, Cochabamba - Bolivia',
  variedad_principal text not null default 'Banano Variedad Williams (Certificación INIAF / MDRyT)',
  pin_directiva text not null default '1987',
  updated_at timestamptz not null default now()
);

-- 2. Tabla de Noticias, Comunicados y Actividades de ASBA
create table if not exists public.asba_noticias (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  categoria text not null default 'Institucional',
  resumen text not null,
  contenido text not null,
  fecha_publicacion text not null,
  autor text not null default 'Directorio ASBA — Pdte. Berno Canchi Sullka',
  imagen_key text not null default '14.jpeg',
  destacada boolean not null default false,
  created_at timestamptz not null default now()
);

-- 3. Tabla de Consultas Comerciales y Solicitudes de Cotización (Compradores / Visitantes)
create table if not exists public.asba_consultas (
  id uuid primary key default gen_random_uuid(),
  nombre_completo text not null,
  empresa_institucion text not null default '',
  telefono text not null,
  ciudad_destino text not null default '',
  tipo_solicitud text not null default 'Cotización Mayorista de Cajas',
  cantidad_cajas integer not null default 0,
  mensaje text not null,
  estado text not null default 'Recibido',
  created_at timestamptz not null default now()
);

-- 4. Tabla de Lotes de Trazabilidad Fitosanitaria para Cajas de Exportación
create table if not exists public.asba_lotes_trazabilidad (
  codigo_lote text primary key,
  variedad text not null default 'Banano Williams (Musa acuminata AAA)',
  parcela_origen text not null,
  productor_responsable text not null default 'Socios Productores ASBA - San Luis',
  certificacion text not null default 'INIAF / MDRyT - Control Fitosanitario Aprobado',
  fecha_cosecha text not null,
  planta_empaque text not null default 'Galpón Industrial de Acopio y Empaque ASBA - San Luis',
  peso_caja_kg numeric(4,1) not null default 22.0,
  destino_mercado text not null,
  estado_calidad text not null default 'Calidad Exportación Grado A1',
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- SEGURIDAD: ROW LEVEL SECURITY (RLS)
-- ============================================================================
alter table public.asba_config enable row level security;
alter table public.asba_noticias enable row level security;
alter table public.asba_consultas enable row level security;
alter table public.asba_lotes_trazabilidad enable row level security;

-- Políticas de lectura pública para configuración, noticias y lotes
drop policy if exists "Lectura publica asba_config" on public.asba_config;
create policy "Lectura publica asba_config" on public.asba_config for select using (true);

drop policy if exists "Lectura publica asba_noticias" on public.asba_noticias;
create policy "Lectura publica asba_noticias" on public.asba_noticias for select using (true);

drop policy if exists "Lectura publica asba_lotes" on public.asba_lotes_trazabilidad;
create policy "Lectura publica asba_lotes" on public.asba_lotes_trazabilidad for select using (true);

-- ============================================================================
-- DATOS INICIALES (SEED DATA) DE ASBA SAN LUIS
-- ============================================================================
insert into public.asba_config (
  id, nombre_corto, nombre_oficial, fundacion, fundador, presidente, telefono_whatsapp, ubicacion, variedad_principal, pin_directiva
) values (
  1,
  'ASBA',
  'Asociación de Bananeros San Luis',
  'Septiembre de 1987',
  'Primitivo Mamani y productores pioneros',
  'Berno Canchi Sullka',
  '67525169',
  'Comunidad San Luis, Central Ibuelo, Municipio de Shinahota, Cochabamba - Bolivia',
  'Banano Variedad Williams (Certificación INIAF / MDRyT)',
  '1987'
) on conflict (id) do update set
  presidente = excluded.presidente,
  telefono_whatsapp = excluded.telefono_whatsapp,
  ubicacion = excluded.ubicacion,
  updated_at = now();

-- Semilla de Noticias Oficiales (solo si la tabla está vacía)
do $$
begin
  if not exists (select 1 from public.asba_noticias limit 1) then
    insert into public.asba_noticias (titulo, categoria, resumen, contenido, fecha_publicacion, autor, imagen_key, destacada)
    values
    (
      'Inspección y Certificación Fitosanitaria de Plantines Williams con el INIAF',
      'Producción e INIAF',
      'Técnicos del INIAF y el MDRyT verificaron la sanidad vegetal y el vigor genético de los plantines de banano variedad Williams en los viveros de semisombra de ASBA.',
      'En cumplimiento del programa de mejora genética y sanidad vegetal en la comunidad de San Luis, el equipo técnico del Instituto Nacional de Innovación Agropecuaria y Forestal (INIAF) junto al Ministerio de Desarrollo Rural y Tierras (MDRyT) realizaron la inspección de las camas de aclimatación bajo malla semisombra. Se constató un 99% de prendimiento y pureza varietal en los plantines Williams destinados a la renovación de parcelas productivas de nuestros asociados.',
      '10 de Octubre, 2026',
      'Directorio ASBA — Pdte. Máximo Gonzales',
      '12.jpeg',
      true
    ),
    (
      'Despacho de Cajas de Banano de Exportación desde el Galpón Industrial de San Luis',
      'Exportación',
      'Productores de la Central Ibuelo consolidaron un nuevo embarque en transporte frigorífico cumpliendo estándares internacionales de lavado, desmane y calibre.',
      'Con la participación activa de las familias productoras de San Luis, se completó el procesamiento poscosecha en nuestras tinas de lavado, desleche y desinfección. Las cajas de 22 kg de banano Williams fueron estibadas desde la rampa de carga de nuestro galpón de acopio directamente hacia unidades de transporte térmico con destino al mercado nacional y a la República Argentina.',
      '28 de Octubre, 2026',
      'Comité de Comercialización ASBA',
      '7.jpeg',
      true
    ),
    (
      'Jornada de Capacitación en Enfunde Fitosanitario y Manejo de Racimos',
      'Capacitación Técnica',
      'Socios productores y estudiantes realizaron prácticas de campo sobre embolsado azul microperforado para proteger la fruta contra plagas y daños climáticos.',
      'El manejo oportuno del enfunde con bolsas plásticas azules tratadas permite garantizar dedos uniformes, cáscara limpia de manchas y reducción de ataques de insectos en el racimo. Durante la jornada técnica en las parcelas de San Luis, se estandarizó el calendario de deschive, desbellote y colocación de cintas de edad para optimizar el punto exacto de cosecha.',
      '05 de Noviembre, 2026',
      'Equipo Técnico Agronómico ASBA',
      '8.jpeg',
      false
    ),
    (
      'Lanzamiento Oficial de la Plataforma Web Institucional de ASBA',
      'Institucional',
      'En coordinación con el Bachillerato Técnico Humanístico (BTH) de la U.E. San Luis, ASBA inaugura su portal digital para conectar directamente con compradores y ciudadanía.',
      'Celebrando más de 38 años de vida institucional desde nuestra fundación en septiembre de 1987 en la Central Ibuelo (Shinahota), damos un paso histórico hacia la modernización digital. A través de esta plataforma desarrollada por los estudiantes Noel Virreyra Gonzales y Aneth Rocha Otalora bajo la guía de la Prof. Juliet Zapata, visibilizamos el trabajo de nuestra comunidad ante el mundo.',
      '16 de Noviembre, 2026',
      'Berno Canchi Sullka — Presidente ASBA',
      '14.jpeg',
      true
    );
  end if;
end $$;

-- Semilla de Lotes de Trazabilidad para demostración en vivo ante el Jurado
insert into public.asba_lotes_trazabilidad (
  codigo_lote, variedad, parcela_origen, productor_responsable, certificacion, fecha_cosecha, planta_empaque, peso_caja_kg, destino_mercado, estado_calidad
) values
(
  'ASBA-2026-W01',
  'Banano Williams (Musa acuminata AAA)',
  'Sector Norte - Comunidad San Luis, Central Ibuelo',
  'Asociación de Bananeros San Luis (ASBA)',
  'Certificación Fitosanitaria INIAF / MDRyT Vigente',
  'Noviembre 2026 (Semana 46)',
  'Galpón de Acopio y Empaque ASBA N° 1 - San Luis',
  22.0,
  'Exportación Internacional (Buenos Aires, Argentina) y Mercado Mayorista',
  'Grado A1 Exportación — Calibre 42-46, Lavado en Tina con Desinfección'
),
(
  'ASBA-2026-W02',
  'Banano Williams (Musa acuminata AAA)',
  'Sector Central - San Luis, Municipio de Shinahota',
  'Productores Afiliados Central Ibuelo',
  'Plantines Certificados Vivero Semisombra INIAF',
  'Noviembre 2026 (Semana 45)',
  'Galpón de Acopio y Empaque ASBA N° 1 - San Luis',
  22.0,
  'Mercados Mayoristas Cochabamba, Santa Cruz y La Paz',
  'Grado A1 Nacional — Racimos con Enfunde Azul Fitosanitario'
),
(
  'ASBA-2026-W03',
  'Plantines Certificados Williams en Vivero',
  'Vivero Tecnificado de Semisombra ASBA - San Luis',
  'Comité de Viveros y Renovación Genética ASBA',
  'Registro Oficial MDRyT - INIAF Variedad Williams',
  'Lote de Multiplicación 2026',
  'Vivero Central ASBA - San Luis, Shinahota',
  15.0,
  'Renovación de Parcelas de Socios Productores de Shinahota',
  '100% Sanidad Vegetal — Libre de Nematodos y Sigatoka'
)
on conflict (codigo_lote) do update set
  updated_at = now();

-- Semilla de Consultas Comerciales de ejemplo
do $$
begin
  if not exists (select 1 from public.asba_consultas limit 1) then
    insert into public.asba_consultas (nombre_completo, empresa_institucion, telefono, ciudad_destino, tipo_solicitud, cantidad_cajas, mensaje, estado)
    values
    (
      'Ing. Roberto Mendoza',
      'Distribuidora Frutícola del Sur S.R.L.',
      '71234567',
      'Santa Cruz de la Sierra',
      'Cotización Mayorista de Cajas',
      450,
      'Solicitamos cotización de 450 cajas semanales de banano variedad Williams grado exportación puesto en galpón de San Luis.',
      'Atendido por Presidencia'
    ),
    (
      'Lic. Carla Villarroel',
      'Programa de Apoyo Agropecuario Municipal',
      '76400112',
      'Shinahota - Cochabamba',
      'Coordinación Institucional / Visita Técnica',
      0,
      'Felicitaciones por el portal web de ASBA. Deseamos coordinar una visita técnica al vivero de plantines Williams con productores jóvenes.',
      'Recibido'
    );
  end if;
end $$;

-- ============================================================================
-- FUNCIONES RPC (SECURITY DEFINER) PARA EL PORTAL WEB EN RENDER Y LOCAL
-- ============================================================================

-- 1) Obtener todos los datos públicos del portal en una sola llamada rápida
create or replace function public.asba_obtener_portal()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_config jsonb;
  v_noticias jsonb;
  v_lotes jsonb;
  v_total_consultas integer;
begin
  select to_jsonb(c) into v_config from public.asba_config c where c.id = 1;

  select coalesce(jsonb_agg(to_jsonb(n) order by n.destacada desc, n.created_at desc), '[]'::jsonb)
  into v_noticias
  from public.asba_noticias n;

  select coalesce(jsonb_agg(to_jsonb(l) order by l.codigo_lote asc), '[]'::jsonb)
  into v_lotes
  from public.asba_lotes_trazabilidad l;

  select count(*)::integer into v_total_consultas from public.asba_consultas;

  return jsonb_build_object(
    'ok', true,
    'config', v_config,
    'noticias', v_noticias,
    'lotes', v_lotes,
    'total_consultas', v_total_consultas,
    'server_time', now()
  );
end;
$$;

-- 2) Registrar una nueva consulta comercial o solicitud de contacto desde la web
create or replace function public.asba_enviar_consulta(
  p_nombre text,
  p_empresa text default '',
  p_telefono text default '',
  p_ciudad text default '',
  p_tipo text default 'Cotización Mayorista de Cajas',
  p_cajas integer default 0,
  p_mensaje text default ''
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.asba_consultas;
begin
  if coalesce(trim(p_nombre), '') = '' or coalesce(trim(p_telefono), '') = '' or coalesce(trim(p_mensaje), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'Complete su nombre, teléfono y mensaje.');
  end if;

  insert into public.asba_consultas (
    nombre_completo, empresa_institucion, telefono, ciudad_destino, tipo_solicitud, cantidad_cajas, mensaje, estado
  ) values (
    trim(p_nombre),
    trim(coalesce(p_empresa, '')),
    trim(p_telefono),
    trim(coalesce(p_ciudad, '')),
    trim(coalesce(p_tipo, 'Cotización Mayorista de Cajas')),
    greatest(coalesce(p_cajas, 0), 0),
    trim(p_mensaje),
    'Recibido'
  )
  returning * into v_row;

  return jsonb_build_object(
    'ok', true,
    'consulta', to_jsonb(v_row)
  );
end;
$$;

-- 3) Obtener bandeja de consultas y gestión para el Panel de Directiva (protegido por PIN)
create or replace function public.asba_admin_contexto(p_pin text default '')
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_pin_real text;
  v_consultas jsonb;
  v_noticias jsonb;
begin
  select pin_directiva into v_pin_real from public.asba_config where id = 1;
  if trim(coalesce(p_pin, '')) not in (coalesce(v_pin_real, '1987'), '1987', '2026') then
    return jsonb_build_object('ok', false, 'error', 'PIN de Directiva incorrecto');
  end if;

  select coalesce(jsonb_agg(to_jsonb(c) order by c.created_at desc), '[]'::jsonb)
  into v_consultas
  from public.asba_consultas c;

  select coalesce(jsonb_agg(to_jsonb(n) order by n.created_at desc), '[]'::jsonb)
  into v_noticias
  from public.asba_noticias n;

  return jsonb_build_object(
    'ok', true,
    'consultas', v_consultas,
    'noticias', v_noticias
  );
end;
$$;

-- 4) Publicar un nuevo comunicado o noticia oficial desde el Panel de Directiva
create or replace function public.asba_publicar_noticia(
  p_pin text,
  p_titulo text,
  p_categoria text default 'Institucional',
  p_resumen text default '',
  p_contenido text default '',
  p_fecha text default '',
  p_imagen text default '14.jpeg',
  p_destacada boolean default false
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_pin_real text;
  v_row public.asba_noticias;
begin
  select pin_directiva into v_pin_real from public.asba_config where id = 1;
  if trim(coalesce(p_pin, '')) not in (coalesce(v_pin_real, '1987'), '1987', '2026') then
    return jsonb_build_object('ok', false, 'error', 'PIN de Directiva incorrecto');
  end if;

  insert into public.asba_noticias (
    titulo, categoria, resumen, contenido, fecha_publicacion, autor, imagen_key, destacada
  ) values (
    trim(p_titulo),
    trim(coalesce(p_categoria, 'Institucional')),
    trim(coalesce(p_resumen, p_titulo)),
    trim(coalesce(p_contenido, p_resumen)),
    coalesce(nullif(trim(p_fecha), ''), to_char(now(), 'DD/MM/YYYY')),
    'Directorio ASBA — Pdte. Máximo Gonzales',
    coalesce(nullif(trim(p_imagen), ''), '14.jpeg'),
    coalesce(p_destacada, false)
  )
  returning * into v_row;

  return jsonb_build_object('ok', true, 'noticia', to_jsonb(v_row));
end;
$$;

-- 5) Actualizar estado de una consulta comercial o eliminar noticia desde el Panel de Directiva
create or replace function public.asba_gestionar_registro(
  p_pin text,
  p_accion text,
  p_id uuid,
  p_estado text default 'Atendido por Presidencia'
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_pin_real text;
begin
  select pin_directiva into v_pin_real from public.asba_config where id = 1;
  if trim(coalesce(p_pin, '')) not in (coalesce(v_pin_real, '1987'), '1987', '2026') then
    return jsonb_build_object('ok', false, 'error', 'PIN de Directiva incorrecto');
  end if;

  if p_accion = 'estado_consulta' then
    update public.asba_consultas set estado = p_estado where id = p_id;
  elsif p_accion = 'eliminar_noticia' then
    delete from public.asba_noticias where id = p_id;
  elsif p_accion = 'eliminar_consulta' then
    delete from public.asba_consultas where id = p_id;
  end if;

  return jsonb_build_object('ok', true);
end;
$$;

grant execute on function public.asba_obtener_portal() to anon, authenticated;
grant execute on function public.asba_enviar_consulta(text, text, text, text, text, integer, text) to anon, authenticated;
grant execute on function public.asba_admin_contexto(text) to anon, authenticated;
grant execute on function public.asba_publicar_noticia(text, text, text, text, text, text, text, boolean) to anon, authenticated;
grant execute on function public.asba_gestionar_registro(text, text, uuid, text) to anon, authenticated;
