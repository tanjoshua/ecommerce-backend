const cart = { cartItems: [], totalPrice: 0 };

module.exports = class Cart {
  static addToCart(id, price) {
    // check if already in cart
    const existingCartItem = cart.cartItems.find((item) => item.id == id);
    if (existingCartItem) {
      existingCartItem.qty += 1;
      cart.totalPrice += +price;
    } else {
      const newCartItem = new CartItem(id, 1);
      cart.cartItems = [...cart.cartItems, newCartItem];
      cart.totalPrice += +price;
    }
  }

  static deleteFromCart = (id, price) => {
    const cartItem = cart.cartItems.find((item) => item.id == id);
    if (cartItem) {
      cart.cartItems = cart.cartItems.filter((item) => item.id != id);
      // adjust total price
      cart.totalPrice -= +price * cartItem.qty;
    }
  };

  static fetchCart(cb) {
    cb(cart);
  }
};

class CartItem {
  constructor(id, qty) {
    this.id = id;
    this.qty = qty;
  }
}
