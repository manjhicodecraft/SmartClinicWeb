@echo off
setlocal

cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo npm nahi mila. Pehle Node.js install karo: https://nodejs.org/
  pause
  exit /b 1
)

if not exist node_modules (
  echo Dependencies install ho rahi hain...
  call npm install
  if errorlevel 1 (
    echo npm install fail ho gaya.
    pause
    exit /b 1
  )
)

start "" "http://localhost:5173/"
call npm run dev

pause
