import initialProducts from '../../kasir/src/data/products.js';

const form = document.getElementById('add-product-form');
const list = document.getElementById('product-list');
const resetBtn = document.getElementById('reset-products');

// Ambil dari localStorage atau gunakan data awal
let stored = localStorage.getItem('products');
let products = stored ? JSON.parse(stored) : [...initialProducts];

// Simpan ke localStorage
function saveProducts() {
  localStorage.setItem('products', JSON.stringify(products));
}

// Tampilkan daftar produk
function renderProducts() {
  list.innerHTML = '';
  products.forEach((p, index) => {
    const item = document.createElement('li');
    item.innerHTML = `
      <strong>${p.name}</strong> - Rp${p.price} (${p.stock} stok)<br>
      <em>${p.description}</em><br>
      <button onclick="editProduct(${index})">Edit</button>
      <button onclick="deleteProduct(${index})">Hapus</button>
    `;
    list.appendChild(item);
  });
}

// Tambah produk baru
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const price = parseFloat(document.getElementById('price').value);
  const description = document.getElementById('description').value;
  const stock = parseInt(document.getElementById('stock').value);

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    description,
    stock
  };

  products.push(newProduct);
  saveProducts();
  renderProducts();
  form.reset();
});

// Edit produk
window.editProduct = function(index) {
  const p = products[index];
  document.getElementById('name').value = p.name;
  document.getElementById('price').value = p.price;
  document.getElementById('description').value = p.description;
  document.getElementById('stock').value = p.stock;

  form.onsubmit = function (e) {
    e.preventDefault();
    p.name = document.getElementById('name').value;
    p.price = parseFloat(document.getElementById('price').value);
    p.description = document.getElementById('description').value;
    p.stock = parseInt(document.getElementById('stock').value);
    saveProducts();
    renderProducts();
    form.reset();
    form.onsubmit = defaultSubmit;
  };
};

// Hapus produk
window.deleteProduct = function(index) {
  products.splice(index, 1);
  saveProducts();
  renderProducts();
};

// Reset ke data awal
resetBtn.addEventListener('click', () => {
  products = [...initialProducts];
  saveProducts();
  renderProducts();
});

// Simpan fungsi submit awal
const defaultSubmit = form.onsubmit;

// Tampilkan produk saat halaman dimuat
renderProducts();