@echo off
setlocal EnableExtensions
title DAT Mass Post Helper

REM ---------------------------------------------------------------------
REM  Launches the two dat-pp-cli daemons (rate server + auth listener)
REM  so Mass Post can pull DAT rates directly via the API.
REM
REM  Looks for the CLI in (first match wins):
REM    1. .\dat-pp-cli.exe                        (next to this .bat)
REM    2. .\dat-pp-cli-v*.exe                     (versioned release filename)
REM    3. .\dat-pp-cli\build\stage\bin\dat-pp-cli.exe  (dev build output)
REM    4. %USERPROFILE%\go\bin\dat-pp-cli.exe     (go install destination)
REM ---------------------------------------------------------------------

REM ---------------------------------------------------------------------
REM  Guard: refuse to run from a zip preview folder. If a user
REM  double-clicks this .bat from inside the .zip without extracting,
REM  Windows runs it out of %TEMP%\<guid>_<zip>.b4e\ where nothing
REM  else is staged. The ".b4e\" path component is specific to that
REM  Windows zip-preview feature, so it's a clean signal.
REM ---------------------------------------------------------------------
echo %~dp0 | findstr /I "\.b4e\\" >nul
if not errorlevel 1 (
  echo.
  echo ============================================================
  echo   ERROR: Running from a Windows temp / zip-preview folder:
  echo     "%~dp0"
  echo.
  echo   You probably opened this .bat from inside the .zip without
  echo   extracting it first. Nothing else can live alongside it
  echo   in this location, so the daemon binary will never be found.
  echo.
  echo   FIX:
  echo     1. Close this window.
  echo     2. Find your downloaded dat-pp-cli-launcher.zip.
  echo     3. Right-click it -^> "Extract All..." -^> pick a real
  echo        folder (Desktop or Documents both work fine).
  echo     4. Open THAT extracted folder and double-click
  echo        start-dat-daemons.bat from there.
  echo ============================================================
  echo.
  pause
  exit /b 1
)

set "CLI=%~dp0dat-pp-cli.exe"
if not exist "%CLI%" (
  REM Accept versioned filename like dat-pp-cli-v1.0.0.exe so users
  REM don't need to rename after downloading from a GitHub release.
  for %%F in ("%~dp0dat-pp-cli-v*.exe") do set "CLI=%%~fF"
)
if not exist "%CLI%" set "CLI=%~dp0dat-pp-cli\build\stage\bin\dat-pp-cli.exe"
if not exist "%CLI%" set "CLI=%USERPROFILE%\go\bin\dat-pp-cli.exe"
if not exist "%CLI%" (
  echo.
  echo ERROR: Could not find dat-pp-cli.exe in any of:
  echo   "%~dp0dat-pp-cli.exe"
  echo   "%~dp0dat-pp-cli-v*.exe"
  echo   "%~dp0dat-pp-cli\build\stage\bin\dat-pp-cli.exe"
  echo   "%USERPROFILE%\go\bin\dat-pp-cli.exe"
  echo.
  echo Drop dat-pp-cli.exe (or the versioned dat-pp-cli-v*.exe from
  echo the GitHub release) next to this batch file and re-run.
  echo Download from:
  echo   https://github.com/alecabercrombieyi-cyber/CodeBoss/releases/tag/dat-pp-cli-v1.0.0
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
ping -n 4 127.0.0.1 >nul

REM ---------------------------------------------------------------------
REM  Health check: verify both ports actually bound before lying to the
REM  user about "daemons RUNNING". Previously the banner printed
REM  unconditionally, masking silent failures in the auth-loop.
REM ---------------------------------------------------------------------
set "RATE_OK="
set "AUTH_OK="
set "ALL_OK="
netstat -ano | findstr "LISTENING" | findstr ":53683 " >nul && set "RATE_OK=1"
netstat -ano | findstr "LISTENING" | findstr ":53682 " >nul && set "AUTH_OK=1"
if defined RATE_OK if defined AUTH_OK set "ALL_OK=1"

echo.
echo ============================================================
if defined ALL_OK (
  echo   dat-pp-cli daemons are RUNNING.
) else (
  echo   dat-pp-cli daemons started, but a port is NOT bound:
)
echo.
if defined RATE_OK (echo     [OK]   Rate daemon:    http://127.0.0.1:53683) else (echo     [FAIL] Rate daemon:    :53683 not listening - check "dat-pp-cli serve" window)
if defined AUTH_OK (echo     [OK]   Auth listener:  http://127.0.0.1:53682) else (echo     [FAIL] Auth listener:  :53682 not listening - check "dat-pp-cli auth-loop" window)
echo.
if not defined RATE_OK echo   Mass Post "Get DAT Rates" will not work until :53683 is up.
if not defined AUTH_OK echo   "Grab DAT Token" bookmarklet will not work until :53682 is up.
if not defined RATE_OK echo.
if not defined AUTH_OK echo.
echo   *** LEAVE THIS WINDOW OPEN ***
echo   This window IS the daemons. Minimize it; don't close it.
echo.
echo   In Mass Post:
echo     1. Open one.dat.com (logged in) - click "Grab DAT Token"
echo     2. Switch to Mass Post - click "Get DAT Rates"
echo.
echo   To STOP everything: press any key here, or close this
echo   window. (Pressing a key = shutdown. Not "continue".)
echo ============================================================
echo.
echo Press any key to STOP the daemons . . .
pause >nul

REM Cleanup on close: stop both daemons + the auth-loop cmd window
taskkill /F /FI "WINDOWTITLE eq dat-pp-cli auth-loop*" >nul 2>&1
taskkill /F /IM dat-pp-cli.exe >nul 2>&1
endlocal
