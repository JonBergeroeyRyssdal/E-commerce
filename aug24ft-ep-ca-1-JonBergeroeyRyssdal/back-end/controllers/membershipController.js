const membershipService = require('../services/membershipService');

exports.getAllMemberships = async (req, res) => {
  try {
    const memberships = await membershipService.getAllMemberships();
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get memberships' });
  }
};

exports.createMembership = async (req, res) => {
  try {
    const membership = await membershipService.createMembership(req.body);
    res.status(201).json(membership);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Failed to create membership' });
  }
};

exports.updateMembership = async (req, res) => {
  try {
    const updated = await membershipService.updateMembership(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    if (error.message === 'Membership not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message || 'Failed to update membership' });
    }
  }
};

exports.deleteMembership = async (req, res) => {
  try {
    await membershipService.deleteMembership(req.params.id);
    res.status(204).end();
  } catch (error) {
    if (error.message === 'Membership not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message || 'Failed to delete membership' });
    }
  }
};



