require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { captureRouter } = require('./routes/capture');
const { redisClient, cacheMiddleware } = require('./cache');
const { authRouter, authMiddleware } = require('./routes/auth');

const app = express();
const port = process.env.port;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/capture', authMiddleware, captureRouter);

// Test route
app.get('/', (req, res) => {
  res.send('Map Capture Backend is running!');
});

// MongoDB connection
const mongoURI = process.env.MONGO_URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// app.get("/", (req,res) => {
//   res.json("Hello");
// })
// redisClient.connect().then(() => {
//   console.log('Redis client connected');
// }).catch((err) => {
//   console.error('Redis client connection error', err);
// });