@echo off
title Thu vien van ban phap luat
cd /d %~dp0

start "" http://localhost:8000

caddy file-server --listen :8000 --root .

pause
