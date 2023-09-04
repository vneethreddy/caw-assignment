export const formatCurrency = (value, currency) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: currency,
  });
};

export const getTotalPrice = (price, quantity) => {
  return price * quantity;
};
