@echo off
:: Força o script a entrar na pasta do repositório
cd /d D:\portfolio

:: Checa se é um repositório Git
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo ERRO: Esta pasta nao e um repositorio Git!
    pause
    exit /b
)

echo.
echo Adicionando arquivos modificados...
git add .

echo.
set /p mensagem=Digite a mensagem do commit:
git commit -m "%mensagem%"

echo.
echo Atualizando repositório local...
git pull origin main --rebase

echo.
echo Enviando para o GitHub...
git push origin main

echo.
echo Portfólio atualizado com sucesso! :)
pause
