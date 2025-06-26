const { Order, OrderItem, User, Product, Cart } = require('../models');

/**
 * Generates a unique 8-digit order number prefixed with "ORD-"
 */
function generateOrderNumber() {
  return 'ORD-' + Math.floor(10000000 + Math.random() * 90000000);
}

/**
 * Retrieves all orders with associated user info and products.
 */
async function getAllOrders() {
  return Order.findAll({
    include: [
      { model: User, attributes: ['id', 'username', 'email'] },
      { model: OrderItem, include: [Product] }
    ]
  });
}

/**
 * Retrieves all orders for a specific user, including order items and product details.
 * @param {number} userId
 */
async function getUserOrders(userId) {
  return Order.findAll({
    where: { UserId: userId },
    include: [{ model: OrderItem, include: [Product] }]
  });
}

/**
 * Updates the status of a specific order.
 * @param {number} id - Order ID
 * @param {string} status - New status to set
 */
async function updateOrderStatus(id, status) {
  const order = await Order.findByPk(id);
  if (!order) throw new Error('Order not found');

  order.status = status;
  return order.save();
}

/**
 * Handles the full checkout process for a user's cart:
 * - Creates an order
 * - Adds order items
 * - Empties the user's cart
 * - Reduces stock for each product
 *
 * @param {number} userId - ID of the user checking out
 * @returns {Promise<Order>}
 */
async function checkoutCart(userId) {
  const cartItems = await Cart.findAll({ where: { UserId: userId }, include: [Product] });

  if (!cartItems || cartItems.length === 0) {
    throw new Error('Cart is empty, cannot checkout');
  }

  // Check that all items have enough stock
  for (const item of cartItems) {
    if (item.Product.quantity < item.quantity) {
      throw new Error(`Insufficient stock for product: ${item.Product.title}`);
    }
  }

  // Deduct stock
  for (const item of cartItems) {
    item.Product.quantity -= item.quantity;
    await item.Product.save();
  }

  // Create order
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const order = await Order.create({
    UserId: userId,
    status: 'Pending',
    totalQuantity,
    discountApplied: 0,
    orderNumber: generateOrderNumber()
  });

  // Create order items
  await Promise.all(cartItems.map(item => {
    return OrderItem.create({
      OrderId: order.id,
      ProductId: item.ProductId,
      quantity: item.quantity,
      priceAtPurchase: item.Product.price
    });
  }));

  // Empty the cart
  await Cart.destroy({ where: { UserId: userId } });

  return order;
}

module.exports = {
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  checkoutCart
};

