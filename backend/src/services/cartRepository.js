// cartRepository.js
import db from './database'; // Import database connection 

const cartRepository = () => {
    const addCartItemAsync = async (userId, productId, quantity) => {
        const newCartItem = await db.Cart.create({
            userId,
            productId,
            quantity
        });
        return newCartItem.id; // Return the new cart item ID
    };

    const getAllCartItemsAsync = async (userId) => {
        const items = await db.Cart.findAll({
            where: { userId: userId },
            include: [db.Product] //include product details
        });
        return items;
    };

    const updateCartItemAsync = async (cartItemId, quantity) => {
        await db.Cart.update({ quantity }, {
            where: { id: cartItemId }
        });
    };

    const removeCartItemAsync = async (cartItemId) => {
        await db.Cart.destroy({
            where: { id: cartItemId }
        });
    };

    return {
        addCartItemAsync,
        getAllCartItemsAsync,
        updateCartItemAsync,
        removeCartItemAsync
    };
};

export default cartRepository;
