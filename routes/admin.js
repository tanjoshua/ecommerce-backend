// external imports
const express = require("express");

// internal imports
const productsController = require("../controllers/products");
const checkLoggedIn = require("../middleware/checkLoggedIn");

const router = express.Router();

router.get("/add-product", checkLoggedIn, productsController.getAddProduct);

router.post("/add-product", checkLoggedIn, productsController.postAddProduct);

router.get(
  "/edit-product/:productID",
  checkLoggedIn,
  productsController.getEditProduct
);

router.post("/edit-product", checkLoggedIn, productsController.postEditProduct);

router.post("/delete-product", checkLoggedIn, productsController.deleteProduct);

module.exports = router;
