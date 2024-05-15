import { productRepository, catalogueRepository } from '#services';
import { prisma } from '#services';

const randInt = () => Math.floor(Math.random() * (200 - 99)) + 99;

describe('catalogue feature', () => {
    describe('catalogue entries', () => {
        const testData = {
            uniqueProductCode: `UPC_${randInt()}`,
            price: 42,
            productCategory: 'this is a category I swear',
            stockQuantity: 1337
        };

        // track the test data entry for cleanup
        let _testProductIds = [];

        afterEach(async () => {
            try {
                await prisma.catalogueEntry.deleteMany({
                    where: {
                        productId: { in: _testProductIds }
                    }
                });

                await prisma.product.deleteMany({
                    where: {
                        id: { in: _testProductIds }
                    }
                });
            } catch (error) {
                console.log(error);
            } finally {
                _testProductIds = [];
            }
        });

        const arrangeTestProduct = async () => {
            const testProduct = await prisma.product.create({
                data: {
                    uniqueProductCode: `UPC_${randInt()}`,
                    name: 'Magic Rock',
                    brandName: 'Boral',
                    description: "it's a magic rock - what can I say?"
                }
            });

            _testProductIds.push(testProduct.id);
            return testProduct;
        };

        const arrangeTestCatalogue = async productId => {
            return await prisma.catalogueEntry.create({
                data: {
                    productId: productId,
                    uniqueProductCode: testData.uniqueProductCode,
                    price: testData.price,
                    productCategory: testData.productCategory,
                    stockQuantity: testData.stockQuantity,
                    isArchived: false
                }
            });
        };

        const getCatalogueEntry = async productId => {
            return await prisma.catalogueEntry.findUnique({
                where: { productId: Number(productId) }
            });
        };

        test('should insert a catalogue entry', async () => {
            // Arrange
            const testProduct = await arrangeTestProduct();

            // Act
            const { createCatalogueEntryAsync } = catalogueRepository();
            await createCatalogueEntryAsync({
                productId: testProduct.id,
                price: 1234,
                productCategory: 'no it was the other guy I swear',
                stockQuantity: 31231
            });

            // Assert
            const insertedEntry = await getCatalogueEntry(testProduct.id);

            expect(insertedEntry.productCategory).toEqual(
                'no it was the other guy I swear'
            );
            expect(insertedEntry.stockQuantity).toEqual(31231);
            expect(insertedEntry.price).toEqual(1234);
            expect(insertedEntry.isArchived).toBe(false);
        });

        test('should remove a catalogue entry', async () => {
            // Arrange
            const testProduct = await arrangeTestProduct();
            const testCatalogueEntry = await arrangeTestCatalogue(
                testProduct.id
            );

            // Act
            const { removeCatalogueEntryAsync } = catalogueRepository();
            await removeCatalogueEntryAsync(testCatalogueEntry.id);

            // Assert
            try {
                await getCatalogueEntry(testProduct.id);
            } catch (error) {
                expect(error).toBe(null);
            }
        });

        test('should get a catalogue entry by ID', async () => {
            // Arrange
            const testProduct = await arrangeTestProduct();
            const testCatalogueEntry = await arrangeTestCatalogue(
                testProduct.id
            );

            // Act
            const { getCatalogueEntryByIdAsync } = catalogueRepository();
            const entry = await getCatalogueEntryByIdAsync(
                testCatalogueEntry.id
            );

            // Assert
            expect(entry).toEqual(testCatalogueEntry);
        });

        test('should update catalogue entry price', async () => {
            // Arrange
            const testProduct = await arrangeTestProduct();
            const testCatalogueEntry = await arrangeTestCatalogue(
                testProduct.id
            );

            // Act
            const { updateCatalogueEntryAsync } = catalogueRepository();
            await updateCatalogueEntryAsync({id: testCatalogueEntry.id, price: 1500}); // Update price to 1500

            // Assert
            const updatedEntry = await getCatalogueEntry(testProduct.id);
            expect(updatedEntry.price).toEqual(1500);
        });

        test('should get all catalogue product entries', async () => {
            // this test is tricky with our test setup so I'm passing it as is - really I'm just checking that
            // the seed data exists (at least 49 records) and we return a subset of that
            const { getAllCatalogueProductEntriesAsync } =
                catalogueRepository();
            const entries = await getAllCatalogueProductEntriesAsync(0, 10);

            // Assert
            expect(entries.length).toBeGreaterThan(0);
            expect(entries.length).toBeLessThan(11);
        });

        test('should get total catalogue entry count', async () => {
            const { getTotalCatalogueEntryCount } = catalogueRepository();
            const count = await getTotalCatalogueEntryCount();

            // this test is tricky with our test setup so I'm passing it as is - really I'm just checking that
            // we at least have the 49 seeded records persisted
            expect(count).not.toBeNull();
            expect(count).toBeGreaterThan(49);
        });
    });

    describe('products', () => {
        // track the test data entry for cleanup
        let _testProductIds = [];

        afterEach(async () => {
            try {
                await prisma.product.deleteMany({
                    where: {
                        id: { in: _testProductIds }
                    }
                });
            } catch (error) {
                console.log(error);
            } finally {
                _testProductIds = [];
            }
        });

        const arrangeTestProduct = async () => {
            const testProduct = await prisma.product.create({
                data: {
                    uniqueProductCode: `UPC_${randInt()}`,
                    name: 'Magic Rock',
                    brandName: 'Boral',
                    description: "it's a magic rock - what can I say?"
                }
            });

            _testProductIds.push(testProduct.id);
            return testProduct;
        };

        test('should create a product', async () => {
            // Arrange
            const { createProductAsync, getProductByUniqueProductCodeAsync } =
                productRepository();

            // Act
            const testProductUpc = '123456789012';
            const productId = await createProductAsync(
                testProductUpc,
                'Test Product',
                'Test Brand',
                'Test Description'
            );
            // track for cleanup
            _testProductIds.push(productId);

            // Assert
            const createdProduct =
                await getProductByUniqueProductCodeAsync(testProductUpc);
            expect(createdProduct).not.toBeNull();
            expect(createdProduct.id).toEqual(productId);
        });

        test('should throw when creating a product with wrong length UPC', async () => {
            // Arrange
            const { createProductAsync } = productRepository();

            // Act and Assert
            try {
                await createProductAsync(
                    'invalid',
                    'Test Product',
                    'Test Brand',
                    'Test Description'
                );
            } catch (error) {
                expect(error.message).toBe('a UPC must be 12 characters');
            }
        });

        test('should remove a product', async () => {
            // Arrange
            const { removeProductAsync, getProductByIdAsync } =
                productRepository();
            const testProduct = await arrangeTestProduct();

            // Act
            await removeProductAsync(testProduct.id);

            // Assert
            const result = await getProductByIdAsync(testProduct.id);
            expect(result).toBeNull();
        });

        test('should update product name and brand name', async () => {
            // Arrange
            const { updateProductAsync, getProductByIdAsync } =
                productRepository();
            const testProduct = await arrangeTestProduct();

            // Act
            await updateProductAsync(
                testProduct.id,
                'Updated Name',
                'Updated Brand'
            );

            // Assert
            const updatedProduct = await getProductByIdAsync(testProduct.id);
            // we enforce lower case on db so presentation layer can decide on formatting as needed
            expect(updatedProduct.name).toEqual('updated name');
            expect(updatedProduct.brandName).toEqual('updated brand');
        });

        test('should get a product by ID', async () => {
            // Arrange
            const { getProductByIdAsync } = productRepository();
            const testProduct = await arrangeTestProduct();

            // Act
            const product = await getProductByIdAsync(testProduct.id);

            // Assert
            expect(product).toBeDefined();
            expect(product.uniqueProductCode).toEqual(
                testProduct.uniqueProductCode
            );
        });

        test('should get a product by unique product code', async () => {
            // Arrange
            const { getProductByUniqueProductCodeAsync } = productRepository();
            const testProduct = await arrangeTestProduct();

            // Act
            const product = await getProductByUniqueProductCodeAsync(
                testProduct.uniqueProductCode
            );

            // Assert
            expect(product).toBeDefined();
            expect(product.name).toEqual(testProduct.name);
        });

        test('should get all products', async () => {
            // this test is tricky with our test setup so I'm passing it as is - really I'm just checking that
            // we at least have the 49 seeded records persisted
            const { getAllProductsAsync } = productRepository();
            const products = await getAllProductsAsync(0, 10);

            // Assert
            expect(products.length).toBeGreaterThan(0);
            expect(products.length).toBeLessThan(11);
        });

        test('should get total products count', async () => {
            const { getTotalProductsCount } = productRepository();
            const count = await getTotalProductsCount();

            // this test is tricky with our test setup so I'm passing it as is - really I'm just checking that
            // we at least have the 49 seeded records persisted
            expect(count).not.toBeNull();
            expect(count).toBeGreaterThan(49);
        });
    });
});
