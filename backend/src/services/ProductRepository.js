import { prisma } from '#services';
import { isNullOrEmpty } from './StringUtils.js';

export default function productRepository() {
    ////////////////////////
    // lifecycle
    ////////////////////////

    function insertProductAsync(uniqueProductCode, name, brandName) {
        return prisma.product
            .create({
                data: {
                    uniqueProductCode: uniqueProductCode,
                    name: name,
                    brandName: brandName
                }
            })
            .catch(error => {
                console.error('error creating product: ', error);
            });
    }

    async function editProductNameAsync(id, name) {
        return prisma.product
            .update({
                where: {
                    id: id
                },
                data: {
                    name: name
                }
            })
            .catch(error =>
                console.error(`error updating product '${id}':`, error)
            );
    }

    async function editProductBrandNameAsync(id, brandName) {
        return prisma.product
            .update({
                where: {
                    id: id
                },
                data: {
                    brandName: brandName
                }
            })
            .catch(error =>
                console.error(`error updating product '${id}':`, error)
            );
    }

    async function editProductCatalogueAsync(id, catalogue) {
        return prisma.product
            .update({
                where: {
                    id: id
                },
                data: {
                    catalogue: catalogue
                }
            })
            .catch(error =>
                console.error(`error updating product '${id}':`, error)
            );
    }

    async function deleteProductAsync(id) {
        await getProductByIdAsync(id);

        return prisma.product
            .delete({
                where: {
                    id: id
                }
            })
            .catch(error =>
                console.error(`error deleting product '${id}':`, error)
            );
    }

    function getProductByIdAsync(id) {
        return prisma.product.findUnique({
            where: {
                id: id
            }
        });
    }

    function getProductByUniqueProductCodeAsync(uniqueProductCode) {
        return prisma.product.findUnique({
            where: {
                uniqueProductCode: uniqueProductCode
            }
        });
    }

    ////////////////////////
    // workflow
    ////////////////////////

    async function createProductAsync(uniqueProductCode, name, brandName) {
        if (
            isNullOrEmpty(uniqueProductCode) ||
            isNullOrEmpty(name) ||
            isNullOrEmpty(brandName)
        ) {
            throw new Error(
                'a UPC, name, and brand name must be provided to create a new product'
            );
        }

        // trim inputs and normalise inputs
        const _uniqueProductCode = uniqueProductCode.trim().toUpperCase();
        const _name = name.trim().toLowerCase();
        const _brandName = brandName.trim().toLowerCase();

        if (_uniqueProductCode.length !== 12)
            throw new Error('a UPC must be 12 characters');

        validateNameAndBrandNameDiffer(_name, _brandName);

        // check for an existing UPC - it should be unique
        const existing =
            await getProductByUniqueProductCodeAsync(_uniqueProductCode);

        if (existing)
            throw new Error(
                `a product with this UPC already exists (${_uniqueProductCode})`
            );

        const result = await insertProductAsync(
            _uniqueProductCode,
            _name,
            _brandName
        );

        console.log(`created product with result: `, result);
        // TODO: generate access log
    }

    async function updateProductAsync(id, name, brandName, catalogueId) {
        if (isNullOrEmpty(id))
            throw new Error('an id must be provided to update a product');

        const existing = await getProductByIdAsync(id);

        if (!existing) throw new Error(`cannot find a product with id '${id}'`);

        // both are being updated compare and validate inputs before updating
        if (!isNullOrEmpty(name) && isNullOrEmpty(brandName)) {
            const _name = name.trim().toLowerCase();
            const _brandName = brandName.trim().toLowerCase();
            validateNameAndBrandNameDiffer(_name, _brandName);
        }

        // update each field that may have changed
        if (name) {
            const _name = name.trim().toLowerCase();
            validateNameAndBrandNameDiffer(_name, existing.brandName);

            if (_name === '') {
                throw new Error(
                    "cannot remove a product's name, a valid name must be provided"
                );
            }

            await editProductNameAsync(id, _name);
            // TODO: generate access log
        }

        if (brandName) {
            const _brandName = brandName.trim().toLowerCase();
            validateNameAndBrandNameDiffer(existing.name, _brandName);

            if (_brandName === '') {
                throw new Error(
                    "cannot remove a product's brand name, a valid brand name must be provided"
                );
            }

            await editProductBrandNameAsync(id, _brandName);
            // TODO: generate access log
        }

        if (catalogueId) {
            throw new Error('not implemented');
            // await editProductCatalogueAsync(id, catalogueId);
            // TODO: generate access log
        }
    }

    async function removeProductAsync(id) {
        if (isNullOrEmpty(id))
            throw new Error('an id must be provided to delete a product');

        await deleteProductAsync(id);

        // TODO: generate access log
        console.log(`deleted product with id '${id}'`);
    }

    function validateNameAndBrandNameDiffer(name, brandName) {
        if (name === brandName) {
            throw new Error(
                "the product name should not be the same as the brand name (check you haven't made a typeo"
            );
        }
    }

    return {
        createProductAsync,
        removeProductAsync,
        updateProductAsync
    };
}
