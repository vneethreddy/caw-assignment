import PropTypes from "prop-types";
import "./EditProductDialog.css";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { SelectButton } from "primereact/selectbutton";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { formatCurrency, getTotalPrice } from "../../utils";
import { updatePriceAndQuantity } from "../../reducers/activeOrderSlice";
import { productType } from "../../propTypes";

EditProductDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  product: productType,
};

function EditProductDialog({ visible, setVisible, product }) {
  const [updatedValues, setUpdatedValues] = useState({
    price: product.price,
    quantity: product.quantity,
    reason: product.reason,
  });

  const reasonItems = [
    { name: "Missing product", value: 1 },
    { name: "Quantity is not the same", value: 2 },
    { name: "Price is not the same", value: 3 },
    { name: "Other", value: 4 },
  ];

  const dispatch = useDispatch();

  const setProductDetails = () => {
    dispatch(
      updatePriceAndQuantity({
        productId: product.id,
        newDetails: updatedValues,
      })
    );
    setVisible(false);
  };

  const dialogFooter = (
    <div>
      <Button
        label="Cancel"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        className="sendBtn"
        label="Send"
        onClick={() => setProductDetails()}
      />
    </div>
  );

  return (
    <Dialog
      className="editProductDialog"
      visible={visible}
      onHide={() => setVisible(false)}
      footer={dialogFooter}
    >
      <h3 className="productName">{product.name}</h3>
      <p className="brand">{product.brand}</p>

      <div className="actionDiv">
        <div className="imageDiv">
          <img width="100%" src={`/${product.prodImgUrl}`} alt={product.name} />
        </div>
        <div className="actions">
          <div>
            <div className="action priceDiv">
              <label className="labelText" htmlFor="price-button">
                Price
              </label>
              <InputNumber
                inputId="price-button"
                value={updatedValues.price}
                onChange={(e) =>
                  setUpdatedValues({ ...updatedValues, price: e.value })
                }
                mode="currency"
                showButtons
                buttonLayout="horizontal"
                currency={product.currency}
                min={0.0}
              />
              <span className="packageText"> / {product.package}</span>
            </div>
            <div className="action">
              <label className="labelText" htmlFor="price-button">
                Quantity
              </label>
              <InputNumber
                value={updatedValues.quantity}
                onChange={(e) =>
                  setUpdatedValues({ ...updatedValues, quantity: e.value })
                }
                mode="decimal"
                showButtons
                buttonLayout="horizontal"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                min={0}
              />
              <span className="packageText"> X {product.package}</span>
            </div>
            <div className="action">
              <span className="labelText">Total</span>
              <span className="totalText">
                {formatCurrency(
                  getTotalPrice(updatedValues.price, updatedValues.quantity),
                  product.currency
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="reasonBox">
        <span className="header">
          <b>Choose reason</b> (optional):
        </span>
        <SelectButton
          value={updatedValues.reason}
          onChange={(e) =>
            setUpdatedValues({ ...updatedValues, reason: e.value })
          }
          options={reasonItems}
          optionLabel="name"
        />
      </div>
    </Dialog>
  );
}

export default EditProductDialog;
