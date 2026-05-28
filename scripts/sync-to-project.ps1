param(
  [Parameter(Mandatory = $true)]
  [string]$ProjectPath,

  [Parameter(Mandatory = $true)]
  [ValidateSet('traffic-monitor', 'container-update')]
  [string]$ProjectType
)

$ErrorActionPreference = 'Stop'

$sharedRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
$projectRoot = Resolve-Path $ProjectPath

Write-Host "Sync source: $sharedRoot"
Write-Host "Sync target: $projectRoot"
Write-Host "Project type: $ProjectType"

function Sync-Dir {
  param([string]$Source, [string]$Target)
  New-Item -ItemType Directory -Force -Path $Target | Out-Null
  Copy-Item -Path (Join-Path $Source '*') -Destination $Target -Recurse -Force
}

if ($ProjectType -eq 'traffic-monitor') {
  Sync-Dir -Source (Join-Path $sharedRoot 'ui/css') -Target (Join-Path $projectRoot 'app/images/ui')
  Sync-Dir -Source (Join-Path $sharedRoot 'ui/images/ui') -Target (Join-Path $projectRoot 'app/images/ui')
  Sync-Dir -Source (Join-Path $sharedRoot 'ui/images/lang') -Target (Join-Path $projectRoot 'app/images/lang')
  Sync-Dir -Source (Join-Path $sharedRoot 'ui/i18n') -Target (Join-Path $projectRoot 'app/i18n')
}

if ($ProjectType -eq 'container-update') {
  Sync-Dir -Source (Join-Path $sharedRoot 'ui/images/ui') -Target (Join-Path $projectRoot 'app/www/images/ui')
  Sync-Dir -Source (Join-Path $sharedRoot 'ui/images/lang') -Target (Join-Path $projectRoot 'app/www/images/lang')
  Sync-Dir -Source (Join-Path $sharedRoot 'ui/i18n') -Target (Join-Path $projectRoot 'app/www/i18n')

  Copy-Item -Path (Join-Path $sharedRoot 'ui/css/style-modern.css') -Destination (Join-Path $projectRoot 'app/www/styles-modern.css') -Force
  Copy-Item -Path (Join-Path $sharedRoot 'ui/css/style-classic.css') -Destination (Join-Path $projectRoot 'app/www/styles-classic.css') -Force
}

Write-Host 'UI sync completed successfully.'
