# Surreality Deployment

This repository deploys `surreality.world` as a static React single-page app.

## What is already safe

- `fearlab.space` and `mc2-lab.space` keep their existing nginx files untouched.
- `surreality.world` uses its own web root: `/var/www/surreality-world`
- `surreality.world` uses its own nginx file: `/etc/nginx/sites-available/surreality-world.conf`
- All three sites share ports `80/443` and are split by `server_name`.

## Server bootstrap

Run this on the server after copying the repository there, or run it remotely from this repo:

```bash
sudo bash scripts/server/bootstrap-surreality-world.sh
sudo systemctl reload nginx
```

What it does:

- creates `/var/www/surreality-world/releases`
- creates a placeholder release and `current` symlink
- installs `deploy/nginx/surreality-world.bootstrap.conf`
- enables the new nginx site without changing the existing two site configs
- validates nginx before reload

## GitHub Actions secrets

Create these repository secrets before enabling the deployment workflow:

- `DEPLOY_HOST`: `150.109.64.159`
- `DEPLOY_PORT`: `22`
- `DEPLOY_USER`: `ubuntu`
- `DEPLOY_PATH`: `/var/www/surreality-world`
- `DEPLOY_SSH_KEY`: private key content for the deploy-only SSH key
- `DEPLOY_KNOWN_HOSTS`: known_hosts lines for `150.109.64.159`

Recommended deploy key on your laptop:

- private key: `~/.ssh/fearlab_github_actions`
- public key: `~/.ssh/fearlab_github_actions.pub`

## DNS and HTTPS

Current DNS for `surreality.world` does not point to `150.109.64.159` yet, so HTTPS should be enabled only after GoDaddy DNS is changed.

After DNS is updated:

```bash
sudo bash scripts/server/enable-https.sh
```

That command will:

- request a Let's Encrypt certificate for `surreality.world` and `www.surreality.world`
- update nginx for HTTPS redirect
- leave the other two sites unchanged

## Deploy flow

- push to `main`, or trigger `Deploy Surreality` manually from GitHub Actions
- workflow runs `npm ci` and `npm run build`
- workflow uploads the fresh `build/` output to a timestamped release directory
- workflow switches `/var/www/surreality-world/current` atomically
- old releases are pruned automatically, keeping the newest 5
