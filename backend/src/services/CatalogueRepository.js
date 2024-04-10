import { prisma } from '#services';
import { productRepository } from '#services';
import { isNullOrEmpty } from './StringUtils.js';

export default function catalogueRepository() {
    const { getProductByIdAsync } = productRepository();
    ////////////////////////
    // lifecycle
    ////////////////////////

    function insertCatalogueEntryAsync(
        productId,
        uniqueProductCode,
        price,
        productCategory,
        stockQuantity
    ) {
        return prisma.catalogueEntry
            .create({
                data: {
                    productId: productId,
                    uniqueProductCode: uniqueProductCode,
                    price: Number(price),
                    productCategory: productCategory,
                    stockQuantity: Number(stockQuantity)
                }
            })
            .catch(error => {
                console.error('error creating catalogue entry: ', error);
            });
    }

    function editCatalogueEntryPriceAsync({ id, price }) {
        return prisma.catalogueEntry
            .update({
                where: { id: Number(id) },
                data: { price: Number(price) }
            })
            .catch(error =>
                console.error(`error updating catalogue entry '${id}':`, error)
            );
    }

    function editCatalogueEntryQuantityAsync({ id, stockQuantity }) {
        return prisma.catalogueEntry
            .update({
                where: { id: Number(id) },
                data: { stockQuantity: Number(stockQuantity) }
            })
            .catch(error =>
                console.error(`error updating catalogue entry '${id}':`, error)
            );
    }

    function editCatalogueEntryCategoryAsync({ id, category }) {
        return prisma.catalogueEntry
            .update({
                where: { id: Number(id) },
                data: { category: category }
            })
            .catch(error =>
                console.error(`error updating catalogue entry '${id}':`, error)
            );
    }

    async function deleteCatalogueEntryAsync(id) {
        await getCatalogueEntryByIdAsync(id);

        try {
            return await prisma.catalogueEntry.delete({
                where: {
                    id: Number(id)
                }
            });
        } catch (error) {
            return console.error(
                `error deleting catalogue entry '${id}':`,
                error
            );
        }
    }

    function getCatalogueEntryByIdAsync(id) {
        if (isNullOrEmpty(id))
            throw new Error('no id provided to get catalogue entry');
        return prisma.catalogueEntry.findUnique({
            where: {
                id: Number(id)
            }
        });
    }

    function getAllCatalogueEntryAsync(skip, take) {
        if (
            skip === undefined ||
            take === undefined ||
            skip === null ||
            take === null
        )
            throw new Error('"skip" and "take" must be defined');

        if (skip < 0) throw new Error('"skip" value must be at least 0');
        if (take < 1) throw new Error('"take" value must be at least 1');

        return prisma.catalogueEntry.findMany({
            skip: skip,
            take: take,
            orderBy: {
                name: 'desc'
            }
        });
    }

    function getTotalCatalogueEntryCount() {
        return prisma.catalogueEntry.count();
    }

    ////////////////////////
    // workflow
    ////////////////////////

    async function createCatalogueEntryAsync({
        productId,
        price,
        productCategory,
        stockQuantity
    }) {
        if (isNullOrEmpty(productId))
            throw new Error('an id must be provided to find a catalogue entry');

        const existing = await getProductByIdAsync(id);

        if (!existing)
            throw new Error(
                `cannot create a catalogue entry without a product (product '${id}' not found)`
            );

        if (price < 0)
            throw new Error(
                "cannot price a product's catalogue entry below 0$"
            );

        if (stockQuantity < 0) throw new Error('cannot create negative stock');

        if (isNullOrEmpty(productCategory))
            throw new Error('must provide a category');

        await insertCatalogueEntryAsync({
            productId,
            // copy existing field in for easier searching
            uniqueProductCode: existing.uniqueProductCode,
            price,
            productCategory,
            stockQuantity
        });

        // TODO: generate access log
        console.log(`created catalogue entry for product '${productId}'`);
    }

    async function updateCatalogueEntryAsync(
        id,
        price,
        stockQuantity,
        category
    ) {
        if (isNullOrEmpty(id))
            throw new Error(
                'an id must be provided to update a catalogue entry'
            );

        const existing = await getCatalogueEntryByIdAsync(id);

        if (!existing)
            throw new Error(
                `cannot create a catalogue entry without a product (product '${id}' not found)`
            );

        // update each field that may have changed
        if (price) {
            if (price < 0)
                throw new Error(
                    "cannot price a product's catalogue entry below 0$"
                );
            await editCatalogueEntryPriceAsync(id, price);
            // TODO: generate access log
        }

        if (stockQuantity) {
            if (stockQuantity < 0)
                throw new Error('cannot create negative stock');
            await editCatalogueEntryQuantityAsync(id, stockQuantity);
            // TODO: generate access log
        }

        if (category) {
            await editCatalogueEntryCategoryAsync(id, catalogueId);
            // TODO: generate access log
        }

        // log an update to the console if any field changed
        (price || quantity || category) &&
            console.log(`updated catalogue entry with id '${id}'`);
    }

    return {
        deleteCatalogueEntryAsync,
        getCatalogueEntryByIdAsync,
        createCatalogueEntryAsync,
        updateCatalogueEntryAsync,
        getTotalCatalogueEntryCount,
        getAllCatalogueEntryAsync
    };
}
