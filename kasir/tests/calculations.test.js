// filepath: c:\Users\ADVAN\Desktop\coding\website\project\kasir\tests\calculations.test.js

import { calculateTotal, applyDiscount, calculateTax } from '../src/utils/calculations';

describe('Calculations Utility Functions', () => {
    test('calculateTotal should return the correct total for an array of prices', () => {
        const prices = [10.00, 20.00, 5.00];
        const total = calculateTotal(prices);
        expect(total).toBe(35.00);
    });

    test('applyDiscount should correctly apply a discount', () => {
        const total = 100.00;
        const discount = 10; // 10%
        const discountedTotal = applyDiscount(total, discount);
        expect(discountedTotal).toBe(90.00);
    });

    test('calculateTax should return the correct tax amount', () => {
        const total = 100.00;
        const taxRate = 0.07; // 7%
        const tax = calculateTax(total, taxRate);
        expect(tax).toBe(7.00);
    });
});