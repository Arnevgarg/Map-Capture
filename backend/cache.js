const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

redisClient.connect().catch(console.error);

const cacheMiddleware = async (req, res, next) => {
  const key = req.originalUrl;

  try {
    const data = await redisClient.get(key);
    if (data !== null) {
      console.log('Serving from cache');
      res.status(200).json(JSON.parse(data));
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        redisClient.setEx(key, 3600, JSON.stringify(body)).catch((err) => {
          console.error('Redis setEx error:', err);
        });
        res.sendResponse(body);
      };
      next();
    }
  } catch (err) {
    console.error('Redis get error:', err);
    next();
  }
};

module.exports = { redisClient, cacheMiddleware };
