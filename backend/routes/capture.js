const express = require('express');
const { Capture } = require('../models/Capture');
const { redisClient, cacheMiddleware } = require('../cache');

const router = express.Router();


//POST /api/capture endpoint for Saving Captured Data to MongoDB
router.post('/', async (req, res) => {
  console.log('Received POST request to /api/capture');
  try {
    const { latitude, longitude, zoom, mapImage } = req.body;

    if (!latitude || !longitude || !zoom || !mapImage) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newCapture = new Capture({
      latitude,
      longitude,
      zoom,
      mapImage,
    });

    await newCapture.save();
    //redisClient.del('captures'); // Clear cache after new capture
    if (redisClient.isOpen) {
      // Clear cache for all captures and frequent captures
      await redisClient.del('/api/capture/');
      await redisClient.del('/api/capture/frequent');
    }
    console.log('Capture saved successfully');
    res.status(201).json({ message: 'Capture saved successfully' });
  } catch (error) {
    console.error('Error saving capture:', error);
    res.status(500).json({ message: 'Error saving capture', error });
  }
});


//GET /api/capture endpoint for Retrieving Saved Data from MongoDB
router.get('/', cacheMiddleware, async (req, res) => {
  try {
    const captures = await Capture.find();
    if (redisClient.isOpen) {
      await redisClient.setEx(req.originalUrl, 3600, JSON.stringify(captures));
    }
    res.status(200).json(captures);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching captures', error });
  }
});

//GET /api/capture/frequent endpoint for Top Three Most Frequently Captured Regions
router.get('/frequent', cacheMiddleware, async (req, res) => {
  try {
    const captures = await Capture.aggregate([
      { $group: { _id: { latitude: '$latitude', longitude: '$longitude' }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);
    if (redisClient.isOpen) {
      await redisClient.setEx(req.originalUrl, 3600, JSON.stringify(captures));
    }
    res.status(200).json(captures);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching frequent captures', error });
  }
});

module.exports = { captureRouter: router };
