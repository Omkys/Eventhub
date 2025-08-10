# Railway Backend Deployment Guide

## 🚂 Deploy Backend to Railway

### Step 1: Go to Railway
1. Visit https://railway.app
2. Sign up/Login with GitHub

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `Omkys/Eventhub` repository
4. Select "Deploy Now"

### Step 3: Configure Service
1. Railway will detect your Node.js backend
2. Set **Root Directory** to: `backend`
3. Set **Start Command** to: `npm start`

### Step 4: Add MongoDB Database
1. In your Railway project dashboard
2. Click "New Service" → "Database" → "MongoDB"
3. Railway will create a MongoDB instance
4. Copy the connection string from MongoDB service

### Step 5: Set Environment Variables
In Railway project settings, add:
```
MONGODB_URI=mongodb://mongo:password@mongodb.railway.internal:27017
JWT_SECRET=your_32_character_secure_string
JWT_REFRESH_SECRET=another_32_character_secure_string
NODE_ENV=production
```

### Step 6: Generate JWT Secrets
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 7: Deploy
- Railway will automatically deploy
- You'll get a URL like: `https://your-app-name.railway.app`

### Step 8: Test Backend
- Visit: `https://your-backend-url.railway.app/health`
- Should return: `{"status":"OK","message":"EventHub Backend is running"}`

### Step 9: Update Frontend
Update the API URL in your frontend to use the Railway backend URL.

## 🔧 Alternative: Railway CLI
```bash
npm install -g @railway/cli
railway login
railway link
cd backend
railway up
```