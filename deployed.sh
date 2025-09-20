#!/bin/bash

# Variables
KEY_PATH="/home/abhishek/Downloads/shetimajuri.pem"
REMOTE_USER="ubuntu"
REMOTE_HOST="13.204.147.218"
REMOTE_DIR="~/backend"
LOCAL_DIR="/home/abhishek/Desktop/ShetiMajuri/backend"

echo "📦 Deploying ShetiMajuri app..."

# Upload code (exclude .git + node_modules)
rsync -avz --exclude='.git' --exclude='node_modules' -e "ssh -i $KEY_PATH" "$LOCAL_DIR/" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR"

# SSH into EC2 and restart services
ssh -i "$KEY_PATH" "$REMOTE_USER@$REMOTE_HOST" << 'EOF'
  cd ~/backend
  echo "📦 Installing dependencies..."
  npm install --production

  echo "🔁 Restarting PM2 app..."
  pm2 restart shetimajuri || pm2 start server.js --name shetimajuri

  echo "🔄 Restarting Nginx..."
  sudo systemctl restart nginx
EOF

echo "✅ Deployment finished."
