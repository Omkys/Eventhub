# EventHub Deployment Guide

## 🚀 Current Deployment Status

✅ **Frontend**: Deployed on Vercel  
✅ **Backend**: Configured for Vercel  
❌ **Database**: Requires MongoDB Atlas setup  

## 📋 Required Environment Variables

### For Vercel Dashboard:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eventhub
JWT_SECRET=your_32_character_secure_random_string
JWT_REFRESH_SECRET=another_32_character_secure_random_string
NODE_ENV=production
```

### Generate JWT Secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🗄️ Database Setup Options

### Option A: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user
5. Get your connection string
6. Replace `<password>` with your database user password
7. Add your connection string to Vercel environment variables

### Option B: Railway Backend Deployment
1. Go to [Railway](https://railway.app)
2. Connect your GitHub repository
3. Deploy backend with MongoDB addon
4. Get the deployed backend URL
5. Update frontend API configuration

## ⚙️ Setting Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your EventHub project
3. Go to Settings → Environment Variables
4. Add each variable:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Generate a secure random string (32+ characters)
   - `JWT_REFRESH_SECRET`: Generate another secure random string
   - `NODE_ENV`: Set to `production`

## 🔧 Generate Secure JWT Secrets

Use this command to generate secure secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🔄 After Setting Environment Variables

1. Redeploy your application in Vercel
2. Test authentication and database connectivity
3. Verify all features are working

## 📱 Live Application

**Frontend URL**: https://eventhub-icha0xwqj-onkars-projects-1c7f8f57.vercel.app

## 🆘 Troubleshooting

- **API calls failing**: Check if environment variables are set correctly
- **Authentication not working**: Verify JWT secrets are configured
- **Database connection errors**: Ensure MongoDB URI is correct and database is accessible