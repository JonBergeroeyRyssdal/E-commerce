const { Product, Category, Brand } = require('../models');

/**
 * Fetch all products that are not soft-deleted.
 * Includes related Brand and Category names.
 */
async function getAllProducts() {
  return Product.findAll({
    include: [
      { model: Brand, attributes: ['name'] },
      { model: Category, attributes: ['name'] }
    ]
  });
}


/**
 * Fetch a single product by ID, including its Brand and Category.
 * @param {number} id - Product ID
 */
async function getProductById(id) {
  return Product.findByPk(id, {
    include: [
      { model: Brand, attributes: ['name'] },
      { model: Category, attributes: ['name'] }
    ]
  });
}

/**
 * Create a new product.
 * @param {object} data - Product details
 */
async function createProduct(data) {
  return Product.create({
    ...data,
    isDeleted: false // Ensure product is not marked as deleted
  });
}

/**
 * Update an existing product by ID.
 * @param {number} id - Product ID
 * @param {object} data - Updated product fields
 */
async function updateProduct(id, data) {
  const product = await Product.findByPk(id);
  if (!product) throw new Error('Product not found');
  return product.update(data);
}

/**
 * Soft delete a product (marks it as deleted instead of removing it).
 * @param {number} id - Product ID
 */
async function softDeleteProduct(id) {
  const product = await Product.findByPk(id);
  if (!product) throw new Error('Product not found');

  product.isDeleted = true;
  return product.save();
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  softDeleteProduct
};
