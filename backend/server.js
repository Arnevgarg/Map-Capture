const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { captureRouter } = require('./routes/capture');
const { redisClient, cacheMiddleware } = require('./cache');
const { authRouter, authMiddleware } = require('./routes/auth');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/capture', authMiddleware, captureRouter);

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://gargarnev:ishangarg@map-capture-app.lq3qlud.mongodb.net/?retryWrites=true&w=majority&appName=map-capture-app';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/", (req,res) => {
  res.json("Hello");
})