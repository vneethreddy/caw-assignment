import "./AddProductDialog.css";
import PropTypes from "prop-types";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCatalog } from "../../reducers/catalogSlice";
import { formatCurrency } from "../../utils";
import { addNewProducts } from "../../reducers/activeOrderSlice";

AddProductDialog.prototype = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

function AddProductDialog({ visible, setVisible }) {
  const catalogState = useSelector((state) => state.catalog);
  const activeOrderProducts = useSelector(
    (state) => state.order.order.products
  );
  const [showReviewScreen, setShowReviewScreen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [addedProducts, setAddedproducts] = useState({});
  const addedProductsArray = Object.values(addedProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatalog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const AddProductsToOrder = () => {
    dispatch(addNewProducts(addedProductsArray));
    setVisible(false);
  };

  const serachProductsFromCatalog = (searchQuery) => {
    if (!searchQuery.length) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.replace(/[^0-9a-zA-Z]/g, "").toUpperCase();
    const results = catalogState.products.filter((product) => {
      return (
        product.name
          .replace(/[^0-9a-zA-Z]/g, "")
          .toUpperCase()
          .includes(query) &&
        activeOrderProducts.findIndex((each) => each.id === product.id) === -1
      );
    });
    setSearchResults(results);
  };

  const onQuantityChange = (product, newVlaue) => {
    if (newVlaue === null && addedProducts[product.id]) {
      const newAddedProducts = { ...addedProducts };
      delete newAddedProducts[product.id];
      setAddedproducts({ ...newAddedProducts });
    } else {
      product = { ...product, quantity: newVlaue };
      setAddedproducts({ ...addedProducts, [product.id]: product });
    }
  };

  const dialogFooter = (
    <div className="footerDiv">
      <span>
        <b>Total: </b>
        {addedProductsArray.length}
      </span>
      <div>
        {!showReviewScreen && (
          <Button
            label="Review"
            onClick={() => setShowReviewScreen(true)}
            className="reviewBtn"
            disabled={addedProductsArray.length === 0}
          />
        )}
        {showReviewScreen && (
          <>
            <Button
              label="Back"
              onClick={() => setShowReviewScreen(false)}
              className="p-button-text"
            />
            <Button
              label="Add"
              onClick={() => AddProductsToOrder()}
              className="addBtn"
              disabled={addedProductsArray.length === 0}
            />
          </>
        )}
      </div>
    </div>
  );

  const productImageBody = (product) => {
    return (
      <img width="100%" src={`/${product.prodImgUrl}`} alt={product.name} />
    );
  };

  const productPriceBody = (product) => {
    return formatCurrency(product.price, product.currency);
  };

  const productQuantityBody = (product) => {
    return showReviewScreen ? (
      <InputNumber
        value={product.quantity}
        onValueChange={(e) => onQuantityChange(product, e.value)}
        mode="decimal"
        min={0}
      ></InputNumber>
    ) : (
      <InputNumber
        value={addedProducts[product.id]?.quantity || product.quantity}
        onChange={(e) => onQuantityChange(product, e.value)}
      ></InputNumber>
    );
  };

  return (
    <Dialog
      className="AddProductDialog"
      header="Add Product from Sysco's catalog"
      visible={visible}
      onHide={() => setVisible(false)}
      footer={dialogFooter}
    >
      {!showReviewScreen && (
        <p>Search products from Sysco's catalog and add quantity</p>
      )}

      {showReviewScreen && <p>Review before adding products</p>}

      <span
        className="p-input-icon-right"
        style={{ display: showReviewScreen ? "none" : "block" }}
      >
        <InputText
          placeholder="Search...."
          onChange={(e) => serachProductsFromCatalog(e.target.value)}
          disabled={catalogState.loading}
        />
        <i className="pi pi-search" />
      </span>

      {catalogState.error && <p>Some error occured, please try again.</p>}

      {((showReviewScreen && addedProductsArray.length !== 0) ||
        (!showReviewScreen && searchResults.length !== 0)) && (
        <DataTable
          value={showReviewScreen ? addedProductsArray : searchResults}
          editMode="cell"
        >
          <Column
            className="tableColumn"
            body={productImageBody}
            style={{ width: "8%" }}
          ></Column>
          <Column
            className="tableColumn"
            field="name"
            header="Name"
            style={{ width: "30%" }}
          ></Column>
          <Column
            className="tableColumn"
            field="brand"
            header="Brand"
            style={{ width: "16%" }}
          ></Column>
          <Column
            className="tableColumn"
            field="package"
            header="Package"
            style={{ width: "13%" }}
          ></Column>
          <Column
            className="tableColumn"
            header="Price"
            body={productPriceBody}
            style={{ width: "12%" }}
          ></Column>
          <Column
            className="tableColumn"
            header="Quantity"
            body={productQuantityBody}
            style={{ width: "25%" }}
          ></Column>
        </DataTable>
      )}
    </Dialog>
  );
}

export default AddProductDialog;
