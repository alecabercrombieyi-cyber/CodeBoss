@echo off
REM ---------------------------------------------------------------------
REM  Internal helper for start-dat-daemons.bat. Loops dat-pp-cli auth
REM  login so the listener on :53682 is always ready for the next token
REM  capture. Each invocation waits up to 24h, then restarts.
REM
REM  %~1 = full path to dat-pp-cli.exe (passed by the parent .bat)
REM ---------------------------------------------------------------------
:loop
"%~1" auth login --timeout 1440 >nul 2>&1
REM Brief pause so a misconfiguration doesn't spin
ping -n 3 127.0.0.1 >nul
goto loop
