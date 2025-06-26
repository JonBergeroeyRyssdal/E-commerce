const { Category } = require('../models');

/**
 * Fetch all categories from the database.
 * @returns {Promise<Array<Category>>}
 */
async function getAllCategories() {
  return Category.findAll();
}

/**
 * Create a new category with the given name.
 * @param {string} name - The name of the category
 * @returns {Promise<Category>}
 */
async function createCategory(name) {
  if (!name) throw new Error('Category name is required');
  return Category.create({ name });
}

/**
 * Update an existing category by ID.
 * @param {number} id - ID of the category to update
 * @param {string} name - New name for the category
 * @returns {Promise<Category>}
 */
async function updateCategory(id, name) {
  const category = await Category.findByPk(id);
  if (!category) throw new Error('Category not found');

  category.name = name;
  return category.save();
}

/**
 * Delete a category by ID.
 * @param {number} id - ID of the category to delete
 * @returns {Promise<boolean>} - Returns true if deletion was successful
 */
async function deleteCategory(id) {
  const category = await Category.findByPk(id);
  if (!category) throw new Error('Category not found');

  await category.destroy();
  return true;
}

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
};

