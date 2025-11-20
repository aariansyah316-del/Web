const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// endpoint untuk decrement stock di products.json
app.post('/decrement-stock', (req, res) => {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const jsonFile = path.join(__dirname, '..', 'src', 'data', 'products.json');
    if (!fs.existsSync(jsonFile)) return res.status(500).json({ ok: false, message: 'products.json not found' });

    const products = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    // cek dan update
    for (const it of items) {
        const prod = products.find(p => String(p.id) === String(it.id));
        if (!prod) return res.status(404).json({ ok: false, message: `Item not found: ${it.id}` });
        const qty = Number(it.quantity) || 1;
        if ((prod.stock || 0) < qty) return res.status(400).json({ ok: false, message: `Insufficient stock for ${prod.name}` });
        prod.stock = Math.max(0, (prod.stock || 0) - qty);
    }
    fs.writeFileSync(jsonFile, JSON.stringify(products, null, 4), 'utf8');
    return res.json({ ok: true, updated: items });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));