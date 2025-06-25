// File: back-end/services/userService.js
const { User, Membership } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const roleService = require('./roleService');

const JWT_SECRET = process.env.JWT_SECRET || 'fallbacksecret';

async function registerUser(data) {
  const { firstname, lastname, username, email, password, address, phone } = data;
  if (!firstname || !lastname || !username || !email || !password) {
    throw new Error('All fields are required');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) throw new Error('Invalid email format');
  const existingEmail = await User.findOne({ where: { email } });
  const existingUsername = await User.findOne({ where: { username } });
  if (existingEmail) throw new Error('Email already exists');
  if (existingUsername) throw new Error('Username already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const userRole = await roleService.getRoleByName('User');

  const newUser = await User.create({
    firstname,
    lastname,
    username,
    email,
    password: hashedPassword,
    address,
    phone,
    RoleId: userRole.id,
    MembershipId: 1
  });

  return {
    id: newUser.id,
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    username: newUser.username,
    email: newUser.email,
    roleId: newUser.RoleId,
    membershipId: newUser.MembershipId
  };
}

async function loginUser(email, password) {
  if (!email || !password) throw new Error('Email and password are required');
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid email or password');
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid email or password');

  const tokenPayload = {
    userId: user.id,
    username: user.username,
    roleId: user.RoleId,
    membershipId: user.MembershipId
  };
  const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '2h' });

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      roleId: user.RoleId,
      membershipId: user.MembershipId
    }
  };
}

async function getAllUsers() {
  return User.findAll({
    attributes: { exclude: ['password'] },
    include: [{ model: Membership, attributes: ['name', 'discount'] }]
  });
}

async function updateUser(id, data) {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');
  return user.update(data);
}

async function updateUserRole(id, roleId) {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');
  user.RoleId = roleId;
  return user.save();
}

async function deleteUser(id) {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');
  await user.destroy();
  return true;
}

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  updateUserRole,
  deleteUser
};


