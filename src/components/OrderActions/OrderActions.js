import "./OrderActions.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { markProductAsApproved } from "../../reducers/activeOrderSlice";
import MissingProductDialog from "../MissingProductDialog/MissingProductDialog";
import EditProductDialog from "../EditProductDialog/EditProductDialog";
import { productType } from "../../propTypes";

OrderActions.propTypes = {
  product: productType,
};

function OrderActions({ product }) {
  const dispatch = useDispatch();

  const [showMissingDialog, setShowMissingDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const approveProduct = (product) => {
    dispatch(markProductAsApproved(product.id));
  };

  const hideMissingDialog = (value) => {
    setShowMissingDialog(value);
  };

  const hideEditDialog = (value) => {
    setShowEditDialog(value);
  };

  return (
    <>
      {showMissingDialog && (
        <MissingProductDialog
          visible={showMissingDialog}
          setVisible={hideMissingDialog}
          product={product}
        />
      )}

      {showEditDialog && (
        <EditProductDialog
          visible={showEditDialog}
          setVisible={hideEditDialog}
          product={product}
        />
      )}

      <div className="actionsDiv">
        {product.statusCode === "APP" && (
          <>
            <i className={`pi pi-check ${product.statusCode}`}></i>
            <i className="pi pi-times disabled"></i>
            <span className="editBtn disabled">Edit</span>
          </>
        )}

        {product.statusCode !== "APP" && (
          <>
            <i
              className="pi pi-check"
              onClick={() => approveProduct(product)}
            ></i>

            <i
              onClick={() => setShowMissingDialog(true)}
              className={`pi pi-times ${product.statusCode}`}
            ></i>

            <span className="editBtn" onClick={() => setShowEditDialog(true)}>
              Edit
            </span>
          </>
        )}
      </div>
    </>
  );
}

export default OrderActions;
