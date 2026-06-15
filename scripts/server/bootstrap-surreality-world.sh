#!/usr/bin/env bash
set -euo pipefail

SITE_ROOT="${SITE_ROOT:-/var/www/surreality-world}"
SITE_USER="${SITE_USER:-ubuntu}"
SITE_GROUP="${SITE_GROUP:-www-data}"
NGINX_AVAILABLE="${NGINX_AVAILABLE:-/etc/nginx/sites-available/surreality-world.conf}"
NGINX_ENABLED="${NGINX_ENABLED:-/etc/nginx/sites-enabled/surreality-world.conf}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
BOOTSTRAP_CONF="${REPO_ROOT}/deploy/nginx/surreality-world.bootstrap.conf"
BOOTSTRAP_RELEASE="${SITE_ROOT}/releases/bootstrap"

if [[ ! -f "${BOOTSTRAP_CONF}" ]]; then
  echo "Missing nginx bootstrap config: ${BOOTSTRAP_CONF}" >&2
  exit 1
fi

install -d -m 2755 -o "${SITE_USER}" -g "${SITE_GROUP}" "${SITE_ROOT}"
install -d -m 2755 -o "${SITE_USER}" -g "${SITE_GROUP}" "${SITE_ROOT}/releases"
install -d -m 2755 -o "${SITE_USER}" -g "${SITE_GROUP}" "${BOOTSTRAP_RELEASE}"

if [[ ! -f "${BOOTSTRAP_RELEASE}/index.html" ]]; then
  cat > "${BOOTSTRAP_RELEASE}/index.html" <<'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Surreality</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #111;
        color: #f5f5f5;
        font-family: Arial, sans-serif;
      }
      main {
        padding: 2rem;
        max-width: 36rem;
        text-align: center;
        line-height: 1.6;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Surreality deployment is ready</h1>
      <p>The production content will appear here after the first GitHub Actions deployment.</p>
    </main>
  </body>
</html>
EOF
  chown "${SITE_USER}:${SITE_GROUP}" "${BOOTSTRAP_RELEASE}/index.html"
  chmod 0644 "${BOOTSTRAP_RELEASE}/index.html"
fi

ln -sfn "${BOOTSTRAP_RELEASE}" "${SITE_ROOT}/current"
chown -h "${SITE_USER}:${SITE_GROUP}" "${SITE_ROOT}/current"

install -m 0644 "${BOOTSTRAP_CONF}" "${NGINX_AVAILABLE}"
ln -sfn "${NGINX_AVAILABLE}" "${NGINX_ENABLED}"

nginx -t

echo "Bootstrap complete."
echo "Site root: ${SITE_ROOT}"
echo "Nginx config: ${NGINX_AVAILABLE}"
echo "Run 'systemctl reload nginx' to activate the site."
