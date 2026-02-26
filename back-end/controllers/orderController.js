// controllers/orderController.js
const orderService = require('../services/orderService');
const cartService = require('../services/cartService');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await orderService.getUserOrders(userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch your orders' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await orderService.updateOrderStatus(req.params.id, req.body.status);
    res.json(updatedOrder);
  } catch (error) {
    if (error.message === 'Order not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message || 'Failed to update order status' });
    }
  }
};

exports.checkoutCartNow = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { order, totalQuantity } = await cartService.checkoutNow(userId);

    res.status(201).json({
      order,
      totalQuantity,                    // computed, not stored
      discountApplied: order.discountApplied ?? 0,
      newMembership: null,
    });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Checkout failed' });
  }
};


