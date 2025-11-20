export const USD_TO_IDR = 16000;

export function formatRupiah(amountUSD, opts = { minimumFractionDigits: 0, maximumFractionDigits: 0 }) {
    // amountUSD: nilai dalam USD (angka)
    const n = Number(amountUSD) || 0;
    const idr = n * USD_TO_IDR;
    return 'Rp ' + idr.toLocaleString('id-ID', opts);
}

export function parseNumber(input) {
    if (input == null) return 0;
    const s = String(input).replace(/[^\d,-]/g, '').replace(',', '.');
    const v = Number(s);
    return Number.isFinite(v) ? v : 0;
}

// parse string rupiah (mis. "Rp 32.000") -> return number in IDR
export function parseRupiahInputToIDR(input) {
    return parseNumber(input);
}

// parse string rupiah -> return number in USD (untuk dibandingkan dengan totals yang disimpan dalam USD)
export function parseRupiahInputToUSD(input) {
    const idr = parseRupiahInputToIDR(input);
    return idr / USD_TO_IDR;
}