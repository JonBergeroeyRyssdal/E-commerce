const brandService = require('../services/brandService');

exports.getAllBrands = async (req, res) => {
  try {
    const brands = await brandService.getAllBrands();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch brands' });
  }
};

exports.createBrand = async (req, res) => {
  try {
    const brand = await brandService.createBrand(req.body.name);
    res.status(201).json(brand);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Failed to create brand' });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const updatedBrand = await brandService.updateBrand(req.params.id, req.body.name);
    res.json(updatedBrand);
  } catch (err) {
    if (err.message === 'Brand not found') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(400).json({ error: err.message || 'Failed to update brand' });
    }
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    await brandService.deleteBrand(req.params.id);
    res.status(204).end(); // No content on successful delete
  } catch (err) {
    if (err.message === 'Brand not found') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Failed to delete brand' });
    }
  }
};


