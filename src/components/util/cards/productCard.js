import React from "react";
import { Link } from "react-router-dom";
export default function ProductCard(props) {
  const product = props.product;

  return (
    <div className="product-card">
      <div className="image-container">
        {product.quantity ? (
          product.bestSeller && (
            <div className="best-sell__label">Best Seller</div>
          )
        ) : (
          <div className="out__label">Out of stock</div>
        )}

        <img onClick={props.viewProduct} src={product.mainImage} alt="" />

        <div
          onClick={() =>
            props.openModal("ProductModel", {
              product: product,
              viewProduct: props.viewProduct,
              closeModal: props.closeModal,
            })
          }
          className="quick-view"
        >
          Quick View
        </div>
      </div>
      <div className="name">{product.productName}</div>
      <div className="price">{product.price}$</div>
    </div>
  );
}
