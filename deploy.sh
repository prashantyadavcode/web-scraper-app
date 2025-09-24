#!/bin/bash

# 🚀 Web Scraper App Deployment Script
# This script helps you prepare and deploy your app to Vercel or Render

echo "🚀 Web Scraper App Deployment Helper"
echo "====================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Add all files
echo "📝 Adding files to Git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit"
else
    echo "💾 Committing changes..."
    git commit -m "Deploy: Web scraper app ready for deployment"
    echo "✅ Changes committed"
fi

echo ""
echo "🎯 Next Steps:"
echo "=============="
echo ""
echo "1. 📤 Create a GitHub repository:"
echo "   - Go to https://github.com/new"
echo "   - Name it: web-scraper-app"
echo "   - Make it PUBLIC (required for free deployment)"
echo "   - Don't initialize with README"
echo ""
echo "2. 🔗 Connect your local repo to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/web-scraper-app.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. 🚀 Deploy to Vercel (Recommended):"
echo "   - Go to https://vercel.com"
echo "   - Sign up with GitHub"
echo "   - Import your repository"
echo "   - Deploy!"
echo ""
echo "   OR"
echo ""
echo "4. 🔧 Deploy to Render:"
echo "   - Go to https://render.com"
echo "   - Sign up with GitHub"
echo "   - Create new Web Service"
echo "   - Connect your repository"
echo "   - Deploy!"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🎉 Your app will be live and accessible worldwide!"
