import { productType } from "../../propTypes";
import "./ProductStatus.css";
import { Tag } from "primereact/tag";

ProductStatus.propTypes = {
  product: productType,
};

function ProductStatus({ product }) {
  const statusMap = {
    APP: "Approved",
    PUPDATE: "Price Updated",
    QUPDATE: "Quantity Updated",
    PQUPDATE: "Quantity And Price Updated",
    MISS: "Missing",
    MISSURG: "Missing Urgent",
  };

  const getStatusSeverity = (statusCode) => {
    switch (statusCode) {
      case "APP":
        return "success";
      case "PUPDATE":
        return "success";
      case "QUPDATE":
        return "success";
      case "PQUPDATE":
        return "success";
      case "MISS":
        return "warning";
      case "MISSURG":
        return "danger";
      default:
        return null;
    }
  };

  return product.statusCode ? (
    <Tag
      className="statusTag"
      value={statusMap[product.statusCode]}
      severity={getStatusSeverity(product.statusCode)}
    ></Tag>
  ) : (
    <></>
  );
}

export default ProductStatus;
