// back-end/services/orderService.js

const { sequelize, Order, OrderItem, User, Product, Cart } = require('../models');

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
      { model: OrderItem, include: [Product] },
    ],
  });
}

/**
 * Retrieves all orders for a specific user, including order items and product details.
 * @param {number} userId
 */
async function getUserOrders(userId) {
  return Order.findAll({
    where: { userId },
    include: [{ model: OrderItem, include: [Product] }],
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
 * - Validates stock
 * - Creates an order
 * - Adds order items
 * - Empties the user's cart
 * - Reduces stock for each product
 *
 * 3NF: does NOT store derived totals (like totalQuantity) in Orders.
 *
 * @param {number} userId - ID of the user checking out
 * @returns {Promise<object>} - { order, totalQuantity }
 */
async function checkoutCart(userId) {
  return sequelize.transaction(async (t) => {
    // Fetch cart items + products (lock rows for consistency)
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product }],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (!cartItems.length) {
      throw new Error('Cart is empty, cannot checkout');
    }

    // Validate stock + calculate totalQuantity (computed, not stored)
    let totalQuantity = 0;

    for (const item of cartItems) {
      const product = item.Product;
      if (!product) throw new Error('A cart item references a missing product');

      if (product.isDeleted) {
        throw new Error(`Product "${product.title}" is deleted`);
      }

      if (product.quantity < item.quantity) {
        throw new Error(`Insufficient stock for product: ${product.title}`);
      }

      totalQuantity += item.quantity;
    }

    // Deduct stock
    for (const item of cartItems) {
      const product = item.Product;
      product.quantity -= item.quantity;
      await product.save({ transaction: t });
    }

    // Create order (NO totalQuantity column)
    const order = await Order.create(
      {
        userId,
        status: 'Pending',
        discountApplied: 0,
        orderNumber: generateOrderNumber(),
      },
      { transaction: t }
    );

    // Create order items
    await Promise.all(
      cartItems.map((item) =>
        OrderItem.create(
          {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: Number(item.Product.price),
          },
          { transaction: t }
        )
      )
    );

    // Empty the cart
    await Cart.destroy({ where: { userId }, transaction: t });

    // Return order + computed totals (not stored)
    return { order, totalQuantity };
  });
}

module.exports = {
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  checkoutCart,
};
