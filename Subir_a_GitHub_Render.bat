@echo off
title Subir Plataforma ASBA a GitHub y Render
color 0B
echo ====================================================================
echo   SUBIR PLATAFORMA WEB ASBA A GITHUB (PARA DESPLIEGUE EN RENDER)
echo   Usuario GitHub: casayaalfredo-beep
echo ====================================================================
echo.

set GIT_EXE="C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\cmd\git.exe"

cd /d "%~dp0"

echo 1. Verificando estado local del repositorio...
%GIT_EXE% status

echo.
echo 2. Verificando repositorio remoto (origin)...
%GIT_EXE% remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] No hay repositorio remoto configurado.
    echo Asegurate de haber creado el repositorio vacio en https://github.com/new
    echo con el nombre 'web-asba' o el que prefieras.
    echo.
    set /p REPO_URL="Pega aqui la URL de tu repositorio de GitHub (ejemplo: https://github.com/casayaalfredo-beep/web-asba.git): "
    if "%REPO_URL%"=="" (
        set REPO_URL=https://github.com/casayaalfredo-beep/web-asba.git
    )
    %GIT_EXE% remote add origin %REPO_URL%
    echo Repositorio remoto asignado: %REPO_URL%
) else (
    echo Repositorio remoto actual:
    %GIT_EXE% remote -v
)

echo.
echo 3. Enviando cambios a la rama principal (main)...
%GIT_EXE% add .
%GIT_EXE% commit -m "update: actualizacion plataforma web ASBA para Render" >nul 2>&1
%GIT_EXE% push -u origin main

echo.
echo ====================================================================
echo   PROCESO TERMINADO.
echo   Si se subio con exito, Render iniciara la compilacion automatica.
echo ====================================================================
pause
