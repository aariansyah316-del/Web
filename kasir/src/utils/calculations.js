export function calculateTotal(items = []) {
    return (items || []).reduce((sum, item) => {
        const qty = Number(item.quantity) || 1;
        const price = Number(item.price) || 0;
        return sum + price * qty;
    }, 0);
}

export function calculateDiscount(total, discountPercentage) {
    const pct = Number(discountPercentage) || 0;
    return total - (total * (pct / 100));
}

export function calculateTax(total, taxPercentage) {
    const pct = Number(taxPercentage) || 0;
    return total * (pct / 100);
}

export function calculateFinalAmount(total, discountPercentage, taxPercentage) {
    const discountedTotal = calculateDiscount(total, discountPercentage);
    const taxAmount = calculateTax(discountedTotal, taxPercentage);
    return discountedTotal + taxAmount;
}