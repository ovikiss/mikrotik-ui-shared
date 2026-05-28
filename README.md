# MikroTik UI Shared

Shared UI assets for MikroTik web apps:
- common themes (modern/classic)
- common UI icons
- language assets (EN/RO)

## Structure
- `ui/css`: shared theme styles
- `ui/images/ui`: shared UI icons
- `ui/images/lang`: shared language icons
- `ui/i18n`: shared translation files
- `scripts/sync-to-project.ps1`: sync script for consumer repos

## Sync Usage
From this repo:

```powershell
.\scripts\sync-to-project.ps1 -ProjectPath "C:\path\to\mikrotik-traffic-monitor" -ProjectType traffic-monitor
.\scripts\sync-to-project.ps1 -ProjectPath "C:\path\to\mikrotik-container-update-gui" -ProjectType container-update
```
