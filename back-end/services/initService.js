// File: back-end/services/initService.js
const axios = require('axios');
const bcrypt = require('bcrypt');
const { sequelize, Membership, User, Brand, Category, Product } = require('../models');
const roleService = require('./roleService');

/**
 * Initializes the database:
 * - Drops and recreates all tables
 * - Seeds roles, memberships, admin user
 * - Fetches external product data and populates brands, categories, and products
 */
async function initializeDatabase() {
  await sequelize.sync({ force: true });

  // Seed user roles via service
  await roleService.createRole('Admin');
  await roleService.createRole('User');

  // Seed membership tiers
  await Membership.bulkCreate([
    { id: 1, name: 'Bronze', min: 0, max: 15, discount: 0 },
    { id: 2, name: 'Silver', min: 15, max: 30, discount: 15 },
    { id: 3, name: 'Gold', min: 30, max: 9999, discount: 30 }
  ], { ignoreDuplicates: true });

  // Create initial admin user with service lookup
  const adminRole = await roleService.getRoleByName('Admin');
  const passwordHash = await bcrypt.hash('P@ssword2023', 10);
  await User.create({
    firstname: 'Admin',
    lastname: 'Support',
    username: 'Admin',
    email: 'admin@noroff.no',
    password: passwordHash,
    address: 'Online',
    phone: '911',
    RoleId: adminRole.id,
    MembershipId: 1,
  });

  // Fetch and populate products
  const { data: noroffData } = await axios.get('http://backend.restapi.co.za/items/products');
  const products = noroffData.data;
  for (const item of products) {
    const [brand] = await Brand.findOrCreate({ where: { name: item.brand || 'Unknown Brand' } });
    const [category] = await Category.findOrCreate({ where: { name: item.category || 'Unknown Category' } });
    await Product.findOrCreate({
      where: { title: item.name },
      defaults: {
        description: item.description || '',
        price: item.price || 0,
        quantity: item.quantity || 0,
        image: item.imgurl || null,
        BrandId: brand.id,
        CategoryId: category.id,
        isDeleted: false
      }
    });
  }

  return { message: 'Database initialized successfully' };
}

module.exports = { initializeDatabase };


