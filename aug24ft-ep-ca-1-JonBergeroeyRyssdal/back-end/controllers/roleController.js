// controllers/roleController.js
const roleService = require('../services/roleService');

exports.getAllRoles = async (req, res, next) => {
  try {
    const roles = await roleService.getAllRoles();
    res.json(roles);
  } catch (err) {
    next(err);
  }
};

exports.getRoleById = async (req, res, next) => {
  try {
    const role = await roleService.getRoleById(+req.params.id);
    res.json(role);
  } catch (err) {
    next(err);
  }
};

exports.createRole = async (req, res, next) => {
  try {
    const role = await roleService.createRole(req.body.name);
    res.status(201).json(role);
  } catch (err) {
    next(err);
  }
};

exports.updateRole = async (req, res, next) => {
  try {
    const role = await roleService.updateRole(+req.params.id, req.body.name);
    res.json(role);
  } catch (err) {
    next(err);
  }
};

exports.deleteRole = async (req, res, next) => {
  try {
    await roleService.deleteRole(+req.params.id);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
