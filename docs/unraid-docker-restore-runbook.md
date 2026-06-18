# Unraid / Docker Restore Runbook

## Purpose

This runbook documents the recovery process for the Unraid Docker stack on TheRock.

It is intended to help restore core services after a Docker failure, appdata corruption, cache failure, Unraid flash issue, or full Docker stack rebuild.

This document is sanitized for repository storage. Do not add passwords, API keys, database credentials, Tailscale IPs, LAN IPs, private URLs, backup encryption keys, or exact secret filenames.

## Current Protection State

The Unraid Docker environment is protected by the following backup layers:

* Docker appdata backups are enabled.
* Appdata Backup plugin is configured.
* Important containers are included in appdata backups.
* PostgreSQL is protected by SQL dumps and appdata backup.
* Unraid flash/config backup is included.
* Home Assistant backups are handled separately.
* Uptime Kuma is backed up.
* Open WebUI and Ollama are backed up.
* Home Tracker API is backed up.
* Restore runbooks are being documented.

## Recovery Priorities

Restore services in this order:

| Priority | System                     | Reason                                                                          |
| -------: | -------------------------- | ------------------------------------------------------------------------------- |
|        1 | Unraid flash/config        | Required for server identity, array config, Docker templates, and core settings |
|        2 | Array/cache availability   | Required before restoring appdata or containers                                 |
|        3 | Docker service             | Required to run containers                                                      |
|        4 | Appdata Backup plugin      | Primary restore tool for Docker appdata                                         |
|        5 | PostgreSQL                 | Required by Home Tracker and database-backed services                           |
|        6 | Home Tracker API           | Required for Home Tracker application data access                               |
|        7 | Uptime Kuma                | Restores monitoring visibility                                                  |
|        8 | Nginx Proxy Manager        | Restores reverse proxy configuration                                            |
|        9 | C-7-4 Protocol Droid stack | Restores Open WebUI and Ollama                                                  |
|       10 | Supporting services        | AdGuard Home, MQTT, Node-RED, Plex, and other selected containers               |

## Backup Sources

Primary backup categories:

```text
Docker appdata backups
Unraid flash/config backup
PostgreSQL SQL dumps
Home Tracker API backups
Home Tracker security state exports
Uptime Kuma backup
Open WebUI appdata
Ollama appdata and model storage
Nginx Proxy Manager appdata
AdGuard Home appdata
Restore runbooks
```

Do not document private credentials, secret keys, exact internal IP addresses, or Tailscale addresses in this file.

## General Restore Rules

Follow these rules during any restore:

```text
Do not overwrite working data unless a restore point has been confirmed.
Do not restore old database files over a running database.
Do not expose private services publicly during recovery.
Do not create DNS records or port forwards as part of restore.
Restore one layer at a time.
Validate each service before moving to the next.
Keep original failed data until the restore is confirmed.
```

## Scenario 1 — Unraid Flash / Boot Device Restore

Use this if the Unraid USB boot device fails or the server loses its boot/config state.

### Requirements

```text
Replacement USB flash drive
Latest Unraid flash/config backup
Unraid license access
Access to TheRock hardware
Access to backup storage
```

### High-Level Procedure

1. Prepare a new Unraid USB boot device.
2. Restore the latest Unraid flash/config backup to the new USB.
3. Boot TheRock from the restored USB.
4. Confirm the array configuration appears correctly.
5. Confirm cache pool configuration appears correctly.
6. Confirm Docker and VM settings are present.
7. Confirm network settings are correct.
8. Start the array.
9. Start Docker.
10. Validate containers and services.

### Validation Checklist

```text
TheRock boots successfully.
Unraid web UI loads.
Array disks are assigned correctly.
Parity disk is assigned correctly.
Cache pool is detected.
Docker service starts.
VM Manager settings are present.
Docker templates are available.
Shares are present.
Backup shares are present.
```

## Scenario 2 — Docker Appdata Restore

Use this if one or more Docker containers are broken, appdata is corrupted, or the Docker stack must be rebuilt.

### Requirements

```text
Appdata Backup archive
Container template backup
Unraid Docker service available
Enough free space on cache/appdata storage
```

### High-Level Procedure

1. Stop the affected container.
2. Confirm the latest valid appdata backup exists.
3. Preserve the current broken appdata folder if possible.
4. Restore the appdata backup using Appdata Backup plugin.
5. Restore or recreate the container template if needed.
6. Start the container.
7. Check logs.
8. Validate the service from browser, API, or monitor.
9. Confirm Uptime Kuma returns the service to UP.

### Safety Step

Before overwriting appdata, rename the current folder when possible:

```text
service-name.broken-date
```

Do not delete the broken folder until the restored service has been validated.

## Scenario 3 — PostgreSQL Restore

PostgreSQL is protected by two layers:

```text
Primary restore method: SQL dump
Secondary safety layer: appdata backup
```

Use SQL dumps first unless there is a specific reason to restore the full PostgreSQL appdata directory.

### Preferred Restore Method — SQL Dump

Use this when the database container still works or can be recreated cleanly.

1. Start PostgreSQL.
2. Confirm the database container is healthy.
3. Create a safety dump of the current database if possible.
4. Restore the latest known-good SQL dump.
5. Confirm database tables are present.
6. Confirm Home Tracker API connects.
7. Confirm frontend data loads correctly.

### Appdata Restore Method

Use this only if the PostgreSQL data directory itself must be restored.

1. Stop PostgreSQL.
2. Preserve the current PostgreSQL appdata directory.
3. Restore PostgreSQL appdata from Appdata Backup.
4. Start PostgreSQL.
5. Check logs.
6. Confirm the database responds.
7. Confirm application data integrity.

### PostgreSQL Validation Checklist

```text
PostgreSQL container starts.
Database accepts connections.
Home Tracker database exists.
Expected tables exist.
Home Tracker API connects.
Home Tracker frontend loads project data.
No authentication errors appear in API logs.
```

## Scenario 4 — Home Tracker API Restore

Home Tracker depends on:

```text
PostgreSQL database
Home Tracker API container
API appdata/uploads
Frontend hosted separately
Public API route protection
```

### Restore Procedure

1. Confirm PostgreSQL is running.
2. Restore PostgreSQL SQL dump if needed.
3. Restore Home Tracker API appdata.
4. Restore container template if needed.
5. Start the Home Tracker API container.
6. Check API logs.
7. Confirm internal API route responds.
8. Confirm public API route remains protected.
9. Confirm frontend loads project data.

### Validation Checklist

```text
API container starts.
API logs show ready state.
Internal API route responds.
Public API route remains protected.
Frontend loads.
Images/uploads load if applicable.
Authentication remains enabled.
```

## Scenario 5 — Uptime Kuma Restore

Uptime Kuma restores monitoring, tags, alerts, and private status pages.

### Restore Procedure

1. Stop Uptime Kuma.
2. Preserve current Uptime Kuma appdata if needed.
3. Restore Uptime Kuma appdata from backup.
4. Start Uptime Kuma.
5. Log in to the dashboard.
6. Confirm monitors are present.
7. Confirm tags are present.
8. Confirm email notifications are present.
9. Confirm private status page is present.
10. Send a notification test if needed.

### Validation Checklist

```text
Command Portal monitor is present.
Home Tracker monitor is present.
Home Tracker API monitors are present.
TheRock monitor is present.
C-7-4 Protocol Droid monitors are present.
Home Assistant monitor is present.
Email notification is configured.
Private status page loads.
Expected monitors show UP.
```

## Scenario 6 — C-7-4 Protocol Droid Restore

The C-7-4 Protocol Droid stack depends on:

```text
Open WebUI
Ollama
Ollama model storage
Private Tailscale access
Uptime Kuma monitoring
```

### Restore Procedure

1. Restore Ollama appdata.
2. Restore Open WebUI appdata.
3. Restore container templates if needed.
4. Start Ollama.
5. Start Open WebUI.
6. Confirm Ollama API responds.
7. Confirm Open WebUI loads.
8. Confirm Open WebUI can reach Ollama.
9. Confirm model list appears.
10. Send a test prompt.

### Validation Prompt

```text
Respond with: C-7-4 operational.
```

### Validation Checklist

```text
Ollama container starts.
Open WebUI container starts.
Open WebUI dashboard loads privately.
Ollama model list appears.
Test prompt receives response.
Uptime Kuma monitors return to UP.
No public DNS or port forwarding is added.
```

## Scenario 7 — Nginx Proxy Manager Restore

Nginx Proxy Manager protects reverse proxy configuration.

### Restore Procedure

1. Restore Nginx Proxy Manager appdata.
2. Restore container template if needed.
3. Start Nginx Proxy Manager.
4. Confirm admin interface loads privately.
5. Confirm proxy hosts are present.
6. Confirm SSL certificates are present or can be renewed.
7. Confirm protected services remain protected.

### Validation Checklist

```text
Nginx Proxy Manager starts.
Proxy host list appears.
SSL certificate records appear.
Public routes work as expected.
Restricted routes are not accidentally exposed.
No new router port forwards are added without approval.
```

## Scenario 8 — AdGuard Home Restore

AdGuard Home protects DNS and filtering configuration.

### Restore Procedure

1. Restore AdGuard Home appdata.
2. Restore container template if needed.
3. Start AdGuard Home.
4. Confirm dashboard loads.
5. Confirm DNS service is responding.
6. Confirm client devices resolve DNS as expected.

### Validation Checklist

```text
AdGuard Home starts.
Dashboard loads.
DNS queries appear.
Filtering rules appear.
Expected clients appear.
No DNS outage remains.
```

## Appdata Backup Plugin Validation

After restoring from Appdata Backup, validate the plugin itself:

```text
Backup destination is still configured.
Flash backup is enabled.
Container stop/start mode is configured.
Critical containers are not skipped.
PostgreSQL external volume is included.
Retention settings are configured.
Scheduled backups are enabled.
A manual backup can complete successfully.
```

## Critical Containers To Keep Covered

The following containers should remain covered by Appdata Backup unless intentionally excluded:

```text
AdGuard Home
Home Tracker API
Nginx Proxy Manager
Open WebUI
Ollama
PostgreSQL
Uptime Kuma
MQTT
Node-RED
Plex
Other active production containers
```

## Containers That May Need Review

Some containers may require special handling if they use external volumes, broken mappings, or large datasets.

Review these after major changes:

```text
PostgreSQL
Ollama
Open WebUI
ChromaDB
Plex
Any container using paths outside normal appdata
```

## Post-Restore Global Validation

After any major restore, confirm:

```text
Unraid dashboard loads.
Array is started.
Cache pool is online.
Docker service is running.
Required containers are running.
Home Tracker frontend works.
Home Tracker API works.
PostgreSQL works.
Uptime Kuma works.
C-7-4 Protocol Droid works.
Home Assistant monitor is UP.
Nginx Proxy Manager works.
AdGuard Home works.
No private routes were exposed publicly.
No secret values were committed to GitHub.
```

## Public Portal Validation

After any restore involving public or restricted services, check the public command portal.

The portal may safely show:

```text
Private Active
Tailnet Active
Tailscale-only
Protected
Monitored
Backed up
```

The portal must not show:

```text
LAN IP addresses
Tailscale IP addresses
Private service ports
SMB paths
Database credentials
Backup filenames
API keys
Encryption keys
```

## Backup Health Checklist

Run this review periodically:

```text
Home Assistant backup completed recently.
Appdata backup completed recently.
PostgreSQL SQL dump completed recently.
Unraid flash/config backup exists.
Uptime Kuma monitor list is intact.
Backup inventory is up to date.
Restore runbooks are up to date.
External/off-server second copy is still pending or completed.
```

## Deferred Work

The following work is still pending:

```text
External/off-server backup copy
Unraid full disaster recovery test
PostgreSQL restore test
Docker appdata restore test
C-7-4 Protocol Droid restore test
Home Tracker restore test
```

## Security Rules

Never add the following to this runbook:

```text
Passwords
API keys
Database credentials
Backup encryption keys
Emergency kit contents
Tailscale IP addresses
LAN IP addresses
Private URLs
Exact private backup filenames
SMB credentials
Cloud credentials
```

## Known Good Checkpoint

At the time this runbook was created:

```text
Docker appdata backups are working.
Unraid flash/config backup is included.
PostgreSQL SQL dumps are present.
PostgreSQL appdata is included.
Home Tracker API is backed up.
Uptime Kuma is backed up.
Open WebUI is backed up.
Ollama is backed up.
Home Assistant backups are working separately.
Backup inventory exists.
External/off-server second copy is deferred.
```

## Next Recommended Action

When a suitable external USB SSD or HDD is available, create the second-copy/offline backup layer.

Until that is completed, the backup system protects against many service failures, but TheRock remains the primary storage location for most backups.
