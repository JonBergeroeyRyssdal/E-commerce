const { Membership, Sequelize } = require('../models');
const { Op } = Sequelize;

/**
 * Finds the correct membership level based on the total number of purchased items.
 * @param {number} total - Total number of items purchased by the user.
 * @returns {Promise<Membership|null>}
 */
async function findLevelByTotalItems(total) {
  return Membership.findOne({
    where: {
      min: { [Op.lte]: total },
      max: { [Op.gte]: total }
    }
  });
}

/**
 * Returns all membership levels.
 */
async function getAllMemberships() {
  return Membership.findAll();
}

/**
 * Creates a new membership level.
 * @param {Object} data - Membership details (name, min, max, discount)
 */
async function createMembership({ name, min, max, discount }) {
  if (!name || min == null || max == null || discount == null) {
    throw new Error('All membership fields are required');
  }
  return Membership.create({ name, min, max, discount });
}

/**
 * Updates an existing membership by ID.
 * @param {number} id - Membership ID
 * @param {Object} data - Updated membership fields
 */
async function updateMembership(id, { name, min, max, discount }) {
  const membership = await Membership.findByPk(id);
  if (!membership) throw new Error('Membership not found');

  membership.name = name;
  membership.min = min;
  membership.max = max;
  membership.discount = discount;

  return membership.save();
}

/**
 * Deletes a membership level by ID.
 * @param {number} id - Membership ID
 */
async function deleteMembership(id) {
  const membership = await Membership.findByPk(id);
  if (!membership) throw new Error('Membership not found');

  await membership.destroy();
  return true;
}

module.exports = {
  findLevelByTotalItems,
  getAllMemberships,
  createMembership,
  updateMembership,
  deleteMembership
};

