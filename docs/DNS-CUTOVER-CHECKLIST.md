# DNS and Domain Cutover Checklist

## Before Changes

- [ ] Export or screenshot all existing DNS records.
- [ ] Record the current website host and rollback instructions.
- [ ] Confirm access to the registrar, DNS provider, and selected website host.
- [ ] Lower TTL only when appropriate and sufficiently ahead of cutover.
- [ ] Confirm both apex and `www` routing requirements with the provider.
- [ ] Confirm SSL certificate provisioning for both hostnames.
- [ ] Keep the existing website available during verification.

## Staging Verification

- [ ] Staging uses HTTPS.
- [ ] Staging returns `noindex` metadata.
- [ ] Staging robots blocks crawling.
- [ ] Staging remote smoke test passes.
- [ ] Bryan approves the release candidate.

## Production Cutover

- [ ] Deploy the exact approved commit before changing DNS.
- [ ] Configure the provider's required A, AAAA, CNAME, or ALIAS records.
- [ ] Set the canonical hostname to `https://www.bryanmittelstadt.com`.
- [ ] Redirect the alternate hostname to the canonical hostname.
- [ ] Preserve email-related MX, SPF, DKIM, and DMARC records.
- [ ] Do not delete unrelated DNS records.

## After Cutover

- [ ] HTTPS certificate is valid.
- [ ] Apex and `www` resolve correctly.
- [ ] Canonical tags use the production domain.
- [ ] Production robots publishes the sitemap.
- [ ] Sitemap URLs use the production domain.
- [ ] Social images return successfully.
- [ ] Contact, downloads, media, and external links work.
- [ ] Production remote smoke test passes.
- [ ] Old URLs redirect intentionally.
- [ ] Release tag is created after verification.

## Rollback Trigger

If DNS, SSL, routes, forms, or critical content cannot be corrected promptly, restore the recorded prior DNS values or redeploy the last verified release according to `docs/ROLLBACK-RUNBOOK.md`.
