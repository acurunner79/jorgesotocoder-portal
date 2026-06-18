# Backup Inventory

## Purpose

This document tracks the current backup coverage for the homelab environment.

It identifies what is protected, where the primary backup layer lives, how each item should be restored, and what backup work is still pending.

## Current Backup Strategy

The current backup model is:

```text
Primary backup layer: TheRock
Second-copy/offline layer: Deferred until a suitable external drive is available
Restore documentation: Stored in project documentation
```

This inventory does not contain passwords, encryption keys, API keys, private IP addresses, Tailscale addresses, or exact private backup filenames.

## Backup Coverage Summary

| System / Data                | Primary Backup Status | Backup Method                              | Restore Priority | Notes                                               |
| ---------------------------- | --------------------: | ------------------------------------------ | ---------------: | --------------------------------------------------- |
| Home Assistant OS            |               Covered | Automatic encrypted Home Assistant backups |         Critical | Stored outside the Home Assistant VM                |
| Home Assistant Emergency Kit |               Covered | Saved outside Home Assistant               |         Critical | Required for encrypted backup restore               |
| Docker Appdata               |               Covered | Appdata Backup plugin                      |         Critical | Includes major Docker service appdata               |
| Unraid Flash / Config        |               Covered | Appdata Backup flash backup                |         Critical | Required for Unraid configuration recovery          |
| PostgreSQL Database          |               Covered | SQL dumps and appdata backup               |         Critical | SQL dumps are the primary restore method            |
| Home Tracker API             |               Covered | Appdata backup and service backup          |             High | Used by Home Tracker application                    |
| Home Tracker Security State  |               Covered | Docker/network inspection exports          |             High | Useful for rebuilding service state                 |
| Uptime Kuma                  |               Covered | Appdata backup and manual backup           |             High | Protects monitors and notification settings         |
| Open WebUI                   |               Covered | Appdata backup                             |             High | Protects C-7-4 Protocol Droid interface data        |
| Ollama                       |               Covered | Appdata backup                             |             High | Includes local Ollama data and model storage        |
| Nginx Proxy Manager          |               Covered | Appdata backup                             |             High | Protects reverse proxy configuration                |
| AdGuard Home                 |               Covered | Appdata backup                             |           Medium | Protects DNS/ad-blocking configuration              |
| Restore Runbooks             |               Covered | Documentation stored in repository         |           Medium | Should also be copied to a private/offline location |
| External Second Copy         |              Deferred | Pending external drive                     |         Critical | Must be completed later                             |

## Primary Backup Locations

Primary backups are currently stored on TheRock.

High-level backup categories:

```text
Home Assistant backups
Docker appdata backups
PostgreSQL database dumps
Home Tracker application backups
Uptime Kuma backups
Unraid flash/config backups
Restore runbooks
```

Exact internal paths, private hostnames, IP addresses, and filenames should be kept in private notes, not in public documentation.

## Home Assistant Backups

Status:

```text
Covered
```

Protection:

```text
Automatic encrypted backups are enabled.
Backups are stored outside the Home Assistant VM.
The emergency recovery kit is saved outside Home Assistant.
```

Restore method:

```text
Restore through the Home Assistant onboarding or backup restore workflow.
Use the latest valid backup and the emergency recovery kit.
```

Related runbook:

```text
docs/home-assistant-restore-runbook.md
```

## Docker Appdata Backups

Status:

```text
Covered
```

Protection:

```text
Appdata Backup plugin is configured.
Containers are stopped, backed up, and restarted safely.
Unraid flash backup is included.
```

Important covered services include:

```text
Open WebUI
Ollama
Uptime Kuma
Home Tracker API
PostgreSQL
Nginx Proxy Manager
AdGuard Home
Node-RED
MQTT
Plex
Other selected Docker containers
```

Restore method:

```text
Use Appdata Backup restore process.
Restore the container template and matching appdata archive.
Validate container startup and service health after restore.
```

## PostgreSQL Backups

Status:

```text
Covered
```

Protection:

```text
SQL dump backups exist.
PostgreSQL appdata backup is included.
```

Preferred restore method:

```text
Use SQL dump restore as the primary database recovery path.
Use appdata backup as a secondary safety layer.
```

Validation after restore:

```text
Database starts successfully.
Home Tracker API connects successfully.
Application data appears correctly in the frontend.
```

## Home Tracker Backups

Status:

```text
Covered
```

Protection:

```text
API/service backups exist.
PostgreSQL dumps protect application data.
Security and Docker state exports are stored for rebuild reference.
```

Restore method:

```text
Restore PostgreSQL database.
Restore Home Tracker API appdata/service files.
Confirm API responds.
Confirm frontend can load project data.
```

## Uptime Kuma Backups

Status:

```text
Covered
```

Protection:

```text
Uptime Kuma appdata is included in Appdata Backup.
Manual backup checkpoint exists.
```

Restore method:

```text
Restore Uptime Kuma appdata.
Start the container.
Confirm monitors, tags, status page, and email notifications are present.
```

Validation after restore:

```text
Command Portal monitor is UP.
Home Tracker monitor is UP.
Home Assistant monitor is UP.
C-7-4 Protocol Droid monitors are UP.
Email notification test succeeds.
```

## C-7-4 Protocol Droid Backups

Status:

```text
Covered
```

Protected components:

```text
Open WebUI appdata
Ollama appdata
Ollama model storage
```

Restore method:

```text
Restore Open WebUI appdata.
Restore Ollama appdata.
Start Ollama and Open WebUI containers.
Confirm Open WebUI can reach Ollama.
Confirm model list appears.
Send a test prompt.
```

Validation prompt:

```text
Respond with: C-7-4 operational.
```

## Unraid Flash / Config Backup

Status:

```text
Covered
```

Protection:

```text
Unraid flash/config backup is included in the Appdata Backup output.
```

Restore use case:

```text
Used if the Unraid boot flash drive fails or needs to be rebuilt.
```

Security note:

```text
Flash backups may contain sensitive configuration and license data.
Do not upload flash backups to public repositories.
```

## Restore Documentation

Status:

```text
Covered
```

Current runbooks:

```text
Home Assistant restore runbook
Backup inventory
```

Recommended future private documentation:

```text
Unraid restore runbook
PostgreSQL restore runbook
Docker appdata restore runbook
Home Tracker restore runbook
C-7-4 Protocol Droid restore runbook
```

## Second-Copy / Offline Backup Status

Status:

```text
Deferred
```

Reason:

```text
A suitable external backup drive is not currently available.
```

Recommended future target:

```text
External USB SSD or HDD
Format: exFAT for Windows and Unraid readability
Fallback format: NTFS
Unraid-only format: XFS
Avoid: FAT32
```

Reason FAT32 should not be used:

```text
Some backup files are larger than 4 GB.
FAT32 cannot store files larger than 4 GB.
```

## Future Second-Copy Structure

When a suitable external drive is available, create a structure similar to:

```text
TheRock-Second-Copy/
├─ home-assistant/
├─ appdata/
├─ postgres/
├─ home-tracker/
├─ uptime-kuma/
├─ unraid-flash/
└─ runbooks/
```

## Second-Copy Checklist

When the external drive is available:

```text
Identify the drive safely.
Confirm it is not the Unraid boot flash drive.
Confirm capacity and filesystem.
Mount the drive.
Create backup folder structure.
Copy Home Assistant backups.
Copy Appdata Backup output.
Copy PostgreSQL dumps.
Copy Home Tracker backups.
Copy Uptime Kuma backup.
Copy restore runbooks.
Verify file counts and sizes.
Unmount safely.
Store the drive somewhere safe.
```

## Current Risk Register

| Risk                             |              Status | Mitigation                                |
| -------------------------------- | ------------------: | ----------------------------------------- |
| Home Assistant VM failure        |           Mitigated | Automatic backups stored outside VM       |
| Docker container/appdata failure |           Mitigated | Appdata Backup plugin                     |
| PostgreSQL data loss             |           Mitigated | SQL dumps and appdata backup              |
| Unraid flash failure             |           Mitigated | Flash/config backup included              |
| TheRock total failure            | Partially mitigated | Second-copy external backup still pending |
| Backup secrets exposure          |          Controlled | Do not store credentials or keys in docs  |
| Restore process uncertainty      |           Improving | Runbooks being created                    |

## Do Not Store Here

Do not add the following to this file:

```text
Passwords
API keys
Backup encryption keys
Emergency kit contents
Tailscale IP addresses
LAN IP addresses
Exact private backup filenames
Private service URLs
Database credentials
SMB credentials
```

## Known Good Checkpoint

As of this checkpoint:

```text
Primary backup layer is complete.
Home Assistant backups are working.
Docker appdata backups are working.
PostgreSQL SQL dumps are present.
PostgreSQL appdata is covered.
Unraid flash/config is covered.
Uptime Kuma is covered.
Open WebUI and Ollama are covered.
Restore documentation has started.
External/off-server second copy is deferred.
```

## Next Recommended Action

Locate a suitable external USB SSD or HDD and create the second-copy/offline backup layer.

Until that is complete, backups are protected against service and VM failure, but not fully protected against major failure of TheRock itself.
