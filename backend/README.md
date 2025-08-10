# EventHub Backend

## Railway Deployment

This backend is configured for Railway deployment with MongoDB.

### Environment Variables Required:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `JWT_REFRESH_SECRET` - JWT refresh secret key
- `NODE_ENV` - Set to 'production'

### Endpoints:
- `GET /health` - Health check
- `POST /api/auth/*` - Authentication routes
- `GET/POST/PUT/DELETE /api/events/*` - Event management
- `GET/PUT /api/users/*` - User management
- `GET /api/analytics/*` - Analytics routes