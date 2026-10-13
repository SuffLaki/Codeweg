# Startet einen lokalen Server und oeffnet Codeweg in Chrome (Fenster wie eine App).
$ordner = Split-Path -Parent $PSScriptRoot
$port = 8765

Start-Process -FilePath "python" -ArgumentList "-m","http.server",$port -WorkingDirectory $ordner -WindowStyle Minimized
Start-Sleep -Seconds 2

$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (Test-Path $chrome) {
  Start-Process $chrome "--new-window","--app=http://localhost:$port/"
} else {
  Start-Process "http://localhost:$port/"
}

Write-Host "Codeweg laeuft auf http://localhost:$port/  (Fenster schliessen beendet die Vorschau nicht - python-Prozess beenden)"
