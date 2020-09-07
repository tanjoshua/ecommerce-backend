// external imports
const express = require("express");

// internal imports
const productsController = require("../controllers/products");

const router = express.Router();

router.get("/add-product", productsController.getAddProduct);

router.post("/add-product", productsController.postAddProduct);

router.get("/edit-product/:productID", productsController.getEditProduct);

router.post("/edit-product", productsController.postEditProduct);

router.post("/delete-product", productsController.deleteProduct);

module.exports = router;
