import {jest} from '@jest/globals'
import { checkoutService } from '#services';

describe('checkoutService', () => {
    let service;

    beforeEach(() => {
        service = checkoutService();
    });

    test('should validate items correctly', async () => {
        // Arrange
        const items = [
            { productId: 'prod_1', quantity: 2 },
            { productId: 'prod_2', quantity: 0 }, // Invalid item
        ];

        // Act and Assert
        await expect(service.processCheckout(items)).rejects.toThrow(
            'Validation failed: Invalid item: {"productId":"prod_2","quantity":0}'
        );
    });

    test('should process payment successfully', async () => {
        // Arrange
        const items = [{ productId: 'prod_1', quantity: 2 }];

        // Act
        const result = await service.processCheckout(items);

        // Assert
        expect(result.success).toBe(true);
        expect(result.message).toBe('Checkout successful');
        expect(result.orderId).toBeDefined();
    });

    // test('should throw error when payment processing fails', async () => {
    //     // Arrange
    //     const items = [{ productId: 'prod_1', quantity: 2 }];

    //     // Mocking processPayment to fail
    //     service.processPayment = jest.fn().mockResolvedValue({ success: false });

    //     // Act and Assert
    //     await expect(service.processCheckout(items)).rejects.toThrow(
    //         'Payment processing failed'
    //     );
    // });

    test('should update inventory successfully', async () => {
        // Arrange
        const items = [{ productId: 'prod_1', quantity: 2 }];

        // Act
        const result = await service.processCheckout(items);

        // Assert
        expect(result.success).toBe(true);
    });

    test('should create order record successfully', async () => {
        // Arrange
        const items = [{ productId: 'prod_1', quantity: 2 }];

        // Act
        const result = await service.processCheckout(items);

        // Assert
        expect(result.orderId).toBeDefined();
    });

    test('should handle successful checkout process', async () => {
        // Arrange
        const items = [{ productId: 'prod_1', quantity: 2 }];

        // Act
        const result = await service.processCheckout(items);

        // Assert
        expect(result).toEqual({
            success: true,
            message: 'Checkout successful',
            orderId: expect.any(String),
        });
    });

    test('should handle validation errors', async () => {
        // Arrange
        const items = [{ productId: '', quantity: 2 }]; // Invalid item

        // Act and Assert
        await expect(service.processCheckout(items)).rejects.toThrow(
            'Validation failed: Invalid item: {"productId":"","quantity":2}'
        );
    });

    // test('should handle payment processing failure', async () => {
    //     // Arrange
    //     const items = [{ productId: 'prod_1', quantity: 2 }];

    //     // Mocking processPayment to fail
    //     service.processPayment = jest.fn().mockResolvedValue({ success: false });

    //     // Act and Assert
    //     await expect(service.processCheckout(items)).rejects.toThrow(
    //         'Payment processing failed'
    //     );
    // });
});
