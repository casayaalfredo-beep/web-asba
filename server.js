import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3050;

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://nqzcgagybjnctfaeeiqd.supabase.co';

app.use(cors());
app.use(express.json());

// Endpoint de salud para verificación de despliegue en Render.com
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    proyecto: 'Sitio Web Institucional y Comercial ASBA San Luis',
    municipio: 'Shinahota - Central Ibuelo, Cochabamba',
    presidente: 'Sr. Máximo Gonzales (+591 71777463)',
    supabase: SUPABASE_URL,
    timestamp: new Date().toISOString()
  });
});

// Servir archivos estáticos compilados de Vite (dist) y fotografías (public)
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Soporte SPA (Single Page Application) para cualquier ruta
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`========================================================`);
  console.log(`  PLATAFORMA WEB ASBA SAN LUIS ACTIVA EN PUERTO ${PORT}`);
  console.log(`  URL Local: http://localhost:${PORT}`);
  console.log(`========================================================`);
});
