const cartService = require('../services/cartService');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const quantityInt = parseInt(quantity, 10);

    if (isNaN(quantityInt) || quantityInt < 1) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }

    const userId = req.user.userId;
    const cartItem = await cartService.addToCart(userId, productId, quantityInt);
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to add to cart' });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cartItems = await cartService.getCartItems(userId);
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch cart items' });
  }
};

exports.checkoutNow = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { order, newMembership, discountApplied } = await cartService.checkoutNow(userId);
    res.status(201).json({ order, discountApplied, newMembership });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Checkout failed' });
  }
};







