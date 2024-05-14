export const mapToRow = product => {
    return {
        id: product.id,
        name: product.name,
        brandName: product.brandName,
        uniqueProductCode: product.uniqueProductCode
    };
};
