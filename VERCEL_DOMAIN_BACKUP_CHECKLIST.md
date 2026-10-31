# Vercel & Domain Recovery Checklist — NIAZ NET
Snapshot reference: 2026-10-31
Repository: alirezaabdolrahimi-a11y/my-website
Vercel project: niaz-net-tehran
Vercel team/path: niaznet
Production deployment URL: https://niaz-net-tehran.vercel.app
Git repository: https://github.com/alirezaabdolrahimi-a11y/my-website
Production branch (previously configured): main
Framework preset (previously observed): Other
Root directory (previously observed): ./

## Important
This checklist is documentation, not an export of live Vercel account settings.
The assistant did not have an authenticated Vercel connection when this file was prepared.
Values below marked TO VERIFY must be checked in the Vercel dashboard.
Never commit secret values, API tokens, passwords, private keys, or .env files to this repository.

## Items to capture from Vercel
- [ ] Project settings → General: project name, project ID, team ID, creation region, Node/runtime settings (TO VERIFY)
- [ ] Settings → Git: connected repository, production branch, deploy behavior (TO VERIFY)
- [ ] Settings → Build and Deployment: framework preset, build command, output directory, install command, root directory (only previously observed values are listed above; verify current state)
- [ ] Settings → Domains: every production/preview domain and its verification status (TO VERIFY)
- [ ] Settings → Environment Variables: record variable NAMES and target environments only; do not put secret values here (TO VERIFY)
- [ ] Deployments: record latest successful production deployment ID, commit SHA, and timestamp (TO VERIFY)
- [ ] Project → Functions/Runtime settings: capture only if configured (TO VERIFY)
- [ ] Integrations/Storage: list connected services and resource identifiers; do not export credentials (TO VERIFY)
- [ ] Team settings: identify team slug and project ownership (TO VERIFY)

## Items to capture from GoDaddy DNS
- [ ] Domain name(s) and renewal/ownership details
- [ ] Nameservers currently assigned
- [ ] DNS records: type, host/name, value/target, TTL, priority where applicable
- [ ] Domain forwarding and DNSSEC status, if enabled
- [ ] Registrar lock and auto-renew status

## Safe recovery procedure
1. Confirm the Git backup branch and pinned commit before restoring.
2. Reconnect the Git repository to the correct Vercel team/project.
3. Re-enter environment variable values securely in Vercel; do not source them from this repository.
4. Re-add and verify domains; compare DNS records before changing nameservers.
5. Deploy the pinned commit to a preview first, test all pages/assets, then promote to production.
6. Verify HTTPS, redirects, sitemap.xml, robots.txt, and contact forms after deployment.

## Known backup references
- Git backup branch: backup/2026-10-31
- Original source commit: dedce92f8c23c3d5c3602e99c7a216c9eb135fb0
- Manifest commit on backup branch: 1b6ff05a15911015cdc10fef5362f9d446c628ff
- Pinned source archive: https://github.com/alirezaabdolrahimi-a11y/my-website/archive/dedce92f8c23c3d5c3602e99c7a216c9eb135fb0.zip
