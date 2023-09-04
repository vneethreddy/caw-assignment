import PropTypes from "prop-types";

export const productType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  package: PropTypes.string.isRequired,
  prodImgUrl: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  price: PropTypes.number,
  quantity: PropTypes.number,
  statusCode: PropTypes.string,
  reason: PropTypes.string,
  previous: PropTypes.shape({
    price: PropTypes.number,
    quantity: PropTypes.number,
  }),
});

export const orderType = PropTypes.shape({
  supplier: PropTypes.string.isRequired,
  shippingDate: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(productType),
});
