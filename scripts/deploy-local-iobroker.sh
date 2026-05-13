#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEV_DIR="/opt/iobroker/dev-adapters/iobroker.ai-energy-manager"
NODE_MODULE_DIR="/opt/iobroker/node_modules/iobroker.ai-energy-manager"
IOB="/opt/iobroker/iobroker"

mkdir -p "$DEV_DIR"
rm -rf "$DEV_DIR"
cp -a "$SOURCE_DIR" "$DEV_DIR"
chmod -R a+rwX "$DEV_DIR"

"$IOB" url "$DEV_DIR" ai-energy-manager
rm -rf "$NODE_MODULE_DIR"
cp -a "$DEV_DIR" "$NODE_MODULE_DIR"
chmod -R a+rwX "$NODE_MODULE_DIR"
"$IOB" upload ai-energy-manager
"$IOB" object set system.adapter.ai-energy-manager.0 common.messagebox=true >/dev/null
"$IOB" object set system.adapter.ai-energy-manager.0 common.adminUI='{"config":"json"}' >/dev/null
"$IOB" object set system.adapter.ai-energy-manager.0 encryptedNative='["adapterToken"]' >/dev/null
"$IOB" restart ai-energy-manager.0

echo "Deployed $SOURCE_DIR to local ioBroker test instance."
