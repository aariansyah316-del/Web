import { formatRupiah } from '../utils/currency.js';

class ProductList {
    constructor(products) {
        this.products = products || [];
    }

    // render ke container DOM dan pasang callback saat tombol Add diklik
    render(container, onAdd) {
        container.innerHTML = ''; // bersihkan sebelum render ulang
        const fragment = document.createDocumentFragment();

        this.products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product';
            productItem.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description || ''}</p>
                <p class="price">${formatRupiah(product.price)}</p>
                <p class="stock">Stock: ${Number(product.stock || 0)}</p>
                <div class="controls">
                    <button class="button add-to-cart" data-id="${product.id}" ${ (product.stock||0) <= 0 ? 'disabled' : '' }>
                        ${ (product.stock||0) <= 0 ? 'Sold out' : 'Add to Cart' }
                    </button>
                </div>
            `;
            fragment.appendChild(productItem); // <-- penting: tambahkan item ke fragment
        });

        container.appendChild(fragment);

        if (typeof onAdd === 'function') {
            container.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = e.currentTarget.getAttribute('data-id');
                    const product = this.products.find(p => String(p.id) === String(productId));
                    onAdd(product);
                });
            });
        }
        return container;
    }

    addProductToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            console.log(`Added ${product.name} to cart.`);
        } else {
            console.log('Product not found.');
        }
    }
}

export default ProductList;

