import PropTypes from "prop-types";
import "./MissingProductDialog.css";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { markProductAsMissing } from "../../reducers/activeOrderSlice";
import { productType } from "../../propTypes";

MissingProductDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  product: productType,
};

function MissingProductDialog({ visible, setVisible, product }) {
  const dispatch = useDispatch();

  const setIsProductUrgent = (urgent) => {
    dispatch(
      markProductAsMissing({
        productId: product.id,
        isUrgent: urgent,
      })
    );
    setVisible(false);
  };

  const dialogFooter = (
    <div>
      <Button
        label="No"
        onClick={() => setIsProductUrgent(false)}
        className="p-button-text"
      />
      <Button
        label="Yes"
        onClick={() => setIsProductUrgent(true)}
        className="p-button-text"
      />
    </div>
  );

  return (
    <Dialog
      className="missingProductDialog"
      header="Missing Product"
      visible={visible}
      onHide={() => setVisible(false)}
      footer={dialogFooter}
    >
      <p>Is '</p>
      <p className="productName">{product.name}</p>
      <p>' Urgent?</p>
    </Dialog>
  );
}

export default MissingProductDialog;
