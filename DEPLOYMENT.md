# 🚀 Deployment Guide

This guide will help you deploy your web scraping application to **Vercel** or **Render** for free!

## 📋 Prerequisites

1. **GitHub Account** (for both platforms)
2. **Git installed** on your computer
3. **Your project files** (already created)

---

## 🌟 Option 1: Vercel Deployment (Recommended)

### Why Vercel?
- ✅ **Free tier**: 100GB bandwidth/month
- ✅ **Automatic deployments** from GitHub
- ✅ **Serverless functions** (perfect for web scraping)
- ✅ **Custom domains** on free tier
- ✅ **Global CDN**

### Step-by-Step Vercel Deployment:

#### 1. **Initialize Git Repository**
```bash
git init
git add .
git commit -m "Initial commit: Web scraper app"
```

#### 2. **Create GitHub Repository**
1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name it: `web-scraper-app`
4. Make it **Public** (required for free Vercel)
5. Click "Create repository"

#### 3. **Push to GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/web-scraper-app.git
git branch -M main
git push -u origin main
```

#### 4. **Deploy to Vercel**
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with your **GitHub account**
3. Click "New Project"
4. Import your `web-scraper-app` repository
5. **Framework Preset**: Other
6. **Root Directory**: `./`
7. **Build Command**: `npm run build`
8. **Output Directory**: Leave empty
9. Click "Deploy"

#### 5. **Configure Environment Variables** (if needed)
- Go to your project dashboard
- Settings → Environment Variables
- Add any custom variables

#### 6. **Access Your App**
- Your app will be available at: `https://your-app-name.vercel.app`
- Vercel provides automatic HTTPS and custom domains

---

## 🔧 Option 2: Render Deployment

### Why Render?
- ✅ **Free tier**: 750 hours/month
- ✅ **Automatic deployments** from GitHub
- ✅ **Persistent storage**
- ✅ **Custom domains**
- ✅ **Background jobs** support

### Step-by-Step Render Deployment:

#### 1. **Prepare for Render** (Git setup same as Vercel)
```bash
git init
git add .
git commit -m "Initial commit: Web scraper app"
git remote add origin https://github.com/YOUR_USERNAME/web-scraper-app.git
git push -u origin main
```

#### 2. **Deploy to Render**
1. Go to [Render.com](https://render.com)
2. Sign up with your **GitHub account**
3. Click "New +" → "Web Service"
4. Connect your `web-scraper-app` repository
5. **Name**: `web-scraper-app`
6. **Environment**: `Node`
7. **Build Command**: `npm install`
8. **Start Command**: `npm start`
9. **Plan**: **Free**
10. Click "Create Web Service"

#### 3. **Configure Settings**
- **Auto-Deploy**: Yes (deploys on every push)
- **Branch**: `main`
- **Root Directory**: Leave empty

#### 4. **Access Your App**
- Your app will be available at: `https://web-scraper-app.onrender.com`
- Render provides automatic HTTPS

---

## 🔍 Testing Your Deployment

### Test the API:
```bash
curl https://your-app-url.vercel.app/api/health
```

### Test the Frontend:
1. Open your deployed URL in a browser
2. Enter a test URL (e.g., `https://example.com`)
3. Click "Scrape Data"
4. Download the generated report

---

## 📊 Free Tier Limits

### Vercel Free Tier:
- **Bandwidth**: 100GB/month
- **Function executions**: 100GB-hours/month
- **Build minutes**: 6,000/month
- **Domains**: Unlimited custom domains

### Render Free Tier:
- **Hours**: 750/month
- **Bandwidth**: Unlimited
- **Sleep**: Apps sleep after 15 minutes of inactivity
- **Wake time**: ~30 seconds to wake up

---

## 🚨 Important Notes

### For Both Platforms:
1. **Public Repository**: Required for free tiers
2. **HTTPS**: Automatically provided
3. **Environment Variables**: Can be set in dashboard
4. **Logs**: Available in platform dashboards
5. **Custom Domains**: Supported on both platforms

### Web Scraping Considerations:
- **Rate Limiting**: Be respectful of target websites
- **User-Agent**: Already configured in the app
- **Timeouts**: Set to 30 seconds (reasonable)
- **Error Handling**: Comprehensive error handling included

---

## 🎯 Quick Start Commands

### For Vercel:
```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy directly from command line
vercel --prod
```

### For Render:
```bash
# No CLI needed - deploy via GitHub integration
# Just push to your main branch!
```

---

## 🔄 Updating Your App

### Both Platforms:
1. **Make changes** to your code
2. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Update: Added new feature"
   git push origin main
   ```
3. **Automatic deployment** will trigger
4. **New version** will be live in ~2-3 minutes

---

## 🆘 Troubleshooting

### Common Issues:

#### **Build Failures**
- Check `package.json` dependencies
- Ensure all required files are committed
- Check platform logs for specific errors

#### **Runtime Errors**
- Check environment variables
- Verify API endpoints work locally first
- Check platform logs for runtime errors

#### **CORS Issues**
- Already handled in the app
- If issues persist, check platform-specific CORS settings

---

## 🎉 Success!

Once deployed, your web scraping application will be:
- ✅ **Live on the internet**
- ✅ **Accessible from anywhere**
- ✅ **Automatically updated** on code changes
- ✅ **HTTPS secured**
- ✅ **Free to use**

**Share your deployed URL with others to let them scrape websites!** 🌐
