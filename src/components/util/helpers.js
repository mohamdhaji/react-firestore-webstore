export const createNewProduct = (product,images,mainImage) => {
  return {
    productName: product.productName,
    price: product.price,
    collection:product.collection,
    description: product.description,
    bestSeller: product.bestSeller,
    quantity: product.quantity,
    modelName: product.modelName,
    publish: product.publish,
    available: product.available,
    shipping: product.shipping,
    images:images,
    mainImage:mainImage
  };
};
