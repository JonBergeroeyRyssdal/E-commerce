// File: back-end/services/roleService.js
const { Role } = require('../models');

/**
 * Fetch all roles.
 * @returns {Promise<Array<Role>>}
 */
async function getAllRoles() {
  return Role.findAll();
}

/**
 * Fetch a role by its name.
 * @param {string} name
 * @returns {Promise<Role|null>}
 */
async function getRoleByName(name) {
  return Role.findOne({ where: { name } });
}

/**
 * Fetch a single role by ID.
 * @param {number} id
 * @returns {Promise<Role>}
 */
async function getRoleById(id) {
  const role = await Role.findByPk(id);
  if (!role) throw new Error('Role not found');
  return role;
}

/**
 * Create a new role.
 * @param {string} name
 * @returns {Promise<Role>}
 */
async function createRole(name) {
  if (!name?.trim()) throw new Error('Role name is required');
  return Role.create({ name });
}

/**
 * Update an existing role.
 * @param {number} id
 * @param {string} name
 * @returns {Promise<Role>}
 */
async function updateRole(id, name) {
  const role = await Role.findByPk(id);
  if (!role) throw new Error('Role not found');
  role.name = name;
  return role.save();
}

/**
 * Delete a role by ID.
 * @param {number} id
 * @returns {Promise<boolean>}
 */
async function deleteRole(id) {
  const role = await Role.findByPk(id);
  if (!role) throw new Error('Role not found');
  await role.destroy();
  return true;
}

module.exports = {
  getAllRoles,
  getRoleByName,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
};
