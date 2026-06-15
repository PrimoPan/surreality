#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <site_root> <release_id>" >&2
  exit 1
fi

site_root="${1%/}"
release_id="$2"
allowed_site_root="/var/www/surreality-world"
keep_releases="${KEEP_RELEASES:-5}"
releases_dir="${site_root}/releases"
release_dir="${releases_dir}/${release_id}"
current_link="${site_root}/current"
tmp_link="${site_root}/.current.tmp"

if [[ "${site_root}" != "${allowed_site_root}" ]]; then
  echo "Refusing to deploy outside ${allowed_site_root}: ${site_root}" >&2
  exit 1
fi

if [[ ! -d "${release_dir}" ]]; then
  echo "Release directory does not exist: ${release_dir}" >&2
  exit 1
fi

if [[ ! -f "${release_dir}/index.html" ]]; then
  echo "Release is missing index.html: ${release_dir}" >&2
  exit 1
fi

ln -sfn "${release_dir}" "${tmp_link}"
mv -Tf "${tmp_link}" "${current_link}"

mapfile -t release_paths < <(find "${releases_dir}" -mindepth 1 -maxdepth 1 -type d | sort)

if (( ${#release_paths[@]} > keep_releases )); then
  current_target="$(readlink -f "${current_link}")"
  prune_count=$(( ${#release_paths[@]} - keep_releases ))

  for release_path in "${release_paths[@]:0:prune_count}"; do
    if [[ "$(readlink -f "${release_path}")" == "${current_target}" ]]; then
      continue
    fi
    rm -rf "${release_path}"
  done
fi

echo "Promoted release ${release_id}"
echo "Current target: $(readlink -f "${current_link}")"
