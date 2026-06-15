# Surreality Meeting Work Order

## Before the meeting

- server bootstrap is ready for `surreality.world`
- new site will use `/var/www/surreality-world`
- existing `fearlab.space` and `mc2-lab.space` nginx configs stay unchanged
- GitHub Actions workflow file is ready in this repo

## During the meeting

Ask the boss to change GoDaddy DNS once:

1. Set `A` record for `@` to `150.109.64.159`
2. Set `CNAME` record for `www` to `surreality.world`
3. Remove parking, forwarding, or conflicting old records
4. Keep TTL at default or `600`

## Immediately after DNS change

Run on the server:

```bash
sudo bash scripts/server/enable-https.sh
```

Then verify:

```bash
curl -I http://surreality.world
curl -I https://surreality.world
curl -I https://www.surreality.world
```

Expected result:

- `http://surreality.world` redirects to HTTPS after certbot finishes
- `https://www.surreality.world` redirects to `https://surreality.world`
- SPA routes like `/about` and `/news` still return the app shell

## GitHub Actions secret checklist

- `DEPLOY_HOST`
- `DEPLOY_PORT`
- `DEPLOY_USER`
- `DEPLOY_PATH`
- `DEPLOY_SSH_KEY`
- `DEPLOY_KNOWN_HOSTS`

## Normal update flow later

1. Push code to `main`
2. GitHub Actions builds and uploads the static site
3. Server switches `current` to the new release
4. `fearlab.space` and `mc2-lab.space` remain untouched
