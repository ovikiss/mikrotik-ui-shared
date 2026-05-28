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

## Consumption Model
Consumer repos pull these assets automatically during GHCR publish builds from:
- `ovikiss/mikrotik-traffic-monitor`
- `ovikiss/mikrotik-container-update-gui`

The sync is handled in each repo by `.github/workflows/docker-publish.yml` before Docker build.
No manual local sync scripts are required.
