// external imports
const express = require("express");

// internal imports
const productsController = require("../controllers/products");
const cartController = require("../controllers/cart");

// create routes
const router = express.Router();

router.get("/", productsController.getProducts);

router.get("/cart", productsController.getCart);

// add product to cart
router.post("/cart", cartController.addToCart);
router.post("/cart/delete", cartController.deleteFromCart);

// execute order using cart
router.post("/order", cartController.postOrder);
router.get("/orders", cartController.getOrders);

// :productID as a dynamic parameter
router.get("/products/:productID", productsController.getProductByID);

module.exports = router;
