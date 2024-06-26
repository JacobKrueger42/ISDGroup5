import { requireRole } from '#middleware';
import { catalogueRepository } from '#services';
import HttpStatus from 'http-status-codes';

// paginated
// not to be confused with product!
export async function list(req, res, next) {
    try {
        // default to the first 25 results
        const pageNumber = req.query.pageNumber ?? 0;
        const take = req.query.take ?? 25;
        const skip = pageNumber * take;

        const {
            getAllCatalogueProductEntriesAsync,
            getTotalCatalogueEntryCount
        } = catalogueRepository();

        const items = await getAllCatalogueProductEntriesAsync(
            Number(skip),
            Number(take)
        );
        const total = await getTotalCatalogueEntryCount();

        return res.json({
            results: items,
            totalCount: total
        });
    } catch (error) {
        next(error);
    }
}

export async function detail(req, res, next) {
    try {
        const { getCatalogueEntryByIdAsync } = catalogueRepository();
        const catalogueEntry = await getCatalogueEntryByIdAsync(req.params.id);
        return res.json(catalogueEntry);
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
                const { productId, price, productCategory, stockQuantity } =
                    req.body;

                const { createCatalogueEntryAsync } = catalogueRepository();
                const catalogueEntryId = await createCatalogueEntryAsync({
                    productId,
                    price,
                    productCategory,
                    stockQuantity
                });

                res.json({
                    catalogueEntryId: catalogueEntryId
                });
            },
            ['STAFF', 'ADMIN']
        );
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            path: req.path,
            detailed_error_message: error.message,
            message: 'Cannot create a catalogue entry with the given details'
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
                const { price, stockQuantity, category, isArchived } = req.body;
                const { updateCatalogueEntryAsync, removeCatalogueEntryAsync } =
                    catalogueRepository();

                if (isArchived) {
                    removeCatalogueEntryAsync(req.params.id);
                } else {
                    await updateCatalogueEntryAsync({
                        id: req.params.id,
                        price,
                        stockQuantity,
                        category
                    });
                }

                res.send('OK');
            },
            ['STAFF', 'ADMIN']
        );
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            path: req.path,
            detailed_error_message: error.message,
            message: 'Cannot update the catalogue entry with the given details'
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
                const { removeCatalogueEntryAsync } = catalogueRepository();
                await removeCatalogueEntryAsync(req.params.id);

                res.send('OK');
            },
            ['STAFF', 'ADMIN']
        );
    } catch (error) {
        next(error);
    }
}
