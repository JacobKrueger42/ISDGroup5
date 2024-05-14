import { prisma } from '#services';
import { productRepository } from '#services';
import { isNullOrEmpty } from './StringUtils.js';
import CatalogueProductEntryMapper from './CatalogueProductEntryMapper.js';

export default function catalogueRepository() {
    const { getProductByIdAsync } = productRepository();
    ////////////////////////
    // lifecycle
    ////////////////////////

    function insertCatalogueEntryAsync({
        productId,
        uniqueProductCode,
        price,
        productCategory,
        stockQuantity
    }) {
        return prisma.catalogueEntry
            .create({
                data: {
                    productId: productId,
                    uniqueProductCode: uniqueProductCode,
                    price: Number(price),
                    productCategory: productCategory,
                    stockQuantity: Number(stockQuantity),
                    isArchived: false
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

    // TODO: make this a soft delete for data integrity of order system
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

    async function getAllCatalogueProductEntriesAsync(skip, take) {
        if (
            skip === undefined ||
            take === undefined ||
            skip === null ||
            take === null
        )
            throw new Error('"skip" and "take" must be defined');

        if (skip < 0) throw new Error('"skip" value must be at least 0');
        if (take < 1) throw new Error('"take" value must be at least 1');

        const results = await prisma.catalogueEntry.findMany({
            skip: skip,
            take: take,
            where: {
                isArchived: false
            },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        brandName: true,
                        description: true
                    }
                }
            },
            orderBy: {
                uniqueProductCode: 'desc'
            }
        });

        return results.map(r => CatalogueProductEntryMapper(r));
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

        const existing = await getProductByIdAsync(productId);

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
    }

    async function updateCatalogueEntryAsync({
        id,
        price,
        stockQuantity,
        category
    }) {
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
            await editCatalogueEntryPriceAsync({ id, price });
        }

        if (stockQuantity) {
            if (stockQuantity < 0)
                throw new Error('cannot create negative stock');
            await editCatalogueEntryQuantityAsync({ id, stockQuantity });
        }

        if (category) {
            await editCatalogueEntryCategoryAsync({ id, catalogueId });
        }
    }

    async function removeCatalogueEntryAsync(id) {
        if (isNullOrEmpty(id))
            throw new Error(
                'an id must be provided to delete a catalogue entry'
            );

        await deleteCatalogueEntryAsync(id);
    }

    return {
        removeCatalogueEntryAsync,
        getCatalogueEntryByIdAsync,
        createCatalogueEntryAsync,
        updateCatalogueEntryAsync,
        getTotalCatalogueEntryCount,
        getAllCatalogueProductEntriesAsync
    };
}
