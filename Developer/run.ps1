
$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$project = Join-Path $root "PCBuilder"
$frontend = Join-Path $project "Frontend"

$processes = @()

try {
    $mvc = Start-Process "dotnet.exe" `
        -ArgumentList "run", "--urls", "http://localhost:5197" `
        -WorkingDirectory $project `
        -PassThru -NoNewWindow

    $processes += $mvc

    $react = Start-Process "npm.cmd" `
        -ArgumentList "run", "dev", "--", "--host", "127.0.0.1" `
        -WorkingDirectory $frontend `
        -PassThru -NoNewWindow

    $processes += $react

    while ($true) {
        Start-Sleep -Milliseconds 500

        foreach ($process in $processes) {
            $process.Refresh()

            if ($process.HasExited) {
                Write-Host "$($process.ProcessName) stopped. Shutting down both servers."
                return
            }
        }
    }
}
finally {
    foreach ($process in $processes) {
        try {
            $process.Refresh()

            if (-not $process.HasExited) {
                taskkill.exe /PID $process.Id /T /F | Out-Null
            }
        }
        catch {}
    }
}
