#!/usr/bin/env bash
# One-shot deploy of this Next.js site to production (tipa-prod:/var/www/ecomobile.world)
set -e
cd "$(dirname "$0")"
H="tipa-prod"; APP="/var/www/ecomobile.world"
echo "→ backup"
ssh -o BatchMode=yes "$H" "cd /var/www && tar czf ecomobile.world.backup-\$(date +%Y%m%d-%H%M%S).tgz --exclude=ecomobile.world/node_modules --exclude=ecomobile.world/.next ecomobile.world"
echo "→ rsync"
rsync -az --exclude '.git' --exclude 'node_modules' --exclude '.next' --exclude '.env' --exclude '.env.*' --exclude '*.log' --exclude 'REDESIGN-README.md' ./ "$H:$APP/"
echo "→ build + restart"
ssh -o BatchMode=yes "$H" "cd $APP && npm install --no-audit --no-fund && npm run build && pm2 restart ecomobile.world --update-env"
echo "✓ Deployed → https://www.ecomobile.world"
