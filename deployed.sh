#!/bin/bash

# ✅ Set up variables
KEY_PATH="/home/abhishek/Downloads/shetimajuri.pem"
REMOTE_USER="ubuntu"
REMOTE_HOST="13.204.147.218"
REMOTE_DIR="~/"
LOCAL_DIR="/home/abhishek/Desktop/ShetiMajuri/backend"

echo "📦 Deploying ShetiMajuri app..."

# ✅ Upload project folder to EC2 instance
scp -i "$KEY_PATH" -r "$LOCAL_DIR" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR"

# ✅ SSH into the EC2 instance, restart PM2 app and Nginx
ssh -i "$KEY_PATH" "$REMOTE_USER@$REMOTE_HOST" << 'EOF'
  cd ~/backend
  echo "🔁 Pulling latest changes and restarting PM2 app..."
  pm2 restart shetimajuri || pm2 start server.js --name shetimajuri

  echo "🔄 Restarting Nginx..."
  sudo systemctl restart nginx
EOF

echo "✅ Deployment finished."
