import express from 'express';
import OrderService from '../services/OrderService';
import { requireAuth } from '../middleware';

const router = express.Router();

router.post('/create', requireAuth, async (req, res) => {
    const { items, totalAmount } = req.body;
    const userId = req.user.id;

    try {
        const order = await OrderService.createOrder(userId, items, totalAmount);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order', error });
    }
});

router.get('/:orderId', requireAuth, async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await OrderService.getOrderById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch order', error });
    }
});

router.get('/user/:userId', requireAuth, async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await OrderService.getOrdersByUserId(userId);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error });
    }
});

router.put('/:orderId/status', requireAuth, async (req, res) => {
    const { orderId } = req.params;
    const { status, trackingNumber } = req.body;

    try {
        const order = await OrderService.updateOrderStatus(orderId, status, trackingNumber);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order status', error });
    }
});

router.post('/search', requireAuth, async (req, res) => {
    const searchCriteria = req.body;

    try {
        const orders = await OrderService.searchOrders(searchCriteria);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to search orders', error });
    }
});

export default router;