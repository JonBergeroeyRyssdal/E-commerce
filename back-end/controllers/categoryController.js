const categoryService = require('../services/categoryService');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body.name);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Failed to create category' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await categoryService.updateCategory(req.params.id, req.body.name);
    res.json(updatedCategory);
  } catch (err) {
    if (err.message === 'Category not found') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(400).json({ error: err.message || 'Failed to update category' });
    }
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.status(204).end();
  } catch (err) {
    if (err.message === 'Category not found') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Failed to delete category' });
    }
  }
};


