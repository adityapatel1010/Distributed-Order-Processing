const Redis = require('ioredis');
require('dotenv').config();

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

module.exports = async (order) => {
  await redis.lpush('orderQueue', JSON.stringify({
    id: order.id,
    quantity: order.quantity
  }));
};
