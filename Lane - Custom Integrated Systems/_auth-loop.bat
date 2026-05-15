@echo off
REM ---------------------------------------------------------------------
REM  Internal helper for start-dat-daemons.bat. Loops dat-pp-cli auth
REM  login so the listener on :53682 is always ready for the next token
REM  capture. Each invocation runs until a token is captured, then this
REM  loop immediately restarts it for the next capture.
REM
REM  %~1 = full path to dat-pp-cli.exe (passed by the parent .bat)
REM
REM  NOTE: do NOT pass --timeout here -- that's the HTTP request timeout
REM  (Go duration, default 30s), not the listener lifetime. Earlier
REM  versions passed --timeout 1440 which was both wrong (no unit) and
REM  semantically meaningless for the listener.
REM ---------------------------------------------------------------------
:loop
"%~1" auth login
REM Brief pause so a misconfiguration doesn't spin
ping -n 3 127.0.0.1 >nul
goto loop
