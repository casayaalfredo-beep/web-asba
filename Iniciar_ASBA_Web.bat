@echo off
title Plataforma Web ASBA San Luis - BTH 2026
color 0A
echo ============================================================
echo   INICIANDO PLATAFORMA WEB ASBA SAN LUIS (SHINAHOTA)
echo   Estudiantes: Noel Virreyra Gonzales y Aneth Rocha Otalora
echo ============================================================
echo.
cd /d "%~dp0"
if not exist "node_modules" (
  echo Instalando dependencias por primera vez...
  call npm install
)
if not exist "dist" (
  echo Compilando version de produccion...
  call npm run build
)
echo Iniciando servidor web en http://localhost:3050 ...
start "" http://localhost:3050
node server.js
pause
