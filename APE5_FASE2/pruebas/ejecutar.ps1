param([switch]$ConNavegador)
$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { throw "Instala Node.js con npm y vuelve a abrir PowerShell." }
npm run test:estado
if ($LASTEXITCODE -ne 0) { throw "Falló la comprobación de estados." }
npm run test:estructura
if ($LASTEXITCODE -ne 0) { throw "Falló la comprobación de estructura." }
npm run test:ejercicio
if ($LASTEXITCODE -ne 0) { throw "Falló el análisis del ejercicio." }
if ($ConNavegador) {
  npm install
  if ($LASTEXITCODE -ne 0) { throw "Falló npm install." }
  npx playwright install chromium
  if ($LASTEXITCODE -ne 0) { throw "No se pudo instalar Chromium." }
  npm test
  if ($LASTEXITCODE -ne 0) { throw "Falló una comprobación de navegador." }
  Write-Host "El nuevo registro de navegador está en resultados/ y evidencias/."
}
Write-Host "Verificaciones finalizadas correctamente."
