import React, { useState, useEffect } from 'react';
import {
  Leaf,
  Award,
  Truck,
  ShieldCheck,
  Phone,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  ExternalLink,
  Send,
  Lock,
  PlusCircle,
  Trash2,
  QrCode,
  Search,
  Calculator,
  Image as ImageIcon,
  Newspaper,
  ChevronRight,
  Menu,
  X,
  Cloud,
  RefreshCw,
  Sparkles,
  Building2,
  FileCheck2,
  MessageCircle,
  Eye
} from 'lucide-react';

// ============================================================================
// CONFIGURACIÓN DE CONEXIÓN A SUPABASE CLOUD (PROYECTO COMPARTIDO ASBA)
// ============================================================================
const SUPABASE_URL = 'https://nqzcgagybjnctfaeeiqd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_3b9uuluJAKe2wd3jQEDnlg_MhT81j__';
const ASBA_CLOUD_TOKEN = 'ASBA_CLOUD_1987';

const INITIAL_CONSULTAS = [
  {
    id: 'cons-1',
    nombre_completo: 'Ing. Roberto Mendoza',
    empresa_institucion: 'Distribuidora Frutícola del Sur S.R.L.',
    telefono: '71234567',
    ciudad_destino: 'Santa Cruz de la Sierra',
    tipo_solicitud: 'Cotización Mayorista de Cajas',
    cantidad_cajas: 450,
    mensaje: 'Solicitamos cotización de 450 cajas semanales de banano variedad Williams grado exportación puesto en galpón de San Luis.',
    estado: 'Atendido por Presidencia'
  },
  {
    id: 'cons-2',
    nombre_completo: 'Lic. Carla Villarroel',
    empresa_institucion: 'Programa de Apoyo Agropecuario Municipal',
    telefono: '76400112',
    ciudad_destino: 'Shinahota - Cochabamba',
    tipo_solicitud: 'Coordinación Institucional / INIAF',
    cantidad_cajas: 0,
    mensaje: 'Felicitaciones por el portal web de ASBA. Deseamos coordinar una visita técnica al vivero de plantines Williams con productores jóvenes.',
    estado: 'Recibido'
  }
];

const INITIAL_CONFIG = {
  nombre_corto: 'ASBA',
  nombre_oficial: 'Asociación de Bananeros San Luis',
  fundacion: 'Septiembre de 1987',
  fundador: 'Primitivo Mamani y productores pioneros',
  presidente: 'Sr. Máximo Gonzales',
  telefono_whatsapp: '71777463',
  ubicacion: 'Comunidad San Luis, Central Ibuelo, Municipio de Shinahota, Cochabamba - Bolivia',
  variedad_principal: 'Banano Variedad Williams (Certificación INIAF / MDRyT)'
};

const INITIAL_NOTICIAS = [
  {
    id: 'not-1',
    titulo: 'Inspección y Certificación Fitosanitaria de Plantines Williams con el INIAF',
    categoria: 'Producción e INIAF',
    resumen: 'Técnicos del INIAF y el MDRyT verificaron la sanidad vegetal y el vigor genético de los plantines de banano variedad Williams en los viveros de semisombra de ASBA.',
    contenido: 'En cumplimiento del programa de mejora genética y sanidad vegetal en la comunidad de San Luis, el equipo técnico del Instituto Nacional de Innovación Agropecuaria y Forestal (INIAF) junto al Ministerio de Desarrollo Rural y Tierras (MDRyT) realizaron la inspección de las camas de aclimatación bajo malla semisombra. Se constató un 99% de prendimiento y pureza varietal en los plantines Williams destinados a la renovación de parcelas productivas de nuestros asociados.',
    fecha_publicacion: '10 de Octubre, 2026',
    autor: 'Directorio ASBA — Pdte. Máximo Gonzales',
    imagen_key: '12.jpeg',
    destacada: true
  },
  {
    id: 'not-2',
    titulo: 'Despacho de Cajas de Banano de Exportación desde el Galpón Industrial de San Luis',
    categoria: 'Exportación',
    resumen: 'Productores de la Central Ibuelo consolidaron un nuevo embarque en transporte frigorífico cumpliendo estándares internacionales de lavado, desmane y calibre.',
    contenido: 'Con la participación activa de las familias productoras de San Luis, se completó el procesamiento poscosecha en nuestras tinas de lavado, desleche y desinfección. Las cajas de 22 kg de banano Williams fueron estibadas desde la rampa de carga de nuestro galpón de acopio directamente hacia unidades de transporte térmico con destino al mercado nacional y a la República Argentina.',
    fecha_publicacion: '28 de Octubre, 2026',
    autor: 'Comité de Comercialización ASBA',
    imagen_key: '7.jpeg',
    destacada: true
  },
  {
    id: 'not-3',
    titulo: 'Jornada de Capacitación en Enfunde Fitosanitario y Manejo de Racimos',
    categoria: 'Capacitación Técnica',
    resumen: 'Socios productores y estudiantes realizaron prácticas de campo sobre embolsado azul microperforado para proteger la fruta contra plagas y daños climáticos.',
    contenido: 'El manejo oportuno del enfunde con bolsas plásticas azules tratadas permite garantizar dedos uniformes, cáscara limpia de manchas y reducción de ataques de insectos en el racimo. Durante la jornada técnica en las parcelas de San Luis, se estandarizó el calendario de deschive, desbellote y colocación de cintas de edad para optimizar el punto exacto de cosecha.',
    fecha_publicacion: '05 de Noviembre, 2026',
    autor: 'Equipo Técnico Agronómico ASBA',
    imagen_key: '8.jpeg',
    destacada: false
  },
  {
    id: 'not-4',
    titulo: 'Lanzamiento Oficial de la Plataforma Web Institucional de ASBA',
    categoria: 'Institucional',
    resumen: 'En coordinación con el Bachillerato Técnico Humanístico (BTH) de la U.E. San Luis, ASBA inaugura su portal digital para conectar directamente con compradores y ciudadanía.',
    contenido: 'Celebrando más de 38 años de vida institucional desde nuestra fundación en septiembre de 1987 en la Central Ibuelo (Shinahota), damos un paso histórico hacia la modernización digital. A través de esta plataforma desarrollada por los estudiantes Noel Virreyra Gonzales y Aneth Rocha Otalora bajo la guía de la Prof. Juliet Zapata, visibilizamos el trabajo de nuestra comunidad ante el mundo.',
    fecha_publicacion: '16 de Noviembre, 2026',
    autor: 'Sr. Máximo Gonzales — Presidente ASBA',
    imagen_key: '14.jpeg',
    destacada: true
  }
];

const INITIAL_LOTES = [
  {
    codigo_lote: 'ASBA-2026-W01',
    variedad: 'Banano Williams (Musa acuminata AAA)',
    parcela_origen: 'Sector Norte - Comunidad San Luis, Central Ibuelo',
    productor_responsable: 'Asociación de Bananeros San Luis (ASBA)',
    certificacion: 'Certificación Fitosanitaria INIAF / MDRyT Vigente',
    fecha_cosecha: 'Noviembre 2026 (Semana 46)',
    planta_empaque: 'Galpón de Acopio y Empaque ASBA N° 1 - San Luis',
    peso_caja_kg: 22.0,
    destino_mercado: 'Exportación Internacional (Buenos Aires, Argentina) y Mercado Mayorista',
    estado_calidad: 'Grado A1 Exportación — Calibre 42-46, Lavado en Tina con Desinfección'
  },
  {
    codigo_lote: 'ASBA-2026-W02',
    variedad: 'Banano Williams (Musa acuminata AAA)',
    parcela_origen: 'Sector Central - San Luis, Municipio de Shinahota',
    productor_responsable: 'Productores Afiliados Central Ibuelo',
    certificacion: 'Plantines Certificados Vivero Semisombra INIAF',
    fecha_cosecha: 'Noviembre 2026 (Semana 45)',
    planta_empaque: 'Galpón de Acopio y Empaque ASBA N° 1 - San Luis',
    peso_caja_kg: 22.0,
    destino_mercado: 'Mercados Mayoristas Cochabamba, Santa Cruz y La Paz',
    estado_calidad: 'Grado A1 Nacional — Racimos con Enfunde Azul Fitosanitario'
  },
  {
    codigo_lote: 'ASBA-2026-W03',
    variedad: 'Plantines Certificados Williams en Vivero',
    parcela_origen: 'Vivero Tecnificado de Semisombra ASBA - San Luis',
    productor_responsable: 'Comité de Viveros y Renovación Genética ASBA',
    certificacion: 'Registro Oficial MDRyT - INIAF Variedad Williams',
    fecha_cosecha: 'Lote de Multiplicación 2026',
    planta_empaque: 'Vivero Central ASBA - San Luis, Shinahota',
    peso_caja_kg: 15.0,
    destino_mercado: 'Renovación de Parcelas de Socios Productores de Shinahota',
    estado_calidad: '100% Sanidad Vegetal — Libre de Nematodos y Sigatoka'
  }
];

const GALERIA_FOTOS = [
  {
    archivo: '14.jpeg',
    titulo: 'Identidad Institucional ASBA (Fundada en Septiembre de 1987)',
    categoria: 'Institucional',
    descripcion: 'Pancarta oficial de la Asociación de Bananeros San Luis (ASBA), fundada en septiembre de 1987 por don Primitivo Mamani en la Central Ibuelo, Municipio de Shinahota, Cochabamba.'
  },
  {
    archivo: '12.jpeg',
    titulo: 'Certificación INIAF / MDRyT — Variedad Williams',
    categoria: 'Viveros INIAF',
    descripcion: 'Lote de plantines de banano variedad Williams debidamente identificados y certificados bajo supervisión del INIAF y el Ministerio de Desarrollo Rural y Tierras (MDRyT).'
  },
  {
    archivo: '7.jpeg',
    titulo: 'Galpón Industrial de Acopio y Empaque ASBA',
    categoria: 'Empacadora',
    descripcion: 'Infraestructura propia de acopio y empaque en la comunidad de San Luis, equipada con rampa de carga directa para camiones y contenedores frigoríficos de exportación.'
  },
  {
    archivo: '4.jpeg',
    titulo: 'Tinas de Lavado, Desmane y Desinfección Poscosecha',
    categoria: 'Empacadora',
    descripcion: 'Proceso de inmersión en agua tratada para el desleche, limpieza y selección de manos de banano Williams antes de su empaque en cajas de 22 kg.'
  },
  {
    archivo: '8.jpeg',
    titulo: 'Manejo de Bananal y Enfunde Fitosanitario Azul',
    categoria: 'Plantaciones',
    descripcion: 'Inspección de racimos en desarrollo protegidos con bolsas plásticas azules microperforadas para preservar la sanidad e inocuidad de la fruta.'
  },
  {
    archivo: '6.jpeg',
    titulo: 'Control Técnico y Registro Agronómico en Parcela',
    categoria: 'Plantaciones',
    descripcion: 'Monitoreo de edad de racimos, control de sigatoka y evaluación de rendimiento productivo en las parcelas de los socios de San Luis.'
  },
  {
    archivo: '9.jpeg',
    titulo: 'Vivero Tecnificado bajo Carpa de Semisombra',
    categoria: 'Viveros INIAF',
    descripcion: 'Multiplicación y aclimatación de plantines vigorosos en bolsas de polietileno bajo malla semisombra para garantizar plantaciones uniformes.'
  },
  {
    archivo: '10.jpeg',
    titulo: 'Bandejas Germinadoras y Líneas de Aclimatación',
    categoria: 'Viveros INIAF',
    descripcion: 'Organización por hileras técnicas dentro del vivero de ASBA, asegurando trazabilidad desde la plántula hasta la cosecha.'
  },
  {
    archivo: '5.jpeg',
    titulo: 'Brigada de Inspección Fitosanitaria en Campo',
    categoria: 'Plantaciones',
    descripcion: 'Verificación técnica en campo para garantizar el cumplimiento de las exigencias de exportación hacia mercados internacionales.'
  },
  {
    archivo: '13.jpeg',
    titulo: 'Relevamiento de Información y Trabajo Comunitario',
    categoria: 'Institucional',
    descripcion: 'Coordinación en el vivero de ASBA durante el levantamiento de datos técnicos y verificación de procesos productivos.'
  },
  {
    archivo: '2.jpeg',
    titulo: 'Infraestructura de Sombreadero yDesarrollo Vegetativo',
    categoria: 'Viveros INIAF',
    descripcion: 'Vista panorámica del vivero de alta capacidad de ASBA con lotes señalizados por fecha de siembra y variedad.'
  },
  {
    archivo: '3.jpeg',
    titulo: 'Supervisión Participativa en Vivero',
    categoria: 'Institucional',
    descripcion: 'Acompañamiento de productores y técnicos en el seguimiento del crecimiento de plantines de banano.'
  }
];

const ETAPAS_PRODUCCION = [
  {
    paso: '01',
    titulo: 'Propagación en Vivero Semisombra',
    subtitulo: 'Sanidad desde la raíz',
    imagen: '9.jpeg',
    descripcion: 'Seleccionamos material genético libre de plagas y lo desarrollamos en viveros tecnificados con malla semisombra en San Luis, logrando plántulas vigorosas y uniformes.'
  },
  {
    paso: '02',
    titulo: 'Certificación Varietal INIAF - MDRyT',
    subtitulo: 'Variedad Williams Garantizada',
    imagen: '12.jpeg',
    descripcion: 'Cada lote de plantines de la variedad Williams cuenta con seguimiento y respaldo técnico del INIAF y el MDRyT, asegurando alto potencial productivo y resistencia.'
  },
  {
    paso: '03',
    titulo: 'Manejo Agronómico y Enfunde Azul',
    subtitulo: 'Protección biológica del racimo',
    imagen: '8.jpeg',
    descripcion: 'En campo aplicamos deshoje sanitario, fertilización equilibrada y embolsado oportuno con fundas azules tratadas que protegen el racimo de insectos y roces.'
  },
  {
    paso: '04',
    titulo: 'Control de Calidad y Calibre en Campo',
    subtitulo: 'Inspección previa al corte',
    imagen: '6.jpeg',
    descripcion: 'Técnicos y productores verifican el grado de llenado de los dedos (calibre 42 a 46) y la edad del racimo mediante cintas de colores antes de autorizar el corte.'
  },
  {
    paso: '05',
    titulo: 'Desmane, Lavado y Desleche en Tinas',
    subtitulo: 'Inocuidad poscosecha',
    imagen: '4.jpeg',
    descripcion: 'Los racimos llegan al galpón de ASBA donde se dividen en manos/coronas y pasan por tinas de agua limpia para eliminar el látex (desleche) y cicatrizar coronas.'
  },
  {
    paso: '06',
    titulo: 'Empaque de Exportación y Despacho Frigorífico',
    subtitulo: 'Del Trópico al mercado nacional e internacional',
    imagen: '7.jpeg',
    descripcion: 'La fruta clasificada se empaca en cajas ventiladas de 22 kg con sello ASBA y se estiba desde nuestra rampa directamente en camiones térmicos hacia Argentina y Bolivia.'
  }
];

async function callSupabaseRpc(fnName, params = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fnName}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
    signal: AbortSignal.timeout(10000)
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return await res.json();
}

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Estado sincronizado con Supabase Cloud
  const [cloudStatus, setCloudStatus] = useState('connecting'); // 'connecting' | 'online' | 'local'
  const [config, setConfig] = useState(INITIAL_CONFIG);
  const [noticias, setNoticias] = useState(INITIAL_NOTICIAS);
  const [lotes, setLotes] = useState(INITIAL_LOTES);
  const [totalConsultas, setTotalConsultas] = useState(2);

  // Estado para Verificador de Trazabilidad
  const [codigoLoteInput, setCodigoLoteInput] = useState('ASBA-2026-W01');
  const [loteSeleccionado, setLoteSeleccionado] = useState(INITIAL_LOTES[0]);

  // Estado para Calculadora Mayorista
  const [calcCajas, setCalcCajas] = useState(200);
  const [calcDestino, setCalcDestino] = useState('Mercado Nacional (Cochabamba / Santa Cruz / La Paz)');

  // Estado para Galería
  const [categoriaGaleria, setCategoriaGaleria] = useState('Todas');
  const [fotoModal, setFotoModal] = useState(null);
  const [noticiaModal, setNoticiaModal] = useState(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  // Estado para Formulario de Contacto / Cotización
  const [formNombre, setFormNombre] = useState('');
  const [formEmpresa, setFormEmpresa] = useState('');
  const [formTelefono, setFormTelefono] = useState('');
  const [formCiudad, setFormCiudad] = useState('');
  const [formTipo, setFormTipo] = useState('Cotización Mayorista de Cajas');
  const [formCajas, setFormCajas] = useState(100);
  const [formMensaje, setFormMensaje] = useState('');
  const [formSending, setFormSending] = useState(false);
  const [formFeedback, setFormFeedback] = useState(null);

  // Estado para Panel de Directiva (Admin con PIN)
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminConsultas, setAdminConsultas] = useState(INITIAL_CONSULTAS);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState('');

  // Campos para publicar nueva noticia desde Directiva
  const [newNoticiaTitulo, setNewNoticiaTitulo] = useState('');
  const [newNoticiaCat, setNewNoticiaCat] = useState('Institucional');
  const [newNoticiaResumen, setNewNoticiaResumen] = useState('');
  const [newNoticiaContenido, setNewNoticiaContenido] = useState('');
  const [newNoticiaImagen, setNewNoticiaImagen] = useState('14.jpeg');

  const cargarDatosPortal = async () => {
    setCloudStatus('connecting');
    try {
      const data = await callSupabaseRpc('portal_docente', { p_qr: ASBA_CLOUD_TOKEN });
      if (data && data.docente) {
        const items = Array.isArray(data.contenidos) ? data.contenidos : [];
        const rowCons = items.find((i) => i.curso === 'ASBA_CONSULTAS');
        if (rowCons && rowCons.texto) {
          try {
            const parsedCons = JSON.parse(rowCons.texto);
            if (Array.isArray(parsedCons) && parsedCons.length > 0) {
              const merged = [...parsedCons, ...INITIAL_CONSULTAS];
              setAdminConsultas(merged);
              setTotalConsultas(merged.length);
            }
          } catch {}
        }
        const rowNoti = items.find((i) => i.curso === 'ASBA_NOTICIAS');
        if (rowNoti && rowNoti.texto) {
          try {
            const parsedNoti = JSON.parse(rowNoti.texto);
            if (Array.isArray(parsedNoti) && parsedNoti.length > 0) {
              setNoticias([...parsedNoti, ...INITIAL_NOTICIAS]);
            }
          } catch {}
        }
        setCloudStatus('online');
        return;
      }
    } catch (err) {
      console.warn('Error sincronizando con Supabase:', err.message);
    }
    setCloudStatus('local');
  };

  useEffect(() => {
    cargarDatosPortal();
  }, []);

  const navigateTo = (secId) => {
    setActiveSection(secId);
    setMobileMenuOpen(false);
    const el = document.getElementById(secId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const buscarLote = (cod) => {
    const clean = (cod || codigoLoteInput).trim().toUpperCase();
    setCodigoLoteInput(clean);
    const found = lotes.find((l) => l.codigo_lote.toUpperCase() === clean);
    setLoteSeleccionado(found || null);
  };

  const handleEnviarConsulta = async (e) => {
    e.preventDefault();
    if (!formNombre.trim() || !formTelefono.trim() || !formMensaje.trim()) {
      setFormFeedback({ ok: false, msg: 'Por favor complete su nombre, teléfono y mensaje.' });
      return;
    }
    setFormSending(true);
    setFormFeedback(null);

    const nuevaConsulta = {
      id: 'cons-' + Date.now(),
      nombre_completo: formNombre.trim(),
      empresa_institucion: formEmpresa.trim(),
      telefono: formTelefono.trim(),
      ciudad_destino: formCiudad.trim() || 'Bolivia',
      tipo_solicitud: formTipo,
      cantidad_cajas: Number(formCajas) || 0,
      mensaje: formMensaje.trim().slice(0, 140),
      estado: 'Recibido'
    };

    try {
      const compactItem = [
        {
          id: nuevaConsulta.id,
          nombre_completo: nuevaConsulta.nombre_completo.slice(0, 40),
          empresa_institucion: nuevaConsulta.empresa_institucion.slice(0, 35),
          telefono: nuevaConsulta.telefono.slice(0, 20),
          ciudad_destino: nuevaConsulta.ciudad_destino.slice(0, 25),
          tipo_solicitud: nuevaConsulta.tipo_solicitud.slice(0, 35),
          cantidad_cajas: nuevaConsulta.cantidad_cajas,
          mensaje: nuevaConsulta.mensaje.slice(0, 110),
          estado: 'Recibido'
        }
      ];

      await callSupabaseRpc('registrar_contenidos', {
        p_qr: ASBA_CLOUD_TOKEN,
        p_items: [{ curso: 'ASBA_CONSULTAS', texto: JSON.stringify(compactItem) }]
      });

      setAdminConsultas((prev) => [nuevaConsulta, ...prev]);
      setTotalConsultas((prev) => prev + 1);
      setCloudStatus('online');
      setFormFeedback({
        ok: true,
        msg: '¡Su consulta fue registrada exitosamente en la base de datos en la nube de ASBA (Supabase Cloud)! También puede enviarla directo al WhatsApp del Presidente Máximo Gonzales.'
      });
      setFormNombre('');
      setFormEmpresa('');
      setFormTelefono('');
      setFormCiudad('');
      setFormMensaje('');
    } catch {
      setAdminConsultas((prev) => [nuevaConsulta, ...prev]);
      setTotalConsultas((prev) => prev + 1);
      setFormFeedback({
        ok: true,
        msg: '¡Consulta registrada correctamente! Puede pulsar el botón de WhatsApp para conversar de inmediato con la Presidencia de ASBA.'
      });
    } finally {
      setFormSending(false);
    }
  };

  const transferirCalculadoraAContacto = () => {
    const pesoTotalKg = calcCajas * 22;
    setFormTipo('Cotización Mayorista de Cajas');
    setFormCajas(calcCajas);
    setFormCiudad(calcDestino);
    setFormMensaje(
      `Solicito cotización comercial por ${calcCajas} cajas de Banano Variedad Williams (${pesoTotalKg.toLocaleString()} kg netos) con destino a ${calcDestino}.`
    );
    navigateTo('contacto');
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAdminLoading(true);
    setAdminError('');
    try {
      if (adminPin.trim() === '1987' || adminPin.trim() === '2026') {
        await cargarDatosPortal();
        setAdminAuthenticated(true);
      } else {
        setAdminError('PIN incorrecto. Use el PIN institucional 1987 (o 2026).');
      }
    } finally {
      setAdminLoading(false);
    }
  };

  const handlePublicarNoticia = async (e) => {
    e.preventDefault();
    if (!newNoticiaTitulo.trim() || !newNoticiaResumen.trim()) return;
    setAdminLoading(true);
    const nuevaNoti = {
      id: 'noti-' + Date.now(),
      titulo: newNoticiaTitulo.trim().slice(0, 80),
      categoria: newNoticiaCat,
      resumen: newNoticiaResumen.trim().slice(0, 140),
      contenido: (newNoticiaContenido || newNoticiaResumen).trim().slice(0, 220),
      fecha_publicacion: new Date().toLocaleDateString('es-BO', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      autor: 'Directorio ASBA — Pdte. Máximo Gonzales',
      imagen_key: newNoticiaImagen,
      destacada: true
    };
    try {
      await callSupabaseRpc('registrar_contenidos', {
        p_qr: ASBA_CLOUD_TOKEN,
        p_items: [{ curso: 'ASBA_NOTICIAS', texto: JSON.stringify([nuevaNoti]) }]
      });
      setCloudStatus('online');
    } catch {}
    setNoticias((prev) => [nuevaNoti, ...prev]);
    setNewNoticiaTitulo('');
    setNewNoticiaResumen('');
    setNewNoticiaContenido('');
    setAdminLoading(false);
  };

  const handleCambiarEstadoConsulta = async (id, nuevoEstado) => {
    setAdminConsultas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, estado: nuevoEstado } : c))
    );
  };

  const handleEliminarNoticia = async (id) => {
    setNoticias((prev) => prev.filter((n) => n.id !== id));
  };

  const fotosFiltradas =
    categoriaGaleria === 'Todas'
      ? GALERIA_FOTOS
      : GALERIA_FOTOS.filter((f) => f.categoria === categoriaGaleria);

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://asba-sanluis.onrender.com';
  const whatsappUrlDirecto = `https://wa.me/591${config.telefono_whatsapp}?text=${encodeURIComponent(
    'Estimado Sr. Máximo Gonzales (Presidente de ASBA San Luis), me comunico desde el sitio web oficial de ASBA para solicitar información comercial sobre la producción de banano Williams.'
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* ===================================================================
          CINTILLO SUPERIOR INSTITUCIONAL Y ESTADO DE NUBE SUPABASE
         =================================================================== */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-800/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>
              <strong>ASBA</strong> — Fundada en Septiembre de 1987 • Central Ibuelo, Municipio de Shinahota, Cochabamba
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              onClick={cargarDatosPortal}
              title="Clic para sincronizar con Supabase Cloud"
              className={`cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition ${
                cloudStatus === 'online'
                  ? 'bg-emerald-900/90 text-emerald-200 border-emerald-500/40'
                  : cloudStatus === 'connecting'
                  ? 'bg-amber-900/60 text-amber-200 border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-600'
              }`}
            >
              <Cloud className="w-3.5 h-3.5 text-amber-400" />
              {cloudStatus === 'online'
                ? 'Supabase Cloud Conectado'
                : cloudStatus === 'connecting'
                ? 'Sincronizando Nube...'
                : 'Modo Autónomo Activo'}
            </span>
            <a
              href={`tel:+591${config.telefono_whatsapp}`}
              className="hidden sm:inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-bold"
            >
              <Phone className="w-3.5 h-3.5" /> +591 {config.telefono_whatsapp} (Pdte. Máximo Gonzales)
            </a>
          </div>
        </div>
      </div>

      {/* ===================================================================
          BARRA DE NAVEGACIÓN PRINCIPAL (STICKY & RESPONSIVE)
         =================================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo e Identidad */}
          <div
            onClick={() => navigateTo('inicio')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-asba-green flex items-center justify-center text-amber-400 shadow-md group-hover:scale-105 transition">
              <Leaf className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-asba-green">
                  ASBA
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                  San Luis • 1987
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Asociación de Bananeros San Luis — Shinahota
              </p>
            </div>
          </div>

          {/* Enlaces Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'quienes-somos', label: 'Quiénes Somos' },
              { id: 'produccion', label: 'Producción Williams' },
              { id: 'trazabilidad', label: 'Trazabilidad y Cotizador' },
              { id: 'galeria', label: 'Galería' },
              { id: 'noticias', label: 'Noticias' },
              { id: 'contacto', label: 'Contacto' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`px-3.5 py-2 rounded-xl text-sm font-bold transition cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-emerald-900 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Botones de Acción Rápida (QR Jurado y Panel Directiva) */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setQrModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold bg-amber-400 hover:bg-amber-300 text-emerald-950 shadow-sm transition cursor-pointer"
              title="Mostrar Código QR para el Jurado Calificador"
            >
              <QrCode className="w-4 h-4" />
              <span>QR Jurado</span>
            </button>
            <button
              onClick={() => setAdminModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition cursor-pointer"
              title="Acceso para la Directiva de ASBA"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-800" />
              <span>Directiva</span>
            </button>
          </div>

          {/* Botón Menú Móvil */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menú Desplegable Móvil */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-2 shadow-xl">
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'quienes-somos', label: 'Quiénes Somos (Historia 1987)' },
              { id: 'produccion', label: 'Producción Banano Williams (INIAF)' },
              { id: 'trazabilidad', label: 'Trazabilidad QR y Cotizador de Cajas' },
              { id: 'galeria', label: 'Galería de Viveros y Empacadora' },
              { id: 'noticias', label: 'Noticias y Comunicados' },
              { id: 'contacto', label: 'Contacto Directo (+591 71777463)' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setQrModalOpen(true);
                }}
                className="flex-1 py-2.5 rounded-xl text-xs font-extrabold bg-amber-400 text-emerald-950 flex items-center justify-center gap-1.5"
              >
                <QrCode className="w-4 h-4" /> Mostrar QR al Jurado
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAdminModalOpen(true);
                }}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-white flex items-center justify-center gap-1.5"
              >
                <Lock className="w-4 h-4" /> Panel Directiva
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ===================================================================
          SECCIÓN 1: HERO / INICIO
         =================================================================== */}
      <section
        id="inicio"
        className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white py-16 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Columna Texto */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Calidad Agroexportadora del Trópico de Cochabamba</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Asociación de Bananeros{' '}
                <span className="text-amber-400">San Luis (ASBA)</span>
              </h1>

              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl">
                Desde <strong>septiembre de 1987</strong> impulsando la producción tecnificada,
                el acopio y la comercialización de <strong>Banano Variedad Williams</strong>{' '}
                certificado con el <strong>INIAF y el MDRyT</strong> en la Comunidad San Luis,
                Central Ibuelo del Municipio de Shinahota.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => navigateTo('contacto')}
                  className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 flex items-center gap-2 transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Solicitar Cotización de Cajas</span>
                </button>
                <a
                  href={whatsappUrlDirecto}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-2xl bg-emerald-700/80 hover:bg-emerald-600 text-white font-bold text-sm border border-emerald-500/40 flex items-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4 text-amber-300" />
                  <span>WhatsApp Pdte. Máximo Gonzales</span>
                </a>
                <button
                  onClick={() => navigateTo('produccion')}
                  className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/15 transition cursor-pointer"
                >
                  Ver Proceso Productivo
                </button>
              </div>

              {/* Indicadores Rápidos */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-emerald-800/80">
                <div className="bg-emerald-900/50 p-3.5 rounded-2xl border border-emerald-700/40">
                  <div className="text-2xl font-extrabold text-amber-400">1987</div>
                  <div className="text-xs text-emerald-200 mt-0.5">Año de Fundación en San Luis</div>
                </div>
                <div className="bg-emerald-900/50 p-3.5 rounded-2xl border border-emerald-700/40">
                  <div className="text-2xl font-extrabold text-amber-400">Williams</div>
                  <div className="text-xs text-emerald-200 mt-0.5">Variedad Certificada INIAF</div>
                </div>
                <div className="bg-emerald-900/50 p-3.5 rounded-2xl border border-emerald-700/40">
                  <div className="text-2xl font-extrabold text-amber-400">22 kg</div>
                  <div className="text-xs text-emerald-200 mt-0.5">Caja Estándar de Exportación</div>
                </div>
                <div className="bg-emerald-900/50 p-3.5 rounded-2xl border border-emerald-700/40">
                  <div className="text-2xl font-extrabold text-amber-400">100%</div>
                  <div className="text-xs text-emerald-200 mt-0.5">Control Fitosanitario y Lavado</div>
                </div>
              </div>
            </div>

            {/* Columna Composición Fotográfica Real */}
            <div className="lg:col-span-5">
              <div className="relative bg-emerald-900/60 p-3 rounded-3xl border border-emerald-700/50 shadow-2xl">
                <img
                  src="/fotos/14.jpeg"
                  alt="Pancarta Oficial de ASBA San Luis fundada en septiembre de 1987"
                  className="w-full h-72 sm:h-80 object-cover rounded-2xl shadow-md"
                />
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="relative overflow-hidden rounded-xl border border-emerald-700/50">
                    <img
                      src="/fotos/12.jpeg"
                      alt="Vivero certificado INIAF Variedad Williams"
                      className="w-full h-28 object-cover"
                    />
                    <span className="absolute bottom-1.5 left-1.5 right-1.5 bg-emerald-950/85 text-[10px] font-bold px-2 py-1 rounded text-amber-300">
                      🌱 Vivero INIAF - Williams
                    </span>
                  </div>
                  <div className="relative overflow-hidden rounded-xl border border-emerald-700/50">
                    <img
                      src="/fotos/7.jpeg"
                      alt="Galpón de Empaque y Acopio ASBA San Luis"
                      className="w-full h-28 object-cover"
                    />
                    <span className="absolute bottom-1.5 left-1.5 right-1.5 bg-emerald-950/85 text-[10px] font-bold px-2 py-1 rounded text-amber-300">
                      🏢 Empacadora San Luis
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between px-2 py-1 text-xs text-emerald-200">
                  <span>📍 Central Ibuelo — Municipio de Shinahota</span>
                  <span className="font-bold text-amber-300">Pdte. Máximo Gonzales</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECCIÓN 2: QUIÉNES SOMOS (HISTORIA 1987, MISIÓN, VISIÓN Y DIRECTIVA)
         =================================================================== */}
      <section id="quienes-somos" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Identidad e Historia Institucional
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            Más de 38 Años Unidos por el Desarrollo Productivo de San Luis
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            Conozca el origen histórico, los principios cooperativos y la estructura directiva de la{' '}
            <strong>Asociación de Bananeros San Luis (ASBA)</strong>.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Reseña Histórica */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-4">
            <div className="inline-flex items-center gap-2 text-emerald-800 font-extrabold text-sm uppercase">
              <Calendar className="w-5 h-5 text-amber-500" />
              <span>Reseña Histórica Oficial (Septiembre de 1987 – 2026)</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              De la Agricultura Familiar a la Agroexportación Tecnificada
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              La <strong>Asociación de Bananeros San Luis (ASBA)</strong> fue fundada en el mes de{' '}
              <strong>septiembre de 1987</strong> en la <strong>Comunidad San Luis</strong>, perteneciente
              a la <strong>Central Ibuelo del Municipio de Shinahota</strong> (Departamento de Cochabamba,
              Bolivia), gracias a la visión organizativa de don <strong>Primitivo Mamani</strong> junto a
              un grupo de productores pioneros que comprendieron la necesidad de articular esfuerzos para
              mejorar el cultivo y la comercialización del plátano y banano.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              A lo largo de casi cuatro décadas, ASBA evolucionó desde el cultivo tradicional hacia la
              implementación de paquetes tecnológicos de vanguardia: estableció viveros comunitarios bajo
              malla semisombra con plantines certificados de la <strong>variedad Williams</strong> (en
              coordinación con el <strong>INIAF</strong> y el <strong>MDRyT</strong>), incorporó el enfunde
              fitosanitario azul en parcela y construyó su propio <strong>galpón industrial de acopio y
              empaque</strong> dotado de tinas de lavado, desleche y rampa de embarque para camiones
              frigoríficos de alto tonelaje.
            </p>

            {/* Misión y Visión */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <h4 className="font-extrabold text-emerald-950 text-base flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-700" /> Misión Institucional
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                  Agrupar, representar y fortalecer a las familias productoras de banano de la comunidad
                  de San Luis, produciendo fruta certificada de variedad Williams con altos estándares de
                  calidad, inocuidad poscosecha y sostenibilidad ambiental para el mercado nacional e
                  internacional.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
                <h4 className="font-extrabold text-amber-950 text-base flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-600" /> Visión Institucional
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                  Consolidarse como la asociación bananera líder y referente tecnológico del Municipio de
                  Shinahota y del Trópico de Cochabamba, reconocida por su excelencia agroexportadora,
                  trazabilidad digital y comercio directo sin intermediación especulativa.
                </p>
              </div>
            </div>
          </div>

          {/* Tarjeta de Directiva y Datos Oficiales */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-emerald-800">
              <div className="flex items-center justify-between border-b border-emerald-800 pb-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                    Directorio Institucional Vigente
                  </span>
                  <h3 className="text-xl font-extrabold mt-1">Representación Oficial ASBA</h3>
                </div>
                <Users className="w-8 h-8 text-amber-400" />
              </div>

              <div className="space-y-4 mt-5 text-sm">
                <div className="bg-emerald-900/70 p-4 rounded-2xl border border-emerald-700/50">
                  <div className="text-xs text-amber-300 font-bold uppercase">
                    Presidente de la Asociación (ASBA)
                  </div>
                  <div className="text-lg font-extrabold text-white mt-0.5">
                    {config.presidente}
                  </div>
                  <div className="text-xs text-emerald-200 mt-1 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Contacto Oficial / WhatsApp: +591 {config.telefono_whatsapp}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-emerald-900/40 p-3.5 rounded-xl border border-emerald-800">
                    <span className="text-emerald-300 block">Fundador Histórico:</span>
                    <strong className="text-white mt-0.5 block">Don Primitivo Mamani</strong>
                  </div>
                  <div className="bg-emerald-900/40 p-3.5 rounded-xl border border-emerald-800">
                    <span className="text-emerald-300 block">Fecha de Fundación:</span>
                    <strong className="text-white mt-0.5 block">Septiembre de 1987</strong>
                  </div>
                  <div className="bg-emerald-900/40 p-3.5 rounded-xl border border-emerald-800">
                    <span className="text-emerald-300 block">Central Sindical:</span>
                    <strong className="text-white mt-0.5 block">Central Ibuelo</strong>
                  </div>
                  <div className="bg-emerald-900/40 p-3.5 rounded-xl border border-emerald-800">
                    <span className="text-emerald-300 block">Jurisdicción:</span>
                    <strong className="text-white mt-0.5 block">Shinahota, Cochabamba</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={whatsappUrlDirecto}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Comunicarse con Presidencia ASBA</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-xs">
              <img
                src="/fotos/13.jpeg"
                alt="Socios y equipo técnico de ASBA"
                className="w-24 h-24 rounded-xl object-cover shrink-0"
              />
              <div className="text-xs text-slate-600 space-y-1">
                <div className="font-extrabold text-slate-900 text-sm">
                  Articulación con el INIAF y MDRyT
                </div>
                <p>
                  ASBA trabaja estrechamente con programas estatales de sanidad vegetal y
                  certificación de semillas para garantizar fruta de primera calidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECCIÓN 3: PRODUCCIÓN BANANERA (VARIEDAD WILLIAMS & 6 ETAPAS)
         =================================================================== */}
      <section id="produccion" className="py-16 lg:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
              Cadena Productiva Certificada
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              Producción y Poscosecha del Banano Variedad Williams
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Desde el vivero de semisombra hasta la estiba en camión frigorífico: conozca las 6 etapas
              técnicas que respaldan el prestigio del banano de San Luis.
            </p>
          </div>

          {/* Ficha Técnica Destacada de la Variedad Williams */}
          <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl p-6 sm:p-8 mb-12 shadow-lg">
            <div className="grid md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                  <FileCheck2 className="w-4 h-4" /> Ficha Técnica Agronómica Oficial
                </div>
                <h3 className="text-2xl font-extrabold">
                  Banano Cavendish — Variedad &ldquo;Williams&rdquo; (Musa acuminata AAA)
                </h3>
                <p className="text-sm text-emerald-100 leading-relaxed">
                  Variedad de porte medio, altamente resistente al volcamiento por viento, con racimos
                  cilíndricos compactos y dedos de excelente longitud (20 a 26 cm) y calibre uniforme. Su
                  firmeza de pulpa y vida verde prolongada la convierten en la variedad predilecta para el
                  transporte refrigerado de larga distancia.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <span className="text-emerald-200 block">Respaldo Técnico:</span>
                    <strong className="text-amber-300">MDRyT — INIAF</strong>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl">
                    <span className="text-emerald-200 block">Peso Neto por Caja:</span>
                    <strong className="text-amber-300">22.0 kg (Exportación)</strong>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl">
                    <span className="text-emerald-200 block">Calibre de Cosecha:</span>
                    <strong className="text-amber-300">Grado 42 – 46</strong>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl">
                    <span className="text-emerald-200 block">Mercados Destino:</span>
                    <strong className="text-amber-300">Bolivia y Argentina</strong>
                  </div>
                </div>
              </div>
              <div className="md:col-span-4">
                <img
                  src="/fotos/12.jpeg"
                  alt="Letrero oficial MDRyT INIAF Variedad Williams en el vivero de ASBA"
                  className="w-full h-56 object-cover rounded-2xl border-2 border-amber-400/50 shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Las 6 Etapas con Fotografías Reales de Campo */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ETAPAS_PRODUCCION.map((etapa) => (
              <div
                key={etapa.paso}
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 hover:shadow-lg hover:border-emerald-600/40 transition flex flex-col"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={`/fotos/${etapa.imagen}`}
                    alt={etapa.titulo}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-emerald-950/90 text-amber-400 font-extrabold text-xs px-3 py-1 rounded-full border border-amber-400/30">
                    ETAPA {etapa.paso}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      {etapa.subtitulo}
                    </span>
                    <h4 className="text-lg font-extrabold text-slate-900 mt-1">
                      {etapa.titulo}
                    </h4>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      {etapa.descripcion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECCIÓN 4: TRAZABILIDAD QR DE LOTES Y SIMULADOR MAYORISTA DE CAJAS
         =================================================================== */}
      <section id="trazabilidad" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sub-módulo 1: Verificador Interactivo de Trazabilidad Fitosanitaria */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                <QrCode className="w-4 h-4" /> Innovación Tecnológica ASBA
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-3">
                Verificador de Trazabilidad de Lotes de Exportación
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Consulte el origen, certificación INIAF y planta de empaque de las cajas de banano de ASBA
                almacenadas en <strong>Supabase Cloud</strong>:
              </p>

              {/* Botones rápidos de lotes */}
              <div className="flex flex-wrap gap-2 mt-4">
                {lotes.map((l) => (
                  <button
                    key={l.codigo_lote}
                    onClick={() => buscarLote(l.codigo_lote)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                      codigoLoteInput === l.codigo_lote
                        ? 'bg-emerald-900 text-amber-300 border-emerald-900'
                        : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-emerald-50'
                    }`}
                  >
                    📦 {l.codigo_lote}
                  </button>
                ))}
              </div>

              {/* Buscador manual */}
              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  value={codigoLoteInput}
                  onChange={(e) => setCodigoLoteInput(e.target.value)}
                  placeholder="Ej: ASBA-2026-W01"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold focus:outline-none focus:border-emerald-700"
                />
                <button
                  onClick={() => buscarLote(codigoLoteInput)}
                  className="px-4 py-2.5 rounded-xl bg-asba-green text-white font-bold text-sm flex items-center gap-1.5 hover:bg-emerald-800 cursor-pointer"
                >
                  <Search className="w-4 h-4" /> Verificar
                </button>
              </div>

              {/* Resultado del Lote */}
              {loteSeleccionado ? (
                <div className="mt-5 p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                    <span className="font-extrabold text-emerald-950 text-base">
                      Lote: {loteSeleccionado.codigo_lote}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-800 text-amber-300 text-xs font-bold">
                      ✓ VERIFICADO INIAF
                    </span>
                  </div>
                  <div>
                    <strong className="text-slate-700">Variedad:</strong>{' '}
                    <span className="text-slate-900 font-semibold">{loteSeleccionado.variedad}</span>
                  </div>
                  <div>
                    <strong className="text-slate-700">Parcela de Origen:</strong>{' '}
                    <span className="text-slate-900">{loteSeleccionado.parcela_origen}</span>
                  </div>
                  <div>
                    <strong className="text-slate-700">Certificación:</strong>{' '}
                    <span className="text-emerald-900 font-bold">{loteSeleccionado.certificacion}</span>
                  </div>
                  <div>
                    <strong className="text-slate-700">Planta de Empaque:</strong>{' '}
                    <span className="text-slate-900">{loteSeleccionado.planta_empaque}</span>
                  </div>
                  <div>
                    <strong className="text-slate-700">Destino / Calidad:</strong>{' '}
                    <span className="text-slate-900">{loteSeleccionado.estado_calidad}</span>
                  </div>
                </div>
              ) : (
                <div className="mt-5 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  No se encontró el código ingresado. Seleccione uno de los lotes activos (ej. ASBA-2026-W01).
                </div>
              )}
            </div>
          </div>

          {/* Sub-módulo 2: Calculadora / Simulador Comercial de Cajas de Exportación */}
          <div className="lg:col-span-6 bg-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-emerald-800 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-300 bg-amber-400/15 px-3 py-1 rounded-full">
                <Calculator className="w-4 h-4" /> Herramienta para Compradores Mayoristas
              </div>
              <h3 className="text-2xl font-extrabold mt-3">
                Simulador de Volumen y Logística de Cajas ASBA
              </h3>
              <p className="text-sm text-emerald-200 mt-1">
                Calcule el peso neto de carga y capacidad logística para pedidos mayoristas desde nuestro
                galpón de acopio en San Luis:
              </p>

              <div className="space-y-4 mt-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-emerald-200 mb-1.5">
                    Cantidad de Cajas Requeridas (22 kg netos por caja):
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="50"
                      max="1500"
                      step="50"
                      value={calcCajas}
                      onChange={(e) => setCalcCajas(Number(e.target.value))}
                      className="flex-1 accent-amber-400 cursor-pointer"
                    />
                    <input
                      type="number"
                      min="10"
                      max="5000"
                      value={calcCajas}
                      onChange={(e) => setCalcCajas(Math.max(1, Number(e.target.value)))}
                      className="w-24 px-3 py-2 rounded-xl bg-emerald-900 border border-emerald-700 text-amber-300 font-extrabold text-center text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-emerald-200 mb-1.5">
                    Mercado o Ciudad de Destino:
                  </label>
                  <select
                    value={calcDestino}
                    onChange={(e) => setCalcDestino(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-emerald-900 border border-emerald-700 text-white text-sm font-semibold"
                  >
                    <option value="Mercado Nacional (Cochabamba / Santa Cruz / La Paz)">
                      Mercado Nacional (Cochabamba / Santa Cruz / La Paz)
                    </option>
                    <option value="Exportación Internacional (Buenos Aires / Córdoba - Argentina)">
                      Exportación Internacional (Buenos Aires / Córdoba - Argentina)
                    </option>
                    <option value="Acopio Directo en Galpón ASBA - San Luis (Shinahota)">
                      Acopio Directo en Galpón ASBA - San Luis (Shinahota)
                    </option>
                  </select>
                </div>

                {/* Resumen de Cálculos */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-emerald-900/80 p-3.5 rounded-2xl border border-emerald-700/60 text-center">
                    <div className="text-xs text-emerald-300">Peso Neto Total</div>
                    <div className="text-lg sm:text-xl font-extrabold text-amber-400 mt-0.5">
                      {(calcCajas * 22).toLocaleString()} kg
                    </div>
                  </div>
                  <div className="bg-emerald-900/80 p-3.5 rounded-2xl border border-emerald-700/60 text-center">
                    <div className="text-xs text-emerald-300">Toneladas Métricas</div>
                    <div className="text-lg sm:text-xl font-extrabold text-amber-400 mt-0.5">
                      {((calcCajas * 22) / 1000).toFixed(2)} TM
                    </div>
                  </div>
                  <div className="bg-emerald-900/80 p-3.5 rounded-2xl border border-emerald-700/60 text-center">
                    <div className="text-xs text-emerald-300">Pallets Estimados</div>
                    <div className="text-lg sm:text-xl font-extrabold text-amber-400 mt-0.5">
                      {Math.ceil(calcCajas / 48)} pallets
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={transferirCalculadoraAContacto}
              className="mt-6 w-full py-3.5 px-5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
            >
              <Truck className="w-5 h-5" />
              <span>Solicitar Cotización Oficial de estas {calcCajas} Cajas</span>
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECCIÓN 5: GALERÍA FOTOGRÁFICA REAL DE SAN LUIS
         =================================================================== */}
      <section id="galeria" className="py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Evidencia Real de Campo
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                Galería Fotográfica de ASBA en San Luis
              </h2>
              <p className="text-slate-600 mt-1 text-sm sm:text-base">
                Registro visual auténtico de nuestros viveros INIAF, parcelas con enfunde azul y planta
                empacadora en la Central Ibuelo.
              </p>
            </div>

            {/* Filtros de categoría */}
            <div className="flex flex-wrap gap-2">
              {['Todas', 'Institucional', 'Viveros INIAF', 'Plantaciones', 'Empacadora'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoriaGaleria(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                    categoriaGaleria === cat
                      ? 'bg-asba-green text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fotosFiltradas.map((foto) => (
              <div
                key={foto.archivo}
                onClick={() => setFotoModal(foto)}
                className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 hover:shadow-xl transition cursor-pointer flex flex-col"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={`/fotos/${foto.archivo}`}
                    alt={foto.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-emerald-950/85 text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    {foto.categoria}
                  </span>
                  <div className="absolute inset-0 bg-emerald-950/0 group-hover:bg-emerald-950/30 transition flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-white text-emerald-950 font-extrabold text-xs px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 transition">
                      <Eye className="w-3.5 h-3.5" /> Ampliar Fotografía
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-extrabold text-slate-900 text-base">{foto.titulo}</h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">
                    {foto.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECCIÓN 6: NOTICIAS Y COMUNICADOS (CONECTADO A SUPABASE)
         =================================================================== */}
      <section id="noticias" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
              Actualidad Institucional en Tiempo Real
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              Noticias, Actividades y Comunicados de ASBA
            </h2>
          </div>
          <button
            onClick={() => setAdminModalOpen(true)}
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span>Publicar Comunicado (Directiva)</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {noticias.map((noti) => (
            <article
              key={noti.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xs border border-slate-200 hover:shadow-md transition flex flex-col sm:flex-row"
            >
              <div className="sm:w-48 h-48 sm:h-auto shrink-0 relative">
                <img
                  src={`/fotos/${noti.imagen_key || '14.jpeg'}`}
                  alt={noti.titulo}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-emerald-950/90 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-md">
                  {noti.categoria}
                </span>
              </div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="text-xs text-slate-400 font-semibold flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{noti.fecha_publicacion}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-1.5 leading-snug">
                    {noti.titulo}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed line-clamp-3">
                    {noti.resumen}
                  </p>
                </div>
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500">{noti.autor}</span>
                  <button
                    onClick={() => setNoticiaModal(noti)}
                    className="text-xs font-extrabold text-emerald-800 hover:text-emerald-600 flex items-center gap-1 cursor-pointer"
                  >
                    Leer completo <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===================================================================
          SECCIÓN 7: CONTACTO OFICIAL Y FORMULARIO SUPABASE + WHATSAPP
         =================================================================== */}
      <section id="contacto" className="py-16 lg:py-24 bg-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Datos de Contacto Directo */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-300 bg-amber-400/15 px-3 py-1 rounded-full">
                Vinculación Comercial e Institucional
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Contacte Directamente con la Directiva de ASBA
              </h2>
              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                Atendemos consultas de compradores mayoristas nacionales e internacionales, instituciones
                públicas y productores interesados en nuestra producción certificada de banano Williams.
              </p>

              <div className="space-y-4 pt-2">
                <div className="bg-emerald-900/70 p-4 rounded-2xl border border-emerald-700/50 flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-amber-400 text-emerald-950 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-amber-300 font-bold uppercase">
                      Presidente de la Asociación (ASBA)
                    </div>
                    <div className="text-base font-extrabold text-white mt-0.5">
                      {config.presidente}
                    </div>
                    <div className="text-xs text-emerald-200 mt-0.5">
                      Atención directa a compradores e instituciones
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-900/70 p-4 rounded-2xl border border-emerald-700/50 flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-amber-400 text-emerald-950 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-amber-300 font-bold uppercase">
                      Teléfono Celular y WhatsApp Oficial
                    </div>
                    <div className="text-lg font-extrabold text-white mt-0.5">
                      +591 {config.telefono_whatsapp}
                    </div>
                    <a
                      href={whatsappUrlDirecto}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 hover:underline mt-1"
                    >
                      Abrir chat directo en WhatsApp <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="bg-emerald-900/70 p-4 rounded-2xl border border-emerald-700/50 flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-amber-400 text-emerald-950 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-amber-300 font-bold uppercase">
                      Ubicación de Sede y Planta Empacadora
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      Comunidad San Luis, Central Ibuelo
                    </div>
                    <div className="text-xs text-emerald-200 mt-0.5">
                      Municipio de Shinahota — Provincia Tiraque, Cochabamba, Bolivia
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario Conectado a Supabase */}
            <div className="lg:col-span-7 bg-white text-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Formulario de Cotización y Consulta Oficial
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Los mensajes se almacenan en tiempo real en la base de datos en la nube de ASBA.
                  </p>
                </div>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full">
                  {totalConsultas} consultas registradas
                </span>
              </div>

              <form onSubmit={handleEnviarConsulta} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formNombre}
                      onChange={(e) => setFormNombre(e.target.value)}
                      placeholder="Ej. Juan Pérez"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      Empresa o Institución
                    </label>
                    <input
                      type="text"
                      value={formEmpresa}
                      onChange={(e) => setFormEmpresa(e.target.value)}
                      placeholder="Ej. Distribuidora Frutícola S.R.L."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="text"
                      required
                      value={formTelefono}
                      onChange={(e) => setFormTelefono(e.target.value)}
                      placeholder="Ej. 71777463"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      Ciudad / País de Destino
                    </label>
                    <input
                      type="text"
                      value={formCiudad}
                      onChange={(e) => setFormCiudad(e.target.value)}
                      placeholder="Ej. Cochabamba / Buenos Aires"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      Tipo de Solicitud
                    </label>
                    <select
                      value={formTipo}
                      onChange={(e) => setFormTipo(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
                    >
                      <option value="Cotización Mayorista de Cajas">
                        Cotización Mayorista de Cajas
                      </option>
                      <option value="Compra de Plantines Certificados Williams">
                        Compra de Plantines Certificados Williams
                      </option>
                      <option value="Coordinación Institucional / INIAF">
                        Coordinación Institucional / INIAF
                      </option>
                      <option value="Consulta General">Consulta General</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      Cantidad Estimada de Cajas (Opcional)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formCajas}
                      onChange={(e) => setFormCajas(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Detalle de su Mensaje o Requerimiento *
                  </label>
                  <textarea
                    rows="3"
                    required
                    value={formMensaje}
                    onChange={(e) => setFormMensaje(e.target.value)}
                    placeholder="Escriba su consulta comercial, requerimiento de cajas o mensaje para el Directorio de ASBA..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
                  />
                </div>

                {formFeedback && (
                  <div
                    className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                      formFeedback.ok
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                        : 'bg-rose-50 text-rose-900 border border-rose-300'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{formFeedback.msg}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={formSending}
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-asba-green hover:bg-emerald-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>
                      {formSending ? 'Guardando en Supabase Cloud...' : 'Enviar Consulta a ASBA'}
                    </span>
                  </button>
                  <a
                    href={whatsappUrlDirecto}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3.5 px-5 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-extrabold text-sm flex items-center justify-center gap-2 transition"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-800" />
                    <span>Enviar por WhatsApp</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          PIE DE PÁGINA (FOOTER INSTITUCIONAL BTH SAN LUIS)
         =================================================================== */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-extrabold text-lg">
              <Leaf className="w-5 h-5 text-amber-400" />
              <span>ASBA — SAN LUIS</span>
            </div>
            <p className="leading-relaxed">
              Asociación de Bananeros San Luis. Fundada en septiembre de 1987 por don Primitivo
              Mamani en la Central Ibuelo, Municipio de Shinahota, Cochabamba – Bolivia.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-white font-bold uppercase tracking-wider">
              Autoridades Institucionales
            </div>
            <p>Presidente ASBA: Sr. Máximo Gonzales</p>
            <p>Teléfono / WhatsApp: +591 71777463</p>
            <p>Variedad: Banano Williams (INIAF / MDRyT)</p>
          </div>

          <div className="space-y-2">
            <div className="text-white font-bold uppercase tracking-wider">
              Proyecto de Innovación BTH 2026
            </div>
            <p>Unidad Educativa Técnico Humanístico &ldquo;San Luis&rdquo;</p>
            <p>Especialidad: Sistemas Informáticos (6to de Secundaria)</p>
            <p className="text-amber-300 font-semibold">
              Estudiantes: Noel Virreyra Gonzales &amp; Aneth Rocha Otalora
            </p>
            <p>Docente Guía: Prof. Juliet Zapata</p>
          </div>

          <div className="space-y-3">
            <div className="text-white font-bold uppercase tracking-wider">
              Infraestructura Cloud
            </div>
            <p>Desplegado en Render.com + Base de Datos PostgreSQL en Supabase Cloud.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setQrModalOpen(true)}
                className="px-3 py-2 rounded-xl bg-amber-400 text-emerald-950 font-extrabold cursor-pointer"
              >
                Código QR Jurado
              </button>
              <button
                onClick={() => setAdminModalOpen(true)}
                className="px-3 py-2 rounded-xl bg-slate-800 text-slate-200 font-bold border border-slate-700 cursor-pointer"
              >
                Panel Directiva
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-900 text-center text-slate-500">
          © 2026 Asociación de Bananeros San Luis (ASBA) — Todos los derechos reservados.
        </div>
      </footer>

      {/* ===================================================================
          MODAL 1: VISOR DE FOTOGRAFÍA AMPLIADA (LIGHTBOX)
         =================================================================== */}
      {fotoModal && (
        <div
          onClick={() => setFotoModal(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl"
          >
            <div className="relative bg-slate-950">
              <img
                src={`/fotos/${fotoModal.archivo}`}
                alt={fotoModal.titulo}
                className="w-full max-h-[70vh] object-contain mx-auto"
              />
              <button
                onClick={() => setFotoModal(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <span className="text-xs font-extrabold uppercase text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                {fotoModal.categoria}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-2">{fotoModal.titulo}</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{fotoModal.descripcion}</p>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 2: LECTURA DE NOTICIA COMPLETA
         =================================================================== */}
      {noticiaModal && (
        <div
          onClick={() => setNoticiaModal(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl"
          >
            <div className="relative h-64">
              <img
                src={`/fotos/${noticiaModal.imagen_key || '14.jpeg'}`}
                alt={noticiaModal.titulo}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setNoticiaModal(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                <span className="bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-md">
                  {noticiaModal.categoria}
                </span>
                <span>{noticiaModal.fecha_publicacion}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">{noticiaModal.titulo}</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{noticiaModal.contenido}</p>
              <div className="pt-4 border-t border-slate-200 text-xs font-bold text-slate-500">
                Publicado por: {noticiaModal.autor}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 3: CÓDIGO QR PARA EL JURADO CALIFICADOR (DEFENSA EN VIVO)
         =================================================================== */}
      {qrModalOpen && (
        <div
          onClick={() => setQrModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl space-y-4"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-900">
                Defensa de Proyecto BTH 2026
              </span>
              <button
                onClick={() => setQrModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900">
              Acceso Móvil Instantáneo para el Jurado
            </h3>
            <p className="text-xs text-slate-600">
              Escanee este código QR con la cámara de su celular para explorar el sitio web oficial de{' '}
              <strong>ASBA San Luis</strong> en tiempo real:
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-emerald-700 inline-block mx-auto">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                  currentUrl
                )}`}
                alt="Código QR del Sitio Web de ASBA"
                className="w-48 h-48 mx-auto rounded-lg"
              />
            </div>

            <div className="text-xs bg-slate-100 p-3 rounded-xl font-mono text-emerald-900 break-all">
              {currentUrl}
            </div>

            <div className="text-left text-xs bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-1 text-slate-700">
              <div>
                <strong>Estudiantes:</strong> Noel Virreyra Gonzales &amp; Aneth Rocha Otalora
              </div>
              <div>
                <strong>Docente Guía:</strong> Prof. Juliet Zapata
              </div>
              <div>
                <strong>Unidad Educativa:</strong> U.E. Técnico Humanístico &ldquo;San Luis&rdquo;
              </div>
              <div>
                <strong>Presidente ASBA:</strong> Sr. Máximo Gonzales (+591 71777463)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 4: PANEL ADMINISTRATIVO DE LA DIRECTIVA ASBA (CONECTADO A SUPABASE)
         =================================================================== */}
      {adminModalOpen && (
        <div
          onClick={() => setAdminModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-emerald-900 text-amber-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Panel de Gestión Directiva — ASBA San Luis
                  </h3>
                  <p className="text-xs text-slate-500">
                    Administración de comunicados oficiales y bandeja de consultas comerciales en Supabase
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAdminModalOpen(false)}
                className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!adminAuthenticated ? (
              <form onSubmit={handleAdminLogin} className="max-w-sm mx-auto py-8 space-y-4 text-center">
                <p className="text-sm text-slate-600">
                  Ingrese el PIN institucional de la Directiva de ASBA para gestionar comunicados y
                  revisar cotizaciones recibidas (PIN de demostración para el jurado: <strong>1987</strong>):
                </p>
                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  placeholder="PIN Directiva (1987)"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-center text-lg font-extrabold tracking-widest"
                />
                {adminError && <p className="text-xs text-rose-600 font-bold">{adminError}</p>}
                <button
                  type="submit"
                  disabled={adminLoading}
                  className="w-full py-3 rounded-xl bg-asba-green text-white font-extrabold text-sm cursor-pointer"
                >
                  {adminLoading ? 'Verificando en Supabase...' : 'Ingresar al Panel de Directiva'}
                </button>
              </form>
            ) : (
              <div className="grid md:grid-cols-12 gap-6">
                {/* Publicar Nueva Noticia */}
                <div className="md:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                    <PlusCircle className="w-4 h-4 text-emerald-700" /> Publicar Nuevo Comunicado Oficial
                  </h4>
                  <form onSubmit={handlePublicarNoticia} className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">Título del Comunicado</label>
                      <input
                        type="text"
                        required
                        value={newNoticiaTitulo}
                        onChange={(e) => setNewNoticiaTitulo(e.target.value)}
                        placeholder="Ej. Asamblea General de Productores ASBA"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-bold text-slate-600 block mb-1">Categoría</label>
                        <select
                          value={newNoticiaCat}
                          onChange={(e) => setNewNoticiaCat(e.target.value)}
                          className="w-full px-2 py-2 rounded-lg border border-slate-300 bg-white"
                        >
                          <option value="Institucional">Institucional</option>
                          <option value="Producción e INIAF">Producción e INIAF</option>
                          <option value="Exportación">Exportación</option>
                          <option value="Convocatoria">Convocatoria</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-bold text-slate-600 block mb-1">Fotografía</label>
                        <select
                          value={newNoticiaImagen}
                          onChange={(e) => setNewNoticiaImagen(e.target.value)}
                          className="w-full px-2 py-2 rounded-lg border border-slate-300 bg-white"
                        >
                          <option value="14.jpeg">Pancarta ASBA 1987</option>
                          <option value="12.jpeg">Vivero INIAF Williams</option>
                          <option value="7.jpeg">Galpón Empacadora</option>
                          <option value="4.jpeg">Tinas de Lavado</option>
                          <option value="8.jpeg">Enfunde Azul</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">Resumen Corto</label>
                      <textarea
                        rows="2"
                        required
                        value={newNoticiaResumen}
                        onChange={(e) => setNewNoticiaResumen(e.target.value)}
                        placeholder="Resumen ejecutivo del comunicado..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={adminLoading}
                      className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold cursor-pointer"
                    >
                      Guardar y Publicar en Supabase
                    </button>
                  </form>

                  <div className="pt-3 border-t border-slate-200 space-y-2">
                    <div className="font-bold text-xs text-slate-600">
                      Comunicados Activos ({noticias.length}):
                    </div>
                    {noticias.map((n) => (
                      <div
                        key={n.id}
                        className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200 text-xs"
                      >
                        <span className="truncate font-semibold pr-2">{n.titulo}</span>
                        <button
                          onClick={() => handleEliminarNoticia(n.id)}
                          className="text-rose-600 hover:text-rose-800 p-1 shrink-0 cursor-pointer"
                          title="Eliminar comunicado"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bandeja de Consultas Comerciales Recibidas */}
                <div className="md:col-span-7 space-y-3">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center justify-between">
                    <span>Bandeja de Consultas y Cotizaciones ({adminConsultas.length})</span>
                    <span className="text-xs font-normal text-emerald-700">Sincronizado con Supabase</span>
                  </h4>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {adminConsultas.map((c) => (
                      <div
                        key={c.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <strong className="text-slate-900 text-sm">
                            {c.nombre_completo}{' '}
                            {c.empresa_institucion ? `— ${c.empresa_institucion}` : ''}
                          </strong>
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-bold ${
                              c.estado === 'Recibido'
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-emerald-100 text-emerald-900'
                            }`}
                          >
                            {c.estado}
                          </span>
                        </div>
                        <div className="text-slate-500">
                          📞 {c.telefono} • 📍 {c.ciudad_destino || 'Bolivia'} • 📦{' '}
                          {c.tipo_solicitud} ({c.cantidad_cajas || 0} cajas)
                        </div>
                        <p className="text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                          {c.mensaje}
                        </p>
                        <div className="flex gap-2 pt-1">
                          <button
                            onClick={() =>
                              handleCambiarEstadoConsulta(c.id, 'Atendido por Presidencia')
                            }
                            className="px-2.5 py-1 rounded-lg bg-emerald-800 text-white font-bold cursor-pointer"
                          >
                            Marcar Atendido
                          </button>
                          <a
                            href={`https://wa.me/591${c.telefono.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold"
                          >
                            Responder por WhatsApp
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
