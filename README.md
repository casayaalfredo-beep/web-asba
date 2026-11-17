# 🍌 Plataforma Web ASBA San Luis (Shinahota - Bolivia)

> **Proyecto de Innovación Técnica (BTH) — Sistemas Informáticos 2026**  
> **Unidad Educativa San Luis (Shinahota, Trópico de Cochabamba)**  
> **Estudiantes:** Noel Virreyra Gonzales & Aneth Rocha Otalora  
> **Docente Guía:** Prof. Juliet Zapata  
> **Asociación Beneficiaria:** Asociación de Bananeros San Luis (ASBA) — Pdte. Máximo Gonzales (+591 71777463)

---

## 🌐 Despliegue en la Nube (Render.com)

Esta aplicación está optimizada para desplegarse como un **Static Site** en **Render.com** a costo **$0 USD**, con disponibilidad 24/7 y sin tiempos de espera en frío (*never sleeps*).

* **URL Pública en Render:** `https://asba-sanluis.onrender.com`
* **Parámetros de Despliegue:**
  * **Build Command:** `npm install && npm run build`
  * **Publish Directory:** `dist`
  * **Routes (Rewrite):** `/*` ➔ `/index.html`

---

## 🚀 Ejecución en Entorno Local (Windows)

1. **Doble clic en:** `Iniciar_ASBA_Web.bat`
   * Instala dependencias automáticamente (si falta `node_modules`).
   * Compila el bundle de producción con Vite (`npm run build`).
   * Lanza el servidor en `http://localhost:3050` y abre el navegador por ti.

2. **O por línea de comandos:**
   ```bash
   npm install
   npm run dev       # Servidor de desarrollo Vite en http://localhost:5175
   npm run build     # Generar carpeta dist/
   npm start         # Servidor Express de producción en http://localhost:3050
   ```

---

## 🛠️ Tecnologías y Módulos Implementados

* **Frontend:** React 19, Vite 6, TailwindCSS 4, Lucide Icons.
* **Backend / Servidor Local:** Node.js, Express, CORS.
* **Persistencia en la Nube:** Supabase Cloud (`https://nqzcgagybjnctfaeeiqd.supabase.co`).
* **Secciones Clave:**
  1. **Inicio y Hero:** Presentación de la Asociación de Bananeros San Luis (Central Ibuelo).
  2. **Quiénes Somos:** Reseña histórica, misión, visión y principios comunitarios.
  3. **Proceso Productivo Poscosecha:** 6 etapas interactivas con fotografías reales de la planta de empaque.
  4. **Trazabilidad de Exportación:** Consulta de lotes (ej: `ASBA-2026-W01`), productor, fecha de corte y mercado destino.
  5. **Calculadora Mayorista:** Estimador de pallets, cajas (22 kg c/u) y pesos según destino.
  6. **Galería Multimedia:** Fotografías reales clasificadas (Cosecha, Empaque, Logística, Comunidad).
  7. **Directiva (Admin con PIN):** Gestión interna con clave de acceso segura (`1987` / `2026`).
  8. **Contacto y Cotizaciones:** Enlace directo a WhatsApp institucional y sincronización en la nube.
