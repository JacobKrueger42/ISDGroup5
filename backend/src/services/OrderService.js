import prisma from '../prisma/client';

const createOrder = async (userId, items, totalAmount) => {
    const order = await prisma.order.create({
        data: {
            userId,
            status: 'PENDING_SHIPPING',
            orderItems: {
                create: items.map(item => ({
                    unitQuantity: item.quantity,
                    unitCost: item.price,
                    catalogueEntryId: item.catalogueEntryId
                }))
            },
            paymentConfirmation: {
                create: {
                    amount: totalAmount,
                    confirmedAt: new Date(),
                    reference: 'fake_reference', // Fake reference for simplicity
                    provider: 'FakeProvider',
                    method: 'Credit Card',
                    status: 'CONFIRMED'
                }
            }
        },
        include: {
            orderItems: true,
            paymentConfirmation: true
        }
    });
    return order;
};

const getOrderById = async (orderId) => {
    return prisma.order.findUnique({
        where: { id: orderId },
        include: {
            orderItems: true,
            paymentConfirmation: true,
            shippingDetail: true
        }
    });
};

const getOrdersByUserId = async (userId) => {
    return prisma.order.findMany({
        where: { userId },
        include: {
            orderItems: true,
            paymentConfirmation: true,
            shippingDetail: true
        }
    });
};

const updateOrderStatus = async (orderId, status, trackingNumber) => {
    const order = await prisma.order.update({
        where: { id: orderId },
        data: {
            status,
            shippingDetail: trackingNumber ? {
                update: {
                    trackingId: trackingNumber
                }
            } : undefined
        },
        include: {
            orderItems: true,
            paymentConfirmation: true,
            shippingDetail: true
        }
    });
    return order;
};

const searchOrders = async (searchCriteria) => {
    const { orderNumber, startDate, endDate } = searchCriteria;
    const where = {};

    if (orderNumber) {
        where.id = parseInt(orderNumber, 10);
    }

    if (startDate && endDate) {
        where.createdAt = {
            gte: new Date(startDate),
            lte: new Date(endDate)
        };
    }

    return prisma.order.findMany({
        where,
        include: {
            orderItems: true,
            paymentConfirmation: true,
            shippingDetail: true
        }
    });
};

export default {
    createOrder,
    getOrderById,
    getOrdersByUserId,
    updateOrderStatus,
    searchOrders
};