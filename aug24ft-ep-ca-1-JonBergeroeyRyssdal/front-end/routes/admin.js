// File: routes/admin.js

const express = require("express");
const router = express.Router();

// Mount admin sub-routers
router.use("/", require("./admin/index"));
router.use("/users", require("./admin/users"));
router.use("/products/search", require("./admin/search"));
router.use("/products", require("./admin/products"));
router.use("/categories", require("./admin/categories"));
router.use("/brands", require("./admin/brands"));
router.use("/orders", require("./admin/orders"));

module.exports = router;
