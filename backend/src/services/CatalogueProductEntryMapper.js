export default function CatalogueProductEntryMapper(queryResult) {
    return {
        id: queryResult.id,
        productId: queryResult.product.id,
        name: queryResult.product.name,
        brandName: queryResult.product.brandName,
        description: queryResult.product.description,
        uniqueProductCode: queryResult.uniqueProductCode,
        price: queryResult.price,
        category: queryResult.productCategory,
        quantity: queryResult.stockQuantity
    };
}
