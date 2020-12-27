// external imports
const express = require("express");

// internal imports
const productsController = require("../controllers/products");
const cartController = require("../controllers/cart");
const checkLoggedIn = require("../middleware/checkLoggedIn");

// create routes
const router = express.Router();

router.get("/", productsController.getProducts);

router.get("/cart", checkLoggedIn, cartController.getCart);

// add product to cart
router.post("/cart", checkLoggedIn, cartController.addToCart);
router.post("/cart/delete", checkLoggedIn, cartController.deleteFromCart);

// execute order using cart
router.post("/order", checkLoggedIn, cartController.postOrder);
router.get("/orders", checkLoggedIn, cartController.getOrders);

// :productID as a dynamic parameter
router.get("/products/:productID", productsController.getProductByID);

// checkout payment - Note: to remove payments, post order instead of redirecting to checkout page
router.get("/checkout", checkLoggedIn, cartController.getCheckout);
router.get("/checkout/success", checkLoggedIn, cartController.postOrder); // security vulnerability: orders can be placed w/o payment using this get request

module.exports = router;
