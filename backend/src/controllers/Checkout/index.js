import { requireRole } from '#middleware';
import { checkoutService } from '#services';
import { ServerOptions } from '#configuration';

export async function create(req, res) {
    try {
        await requireRole(
            req,
            res,
            next,
            async () => {
                const { items } = req.body;
                if (!items || !Array.isArray(items) || items.length === 0)
                    throw new Error('Invalid items for checkout');

                const { processCheckout } = checkoutService();
                const result = await processCheckout(items);
                return res.json(result);
            },
            ['CUSTOMER']
        );
    } catch (error) {
        ServerOptions.verbose && console.error('Checkout failed:', error);
        next(error);
    }
}
