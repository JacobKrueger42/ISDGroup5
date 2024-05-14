import { requireRole } from '#middleware';
import { productRepository } from '#services';
import HttpStatus from 'http-status-codes';

// paginated
// not to be confused with catalogue!
export async function list(req, res, next) {
    try {
        await requireRole(
            req,
            res,
            next,
            async () => {
                // default to the first 25 results
                const pageNumber = req.query.pageNumber ?? 0;
                const take = req.query.take ?? 25;
                const skip = pageNumber * take;

                const { getAllProductsAsync, getTotalProductsCount } =
                    productRepository();
                const products = await getAllProductsAsync(
                    Number(skip),
                    Number(take)
                );

                const total = await getTotalProductsCount();

                return res.json({
                    results: products,
                    totalCount: total
                });
            },
            ['STAFF', 'ADMIN']
        );
    } catch (error) {
        next(error);
    }
}

export async function detail(req, res, next) {
    try {
        await requireRole(
            req,
            res,
            next,
            async () => {
                const { getProductByIdAsync } = productRepository();
                const product = await getProductByIdAsync(req.query.id);
                return res.json(product);
            },
            ['STAFF', 'ADMIN']
        );
    } catch (error) {
        next(error);
    }
}

export async function create(req, res, next) {
    try {
        await requireRole(
            req,
            res,
            next,
            async () => {
                const { uniqueProductCode, name, brandName, description } =
                    req.body;

                const { createProductAsync } = productRepository();
                const productId = await createProductAsync(
                    uniqueProductCode,
                    name,
                    brandName,
                    description
                );

                res.json({
                    productId: productId
                });
            },
            ['STAFF', 'ADMIN']
        );
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            path: req.path,
            detailed_error_message: error.message,
            message: 'Cannot create a product with the given details'
        });
    }
}

export async function update(req, res, next) {
    try {
        await requireRole(
            req,
            res,
            next,
            async () => {
                const { name, brandName, description } = req.body;
                const { updateProductAsync } = productRepository();
                await updateProductAsync(
                    req.params.id,
                    name,
                    brandName,
                    description
                );

                res.send('OK');
            },
            ['STAFF', 'ADMIN']
        );
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            path: req.path,
            detailed_error_message: error.message,
            message: 'Cannot update the product with the given details'
        });
    }
}

export async function remove(req, res, next) {
    try {
        await requireRole(
            req,
            res,
            next,
            async () => {
                const { removeProductAsync } = productRepository();
                await removeProductAsync(req.params.id);

                res.send('OK');
            },
            ['STAFF', 'ADMIN']
        );
    } catch (error) {
        next(error);
    }
}
