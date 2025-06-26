const { Brand } = require('../models');

async function getAllBrands() {
  return await Brand.findAll();
}

async function createBrand(name) {
  if (!name?.trim()) {
    throw new Error('Brand name is required');
  }
  return await Brand.create({ name });
}

async function updateBrand(id, name) {
  const brand = await Brand.findByPk(id);
  if (!brand) {
    throw new Error('Brand not found');
  }

  brand.name = name;
  return await brand.save();
}

async function deleteBrand(id) {
  const brand = await Brand.findByPk(id);
  if (!brand) {
    throw new Error('Brand not found');
  }

  await brand.destroy();
  return true;
}

module.exports = {
  getAllBrands,
  createBrand,
  updateBrand,
  deleteBrand,
};

