import { useEffect } from "react";
import ProductsTable from "../ProductsTable/ProductsTable";
import "./OrderPage.css";
import { fetchOrder } from "../../reducers/activeOrderSlice";
import { useDispatch, useSelector } from "react-redux";
import OrderHeader from "../OrderHeader/OrderHeader";

function OrderPage() {
  const dispatch = useDispatch();
  const activeOrderState = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="OrderPage">
      {activeOrderState.loading || !activeOrderState.order ? (
        <span>...</span>
      ) : activeOrderState.err ? (
        <span>Some error occured, unable to load products.</span>
      ) : (
        <>
          <OrderHeader order={activeOrderState.order} />
          <ProductsTable products={activeOrderState.order.products} />
        </>
      )}
    </div>
  );
}

export default OrderPage;
