#!/bin/sh
# Builds a single self-contained index.html from src/
cd "$(dirname "$0")"
{
cat <<'H'
<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Deutsch – Null bis B1</title>
<meta name="theme-color" content="#161618">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%231c1c1e'/%3E%3Ctext x='16' y='22' font-size='16' text-anchor='middle' fill='%23e2ad55' font-family='sans-serif' font-weight='700'%3EDE%3C/text%3E%3C/svg%3E">
<style>
H
cat src/style.css
echo '</style></head><body><div id="app"></div><script>'
cat src/data.js src/extra.js src/lexicon.js src/tutor.js src/app.js
echo '</script></body></html>'
} > index.html
echo "built index.html ($(wc -c < index.html) bytes)"
