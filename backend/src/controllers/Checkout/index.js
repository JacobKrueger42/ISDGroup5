const express = require('express');
const router = express.Router();
const { processCheckout } = require('../services/CheckoutService');


// POST /api/checkout
const checkout = async (req, res) => {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid items' });
    }

    try {
        const result = await processCheckout(items);
        res.json(result);
    } catch (error) {
        console.error('Checkout failed:', error);
        res.status(500).json({ success: false, message: 'Checkout failed' });
    }
};

module.exports = { checkout };