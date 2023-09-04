import { orderType } from "../../propTypes";
import { formatCurrency, getTotalPrice } from "../../utils";
import "./OrderHeader.css";

OrderHeader.prototype = {
  order: orderType,
};

function OrderHeader({ order }) {
  const totalOrderValue = formatCurrency(
    order.products?.reduce((acc, product) => {
      return acc + getTotalPrice(product.price, product.quantity);
    }, 0),
    order.products[0]?.currency
  );

  return (
    <div className="orderHeader">
      <div className="each-detail">
        <span className="detail-heading">Supplier</span>
        <span className="detail-value">{order.supplier}</span>
      </div>
      <div className="each-detail">
        <span className="detail-heading">Shipping date</span>
        <span className="detail-value">{order.shippingDate}</span>
      </div>
      <div className="each-detail">
        <span className="detail-heading">Total</span>
        <span className="detail-value">{totalOrderValue}</span>
      </div>
      <div className="each-detail">
        <span className="detail-heading">Category</span>
        <span className="detail-value">{order.category}</span>
      </div>
      <div className="each-detail">
        <span className="detail-heading">Department</span>
        <span className="detail-value">{order.department}</span>
      </div>
      <div className="each-detail">
        <span className="detail-heading">Status</span>
        <span className="detail-value">{order.status}</span>
      </div>
    </div>
  );
}

export default OrderHeader;
