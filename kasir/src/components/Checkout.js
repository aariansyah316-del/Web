export default class Checkout {
  constructor() {
    this.cart = [];
  }

  addToCart(product, qty = 1) {
    const idx = this.cart.findIndex(i => i.id === product.id);
    if (idx >= 0) {
      this.cart[idx].quantity += qty;
    } else {
      this.cart.push({ id: product.id, name: product.name, price: product.price, quantity: qty });
    }
  }

  removeItem(index) {
    if (index >= 0 && index < this.cart.length) this.cart.splice(index, 1);
  }

  getCart() {
    return this.cart;
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  clearCart() {
    this.cart = [];
  }
}