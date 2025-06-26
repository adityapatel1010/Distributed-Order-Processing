const db = require('../models');
const publishToRedis = require('../redis/redisPublisher');

exports.createOrder = async (req, res) => {
  try {
    const { item, quantity, price } = req.body;
    const order = await db.Order.create({ item, quantity, price ,status: 'pending'});
    await publishToRedis({ id: order.id, quantity: order.quantity });
    console.log("Order created and published to Redis");
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await db.Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
