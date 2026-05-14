@echo off
setlocal EnableExtensions
title DAT Mass Post Helper

REM ---------------------------------------------------------------------
REM  Launches the two dat-pp-cli daemons (rate server + auth listener)
REM  so Mass Post can pull DAT rates directly via the API.
REM
REM  Looks for dat-pp-cli.exe in:
REM    1. Same folder as this .bat (for distribution to teammates)
REM    2. .\dat-pp-cli\build\stage\bin\  (dev build output)
REM    3. %USERPROFILE%\go\bin\           (go install destination)
REM ---------------------------------------------------------------------

set "CLI=%~dp0dat-pp-cli.exe"
if not exist "%CLI%" set "CLI=%~dp0dat-pp-cli\build\stage\bin\dat-pp-cli.exe"
if not exist "%CLI%" set "CLI=%USERPROFILE%\go\bin\dat-pp-cli.exe"
if not exist "%CLI%" (
  echo.
  echo ERROR: Could not find dat-pp-cli.exe in any of:
  echo   "%~dp0dat-pp-cli.exe"
  echo   "%~dp0dat-pp-cli\build\stage\bin\dat-pp-cli.exe"
  echo   "%USERPROFILE%\go\bin\dat-pp-cli.exe"
  echo.
  echo Drop dat-pp-cli.exe next to this batch file and re-run.
  echo Download from:
  echo   https://github.com/alecabercrombieyi-cyber/CodeBoss/releases/tag/dat-pp-cli-v1.0.0
  echo (rename dat-pp-cli-v1.0.0.exe to dat-pp-cli.exe after downloading)
  echo.
  pause
  exit /b 1
)

REM Wipe any stale instances so we start clean
taskkill /F /IM dat-pp-cli.exe >nul 2>&1

REM Spin up the rate daemon (long-running, port 53683)
start "dat-pp-cli serve" /MIN "%CLI%" serve

REM Spin up the auth-login loop in its own window (auto-restarts after each
REM token capture or 24h timeout so the listener is always ready)
start "dat-pp-cli auth-loop" /MIN cmd /k call "%~dp0_auth-loop.bat" "%CLI%"

REM Give the daemons a beat to bind their ports
ping -n 2 127.0.0.1 >nul

echo.
echo ============================================================
echo   dat-pp-cli daemons running.
echo.
echo     Rate daemon:    http://127.0.0.1:53683
echo     Auth listener:  http://127.0.0.1:53682
echo.
echo   In Mass Post, click "Get DAT Rates" -- it will fetch
echo   directly via the CLI (no clipboard, no tab juggling).
echo.
echo   Click "Grab DAT Token" in your DAT One tab whenever the
echo   token expires (~every 30 min) or when Mass Post prompts.
echo.
echo   Close this window to stop both daemons.
echo ============================================================
echo.
pause >nul

REM Cleanup on close: stop both daemons + the auth-loop cmd window
taskkill /F /FI "WINDOWTITLE eq dat-pp-cli auth-loop*" >nul 2>&1
taskkill /F /IM dat-pp-cli.exe >nul 2>&1
endlocal
