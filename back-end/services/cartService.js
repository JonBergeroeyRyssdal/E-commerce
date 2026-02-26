// File: back-end/services/cartService.js

const { Cart, Product } = require('../models');
const orderService = require('./orderService');

/**
 * Add a product to a user's cart, or increase quantity if it already exists.
 */
async function addToCart(userId, productId, quantity) {
  const product = await Product.findByPk(productId);
  if (!product) throw new Error('Product not found');
  if (product.isDeleted) throw new Error('Product is deleted');
  if (product.quantity < quantity) throw new Error('Insufficient stock');

  const [item, created] = await Cart.findOrCreate({
    where: { userId, productId },
    defaults: { quantity },
  });

  if (!created) {
    const newQty = item.quantity + quantity;
    if (newQty > product.quantity) {
      throw new Error('Insufficient stock for requested total quantity');
    }
    item.quantity = newQty;
    await item.save();
  }

  return item;
}

async function getCartItems(userId) {
  return await Cart.findAll({
    where: { userId },
    include: [Product],
  });
}

async function checkoutNow(userId) {
  return await orderService.checkoutCart(userId);
}

module.exports = {
  addToCart,
  getCartItems,
  checkoutNow,
};
