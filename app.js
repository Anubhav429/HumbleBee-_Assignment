// Load environment variables from .env file
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const { swaggerUi, specs } = require('./swagger');
const { generateSyncToken } = require('./utils/syncToken');
const { authenticate } = require('./middleware/auth');

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static('public'));

// Connect to MongoDB database
connectDB();

// Route handlers for different modules
app.use('/api/auth', require('./routes/authRoutes'));       // Auth routes (register, login)
app.use('/api/hives', require('./routes/hiveRoutes'));     // Hive-related routes
app.use('/api/crops', require('./routes/cropRoutes'));     // Crop-related routes
app.use('/admin', require('./routes/adminRoutes'));        // Admin-specific routes

// Swagger documentation UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Protected route to get a sync token (only accessible by authenticated users)
app.get('/sync-token', authenticate, (req, res) => {
  res.json({ syncToken: generateSyncToken() });
});

// Start the server on the specified PORT
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4M2RkODY0YzBlNTc3MGFkM2EyYjcyZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0ODg4MzcwNX0.FDlfdRenFoETr6IBLieW-WWKjA_ee1c5gCQ9TBKRV5s"