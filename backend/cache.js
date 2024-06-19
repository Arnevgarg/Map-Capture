const redis = require('redis');
const redisClient = redis.createClient({
    url: 'redis://default:OkJ3clIXP9ZD8m0XF6wEOvHY03QoXKjk@redis-13534.c301.ap-south-1-1.ec2.redns.redis-cloud.com:13534',
  });

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

redisClient.connect().catch(console.error);

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  redisClient.get(key, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      res.status(200).json(JSON.parse(data));
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        redisClient.setEx(key, 3600, JSON.stringify(body));
        res.sendResponse(body);
      };
      next();
    }
  });
};

module.exports = { redisClient, cacheMiddleware };
