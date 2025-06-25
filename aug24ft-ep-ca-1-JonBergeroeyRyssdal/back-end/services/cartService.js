// File: back-end/services/cartService.js

const { Cart, Product } = require('../models');
const orderService = require('./orderService'); // Delegate checkout logic

/**
 * Add a product to a user's cart, or increase quantity if it already exists.
 * Checks available stock before adding or updating.
 *
 * @param {number} userId - ID of the user
 * @param {number} productId - ID of the product
 * @param {number} quantity - Quantity to add
 * @returns {Promise<Cart>} - The created or updated cart item
 */
async function addToCart(userId, productId, quantity) {
  // 1. Verify product exists and has enough stock
  const product = await Product.findByPk(productId);
  if (!product) throw new Error('Product not found');
  if (product.quantity < quantity) throw new Error('Insufficient stock');

  // 2. Find or create cart item
  const [item, created] = await Cart.findOrCreate({
    where: { UserId: userId, ProductId: productId },
    defaults: { quantity }
  });

  if (!created) {
    item.quantity += quantity;

    if (item.quantity > product.quantity) {
      throw new Error('Insufficient stock for requested total quantity');
    }

    await item.save();
  }

  return item;
}

/**
 * Get all cart items for a user, including the associated product data.
 *
 * @param {number} userId - ID of the user
 * @returns {Promise<Array<Cart>>}
 */
async function getCartItems(userId) {
  return await Cart.findAll({
    where: { UserId: userId },
    include: [Product]
  });
}

/**
 * Perform checkout for the user's current cart.
 * Delegates to orderService and clears the cart.
 *
 * @param {number} userId - ID of the user
 * @returns {Promise<object>} - Result of the order service checkout
 */
async function checkoutNow(userId) {
  return await orderService.checkoutCart(userId);
}

module.exports = {
  addToCart,
  getCartItems,
  checkoutNow
};



