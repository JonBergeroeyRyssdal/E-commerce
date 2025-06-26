const { sequelize } = require('../models');

/**
 * Search for products based on optional filters: name, category ID, and brand ID.
 * Uses raw SQL with parameter binding for safety and performance.
 *
 * @param {Object} filters - Search filters
 * @param {string} [filters.name] - Partial product name
 * @param {string|number} [filters.category] - Category ID to filter by
 * @param {string|number} [filters.brand] - Brand ID to filter by
 * @returns {Promise<Array>} Matching products
 */
async function searchProducts({ name, category, brand }) {
  let query = `
    SELECT 
      p.id, 
      p.title, 
      p.description,
      p.price, 
      p.quantity,
      p.image, 
      p.CategoryId, 
      p.BrandId, 
      c.name AS category, 
      b.name AS brand
    FROM Products p
    JOIN Categories c ON p.CategoryId = c.id
    JOIN Brands b ON p.BrandId = b.id
    WHERE p.isDeleted = false
  `;

  const replacements = {};

  if (name) {
    query += ` AND p.title LIKE :name`;
    replacements.name = `%${name}%`;
  }

  if (category && !isNaN(category)) {
    query += ` AND p.CategoryId = :category`;
    replacements.category = parseInt(category);
  }

  if (brand && !isNaN(brand)) {
    query += ` AND p.BrandId = :brand`;
    replacements.brand = parseInt(brand);
  }

  const results = await sequelize.query(query, {
    replacements,
    type: sequelize.QueryTypes.SELECT
  });

  return Array.isArray(results) ? results : [];
}

module.exports = {
  searchProducts
};


