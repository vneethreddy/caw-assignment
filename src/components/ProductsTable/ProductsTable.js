import "./ProductsTable.css";
import PropTypes from "prop-types";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { formatCurrency, getTotalPrice } from "../../utils";

import OrderActions from "../OrderActions/OrderActions";
import ProductStatus from "../ProductStatus/ProductStatus";
import AddProductDialog from "../AddProductDialog/AddProductDialog";
import { productType } from "../../propTypes";

ProductsTable.prototype = {
  products: PropTypes.arrayOf(productType),
};

function ProductsTable({ products }) {
  const [showAddProductDialog, setShowAddProductDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (products && products.length) searchProductFromList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const hideAddProductDialog = (value) => {
    setShowAddProductDialog(value);
  };

  const searchProductFromList = () => {
    const query = searchQuery.replace(/[^0-9a-zA-Z]/g, "").toUpperCase();
    const results = products.filter((product) => {
      return product.name
        .replace(/[^0-9a-zA-Z]/g, "")
        .toUpperCase()
        .includes(query);
    });
    setSearchResults(results);
  };

  const tableheader = (
    <>
      <span className="p-input-icon-right">
        <InputText
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search...."
        />
        <i className="pi pi-search" />
      </span>
      <span className="AddItemBtnDiv">
        <Button
          label="Add Item"
          onClick={() => setShowAddProductDialog(true)}
        />
        <i className="pi pi-print" onClick={() => window.print()} />
      </span>
    </>
  );

  const productImageBody = (product) => {
    return (
      <img width="100%" src={`/${product.prodImgUrl}`} alt={product.name} />
    );
  };

  const productPriceBody = (product) => {
    return (
      <>
        <span>{`${formatCurrency(product.price, product.currency)} / ${
          product.package
        }`}</span>

        {product.previous.price !== null && (
          <span className="crossedOutText">
            {formatCurrency(product.previous.price, product.currency)}
          </span>
        )}
      </>
    );
  };

  const productQuantityBody = (product) => {
    return (
      <>
        <span>
          <b>{product.quantity}</b> {`x ${product.package}`}
        </span>

        <span className="crossedOutText">{product.previous.quantity}</span>
      </>
    );
  };

  const ProductTotalBody = (product) => {
    return (
      <span>
        {product.quantity === 0 || product.price === 0
          ? 0
          : formatCurrency(
              getTotalPrice(product.price, product.quantity),
              product.currency
            )}
      </span>
    );
  };

  const ProductStatusBody = (product) => {
    return <ProductStatus product={product} />;
  };

  const ProductActionsBody = (product) => {
    return <OrderActions product={product} />;
  };

  return (
    <>
      {showAddProductDialog && (
        <AddProductDialog
          visible={showAddProductDialog}
          setVisible={hideAddProductDialog}
        />
      )}
      <div className="ordersTableDiv">
        <DataTable
          value={searchQuery.length ? searchResults : products}
          header={tableheader}
        >
          <Column
            className="tableColumn"
            body={productImageBody}
            style={{ width: "7%" }}
          ></Column>
          <Column
            className="tableColumn"
            field="name"
            header="Product Name"
            style={{ width: "20%" }}
          ></Column>
          <Column
            className="tableColumn"
            field="brand"
            header="Brand"
            style={{ width: "11%" }}
          ></Column>
          <Column
            className="tableColumn"
            header="Price"
            body={productPriceBody}
            style={{ width: "13%" }}
          ></Column>
          <Column
            className="tableColumn"
            header="Quantity"
            body={productQuantityBody}
            style={{ width: "10%" }}
          ></Column>
          <Column
            className="tableColumn"
            header="Total"
            body={ProductTotalBody}
            style={{ width: "10%" }}
          ></Column>
          <Column
            className="tableColumn highlightedColumn"
            header="Status"
            body={ProductStatusBody}
            style={{ width: "16%" }}
          ></Column>
          <Column
            className="tableColumn highlightedColumn"
            body={ProductActionsBody}
            style={{ width: "19%" }}
          ></Column>
        </DataTable>
      </div>
    </>
  );
}

export default ProductsTable;
