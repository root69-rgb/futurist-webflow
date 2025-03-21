
# Express.js Backend Integration Guide

This document provides a guide on how to integrate this React application with an Express.js backend.

## Backend Structure

Create a new directory for your backend server with the following structure:

```
backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── .env
├── package.json
├── server.js
```

## Setup Instructions

1. Initialize a new Node.js project:

```bash
mkdir backend
cd backend
npm init -y
```

2. Install required dependencies:

```bash
npm install express cors dotenv mongoose bcrypt jsonwebtoken cookie-parser multer
npm install --save-dev nodemon
```

3. Create a basic server.js file:

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-domain.com' 
    : 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Import Routes
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');

// Route Middleware
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
```

## Route Implementation

### Authentication Routes (routes/auth.js)

```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

// POST /api/auth/login
router.post('/login', authController.login);

// POST /api/auth/logout
router.post('/logout', authController.logout);

// GET /api/auth/status
router.get('/status', verifyToken, authController.checkStatus);

// Biometric authentication routes
router.get('/biometric/challenge', authController.getBiometricChallenge);
router.post('/biometric/verify', authController.verifyBiometric);

module.exports = router;
```

### Contact Routes (routes/contact.js)

```javascript
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { verifyToken } = require('../middleware/auth');

// POST /api/contact/submit
router.post('/submit', contactController.submitContactForm);

// GET /api/contact/details
router.get('/details', contactController.getContactDetails);

// PUT /api/contact/details
router.put('/details', verifyToken, contactController.updateContactDetails);

// POST /api/contact/chat
router.post('/chat', contactController.sendChatMessage);

module.exports = router;
```

### Admin Routes (routes/admin.js)

```javascript
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { verifyToken } = require('../middleware/auth');

// Apply authentication middleware to all admin routes
router.use(verifyToken);

// GET /api/admin/messages
router.get('/messages', messageController.getAllMessages);

// PUT /api/admin/messages/:id/read
router.put('/messages/:id/read', messageController.markAsRead);

// PUT /api/admin/messages/:id/archive
router.put('/messages/:id/archive', messageController.archiveMessage);

// PUT /api/admin/messages/:id/restore
router.put('/messages/:id/restore', messageController.restoreMessage);

// DELETE /api/admin/messages/:id
router.delete('/messages/:id', messageController.deleteMessage);

module.exports = router;
```

## Controller Implementation

Create corresponding controller files in the controllers/ directory to handle the API endpoints defined in the routes.

## Authentication Middleware (middleware/auth.js)

```javascript
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { verifyToken };
```

## Models

Create MongoDB models for your data in the models/ directory.

## Environment Variables (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/viewtech
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
```

## Integrating with the Frontend

Update the API_URL in `src/services/api.ts` to point to your Express backend.

## Running the Backend

Add the following to your package.json scripts:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Run the server with:

```bash
npm run dev
```

## Deployment

For production deployment, consider the following:

1. Set up proper environment variables
2. Implement rate limiting
3. Use HTTPS
4. Set up proper CORS restrictions
5. Consider using a process manager like PM2

This server structure provides a solid foundation for implementing all the backend functionality required by the React application.
