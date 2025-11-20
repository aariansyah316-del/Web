import { formatRupiah } from '../utils/currency.js';

class POSDisplay {
    constructor() {
        this.items = [];
        this.total = 0;
    }

    addItem(item) {
        this.items.push(item);
        this.updateTotal();
    }

    updateTotal() {
        this.total = this.items.reduce((s, it) => s + (Number(it.price)||0) * (Number(it.quantity)||1), 0);
    }

    render(container) {
        if (!container) return;
        container.innerHTML = '';
        this.items.forEach(it => {
            const el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML = `<div class="meta"><div class="name">${it.name}</div><div class="meta-sub">${formatRupiah(it.price)} x ${it.quantity}</div></div>`;
            container.appendChild(el);
        });
        const totalEl = document.getElementById('total-display');
        if (totalEl) totalEl.textContent = `Total: ${formatRupiah(this.total)}`;
    }
}

export default POSDisplay;