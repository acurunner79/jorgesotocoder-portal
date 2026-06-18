# Home Assistant Restore Runbook

## Purpose

This document explains how to recover the Home Assistant OS VM using backups stored on TheRock.

## Current Protection State

- Home Assistant runs as a Home Assistant OS VM.
- Home Assistant is privately accessible through Tailscale.
- Uptime Kuma monitors Home Assistant availability.
- Automatic encrypted Home Assistant backups are enabled.
- Backups are stored outside the Home Assistant VM on TheRock.
- The Home Assistant emergency kit has been saved outside Home Assistant.

## Backup Location

Backups are stored on the dedicated Unraid SMB share:

```text
\\THEROCK\ha_backups

# Home Assistant Restore Runbook

## Purpose

This runbook documents how to recover the Home Assistant OS VM using backups stored outside the VM on TheRock.

It is intended to provide a clear recovery path if Home Assistant becomes corrupted, the VM is lost, the virtual disk fails, or the Home Assistant installation needs to be rebuilt.

## Current Protection State

Home Assistant is currently protected by the following recovery layers:

* Home Assistant runs as a Home Assistant OS VM.
* Home Assistant is privately accessible through Tailscale.
* Home Assistant is monitored by Uptime Kuma.
* Automatic encrypted Home Assistant backups are enabled.
* Home Assistant backups are stored outside the VM on TheRock.
* The backup location is a dedicated SMB share.
* The Home Assistant emergency kit has been saved outside Home Assistant.
* Public access is not enabled.
* No public DNS record or router port forwarding is used for Home Assistant.

## Backup Location

Home Assistant backups are stored on TheRock using the following SMB share:

```text
\\THEROCK\ha_backups
```

The backup share is configured as private SMB storage and should only be accessible by approved users.

Do not store passwords, encryption keys, Tailscale IPs, LAN IPs, or private backup filenames in this document.

## Backup Schedule

Automatic backups are enabled in Home Assistant.

Recommended configuration:

```text
Backup type: Automatic
Schedule: Daily
Retention: 7 backups
Location: TheRock HA Backups
Encryption: Enabled
Media folder: Excluded unless needed
Share folder: Excluded unless needed
```

## Emergency Kit

The Home Assistant emergency kit is required to restore encrypted backups.

The emergency kit should be stored outside of Home Assistant in at least one safe location, such as:

* Password manager secure note
* Personal computer backup folder
* External backup drive
* Other protected private storage

Do not store the only copy of the emergency kit inside the Home Assistant VM.

Do not commit the emergency kit, encryption key, or backup password to GitHub.

## Restore Requirements

Before beginning a restore, confirm the following are available:

* Access to TheRock.
* Access to the Home Assistant backup share.
* The latest valid Home Assistant backup file.
* The Home Assistant emergency kit or encryption key.
* Access to the Unraid web UI.
* A working Home Assistant OS VM or a new replacement VM.
* Access to Tailscale, if restoring private remote access.
* Time to allow Home Assistant to restore and reboot.

## High-Level Restore Procedure

1. Access Unraid.
2. Confirm TheRock is online.
3. Confirm the Home Assistant backup share is available.
4. Locate the latest valid Home Assistant backup.
5. Create or boot a fresh Home Assistant OS VM.
6. Open the Home Assistant onboarding page.
7. Choose the option to restore from backup.
8. Upload the latest backup file from TheRock.
9. Enter the encryption key from the emergency kit when prompted.
10. Wait for Home Assistant to restore.
11. Allow Home Assistant to reboot.
12. Log in to Home Assistant.
13. Confirm dashboards, integrations, add-ons, and automations are restored.
14. Confirm Tailscale reconnects.
15. Confirm Uptime Kuma monitor returns to UP.

## Restore Validation Checklist

After restoring Home Assistant, verify the following:

```text
Home Assistant dashboard loads.
User login works.
Tailscale add-on is running.
Home Assistant opens through Tailscale.
Uptime Kuma monitor is UP.
Private status page shows Home Assistant operational.
Ring integration loads.
Nest integration loads.
Unraid integration loads.
Dashboard custom cards load.
Automations are present.
Scripts are present.
Scenes are present.
Add-ons are present.
Backup settings are still configured.
Backup location still points to TheRock HA Backups.
Automatic backups are enabled.
Emergency kit is still saved outside Home Assistant.
```

## Tailscale Validation

After restore, confirm the Tailscale add-on is online.

In Home Assistant:

```text
Settings
→ Add-ons
→ Tailscale
```

Verify:

```text
Start on boot: Enabled
Watchdog: Enabled
Add-on status: Running
Authentication: Connected
```

Then verify from a Tailscale-connected device that Home Assistant is reachable through its private Tailscale address.

Do not publish the Tailscale address in this document.

## Uptime Kuma Validation

After Home Assistant is restored, check Uptime Kuma.

Expected monitor:

```text
Home Assistant - Tailscale
```

Expected result:

```text
Status: UP
Notifications: Enabled
Private status page: Updated
```

If the monitor is DOWN, confirm:

* Home Assistant is running.
* Tailscale add-on is running.
* The Home Assistant Tailscale device is online.
* Port 8123 is reachable privately.
* No public DNS or router port forwarding was added.

## Backup Validation

After restore, create a new test backup.

In Home Assistant:

```text
Settings
→ System
→ Backups
→ Run backup now
```

Use the configured automatic backup settings and confirm the backup is written to:

```text
\\THEROCK\ha_backups
```

Then confirm TheRock contains a new backup file.

## Security Rules

The following information must not be added to this runbook:

* Passwords
* API keys
* Backup encryption keys
* Emergency kit contents
* Tailscale IP addresses
* LAN IP addresses
* Publicly exposed private service URLs
* Exact private backup filenames
* Personal credentials

Home Assistant should remain private unless a separate access-control plan is approved.

## Public Portal Status

The command portal may safely state:

```text
Home Assistant: Private Active
Method: Tailscale-only Home Assistant
Backup Status: Protected
```

The public portal must not display:

```text
LAN IP addresses
Tailscale IP addresses
Port 8123
SMB paths
Backup filenames
Credentials
Encryption keys
```

## Known Good State

As of the current checkpoint:

```text
Home Assistant private access: Working
Tailscale access: Working
Uptime Kuma monitor: Working
Automatic backups: Enabled
Backup target: TheRock HA Backups
Backup share: \\THEROCK\ha_backups
Emergency kit: Saved outside Home Assistant
Public exposure: None
```

## Notes

Home Assistant backups protect the Home Assistant system, configuration, add-ons, and selected folders.

They do not replace:

* Unraid flash backup
* Unraid appdata backup
* VM-level backup
* Full server backup
* Off-site disaster recovery

For stronger protection, consider adding a future VM-level backup or off-site copy of critical Home Assistant backups.
