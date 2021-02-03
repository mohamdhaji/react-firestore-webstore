import React from "react";

import {
  AiOutlineCloseCircle as Close,
  AiOutlineClose as CloseV2,
} from "react-icons/ai";
import CartInput from "../util/cartInput";
import { Link } from "react-router-dom";
export default function CartProduct(props) {
  const { product } = props;

  return (
    <div className="cart-product">
      {props.viewCart ? (
        <>
          <CloseV2 size="20px" className="close-icon" onClick={props.remove} />
          <div className="total-price">${props.totalPrice}.00</div>
        </>
      ) : (
        <Close className="close-icon" onClick={props.remove} />
      )}
      <Link onClick={props.closeModal} to={`/product/${product.id}`}>
        <img src={product.mainImage} alt="" />
      </Link>
      <div className="right">
        <div className="name">{product.productName}</div>
        <div className="price">${product.price}.00</div>
        <CartInput
          removeOne={props.removeOne}
          addOne={props.addOne}
          productQuantity={product.quantity}
          value={props.quantity}
        />
      </div>
    </div>
  );
}
