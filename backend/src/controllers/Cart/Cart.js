import { requireRole } from '#middleware';
import { cartRepository } from '#services'; 
import HttpStatus from 'http-status-codes';

export async function addToCart(req, res, next) {
    try {
        await requireRole(
            req,
            res,
            next,
            async () => {
                const { userId, productId, quantity } = req.body;
                const { addCartItemAsync } = cartRepository();
                const cartItemId = await addCartItemAsync(userId, productId, quantity);

                res.json({
                    cartItemId: cartItemId
                });
            },
            ['CUSTOMER', 'STAFF'] 
        );
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            path: req.path,
            detailed_error_message: error.message,
            message: 'Cannot add item to cart'
        });
    }
}

export async function listCartItems(req, res, next) {
    try {
        const { userId } = req.params; 
        const { getAllCartItemsAsync } = cartRepository();
        const items = await getAllCartItemsAsync(userId);

        res.json(items);
    } catch (error) {
        next(error);
    }
}

export async function updateCartItem(req, res, next) {
    try {
        await requireRole(
            req,
            res,
            next,
            async () => {
                const { quantity } = req.body;
                const { updateCartItemAsync } = cartRepository();
                await updateCartItemAsync(req.params.id, quantity);

                res.send('OK');
            },
            ['CUSTOMER', 'STAFF'] 
        );
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            path: req.path,
            detailed_error_message: error.message,
            message: 'Cannot update the cart item'
        });
    }
}

export async function removeCartItem(req, res, next) {
    try {
        await requireRole(
            req,
            res,
            next,
            async () => {
                const { removeCartItemAsync } = cartRepository();
                await removeCartItemAsync(req.params.id);

                res.send('OK');
            },
            ['CUSTOMER', 'STAFF'] 
        );
    } catch (error) {
        next(error);
    }
}
