export const formatOrderData = (cartItems, fullAddress) => {
  const productOrderDetails = cartItems
    .filter((item) => !item.packageID)
    .map((item) => ({
      productID: item.id,
      quantity: item.quantity,
    }));

  const cleaningOrderDetails = cartItems
    .filter((item) => !!item.packageID)
    .map((item) => ({
      packageID: item.packageID,
      quantity: item.quantity,
    }));

  return {
    fullAddress,
    productOrderDetails,
    cleaningOrderDetails,
  };
};
