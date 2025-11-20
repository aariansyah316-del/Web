import ProductList from './src/components/ProductList.js';
import Checkout from './src/components/Checkout.js';
import { formatRupiah } from './src/utils/currency.js';
import products from './src/data/products.js';

document.addEventListener('DOMContentLoaded', () => {
  const productListElement = document.getElementById('product-list');
  const cartItemsElement = document.getElementById('cart-items');
  const totalDisplayElement = document.getElementById('total-display');
  const checkoutBtn = document.getElementById('checkout-btn');

  const checkout = new Checkout();
  const productList = new ProductList(products);

  function updateTotal() {
    totalDisplayElement.textContent = `Total: ${formatRupiah(checkout.getTotal())}`;
  }

  function renderCart() {
    cartItemsElement.innerHTML = '';
    checkout.getCart().forEach((item, i) => {
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <div>${item.name} - ${formatRupiah(item.price)} x ${item.quantity}</div>
        <button class="button remove" data-index="${i}">Hapus</button>
      `;
      cartItemsElement.appendChild(row);
    });
  }

  function downloadReceiptAsTxt(cart, totalUSD) {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const timestamp = `${pad(now.getDate())}${pad(now.getMonth() + 1)}${now.getFullYear()}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

  let content = `=== STRUK PEMBELIAN ===\n`;
  content += `Waktu: ${now.toLocaleString('id-ID')}\n\n`;
  cart.forEach(item => {
    content += `${item.name} x ${item.quantity} @ ${formatRupiah(item.price)}\n`;
  });
  content += `\nTotal: ${formatRupiah(totalUSD)}\n`;
  content += `=======================\n`;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `struk-${timestamp}.txt`; // contoh: struk-20112025-015630.txt
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  }

  function onAddProduct(product) {
    if (product.stock <= 0) return alert('Stok habis');
    checkout.addToCart(product, 1);
    product.stock -= 1;
    productList.render(productListElement, onAddProduct);
    renderCart();
    updateTotal();
  }

  productList.render(productListElement, onAddProduct);
  renderCart();
  updateTotal();

  cartItemsElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
      const idx = Number(e.target.dataset.index);
      const item = checkout.getCart()[idx];
      const prod = products.find(p => p.id === item.id);
      if (prod) prod.stock += item.quantity;
      checkout.removeItem(idx);
      productList.render(productListElement, onAddProduct);
      renderCart();
      updateTotal();
    }
  });

  checkoutBtn.addEventListener('click', () => {
  if (checkout.getCart().length === 0) return alert('Cart kosong');

  const cartSnapshot = [...checkout.getCart()];
  const totalUSD = checkout.getTotal();

  downloadReceiptAsTxt(cartSnapshot, totalUSD);
  checkout.clearCart();
  renderCart();
  updateTotal();
  alert('Checkout selesai. Struk telah diunduh.');
});
});