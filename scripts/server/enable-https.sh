#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${DOMAIN:-surreality.world}"
WWW_DOMAIN="${WWW_DOMAIN:-www.surreality.world}"

certbot --nginx --redirect -d "${DOMAIN}" -d "${WWW_DOMAIN}"
nginx -t

echo "HTTPS is enabled for ${DOMAIN} and ${WWW_DOMAIN}."
