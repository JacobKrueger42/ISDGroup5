export const mapToRow = catalogueEntry => {
    console.log(catalogueEntry);
    return {
        id: catalogueEntry.id,
        name: catalogueEntry.name,
        brandName: catalogueEntry.brandName,
        description: catalogueEntry.description,
        uniqueProductCode: catalogueEntry.uniqueProductCode,
        price: catalogueEntry.price,
        category: catalogueEntry.category,
        quantity: catalogueEntry.quantity
    };
};
