const userService = require('../services/userService');

exports.registerUser = async (req, res) => {
  try {
    const userData = await userService.registerUser(req.body);
    res.status(201).json({ user: userData });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Failed to register user' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    res.json({
      token: result.token,
      user: result.user
    });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Failed to login' });
  }
};




