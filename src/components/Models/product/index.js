import React, { useState, useEffect } from "react";

import { RiCloseLine as Close } from "react-icons/ri";
import Button from "../../util/button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../../actions/userActions";

function ProductModal(props) {
  const [product, setProduct] = useState(props.product);

  const { viewProduct } = props;
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  const onChange = ({ target }) => {
    if (target.value <= product.quantity && target.value > 0)
      setQuantity(target.value);
  };

  const viewDetails = () => {
    props.closeModal();
    viewProduct();
  };

  console.log(props)

  const addToCart = async () => {
    const data = {
      product: {
        id: product.id,
        quantity: product.quantity,
        price: product.price,

      },
      quantity: quantity,
      dispatchProducts:true
    };
    const res = await props.addToCart(data);
    setProduct({
      ...product,
      quantity: res,
    });
    setQuantity(res);
  };

  useEffect(() => {
    setQuantity(product.quantity);
  }, []);

  return (
    <>
      <div onClick={() => props.closeModal()} className="backdrop" />
      <div className="product product-model">
        <Close
          onClick={() => props.closeModal()}
          size="25px"
          className="close-icon"
        />
        <div className="left">
          <img src={product.mainImage} alt="" />
        </div>
        <div className="right">
          <div className="product-info">
            <div className="name">{product.productName}</div>
            <div className="price">${product.price}.00</div>
            <div className="sku">SKU:0002</div>
            <div className="quantity">Quantity</div>
            <div className="quantity-input">
              <input
                max={product.quantity}
                type="number"
                value={quantity}
                onChange={(event) => onChange(event)}
              />
            </div>
            {product.quantity === 0 && <div className="out">Out of stock</div>}
            <Button
              disabled={product.quantity === 0}
              title="Add to Cart "
              type="btn-loading"
              loading={props.loading}
              onClick={addToCart}
            />
            {/* <Link
              onClick={() => props.closeModal()}
              to={`/product/${product.id}`}
            >
              View More Details
            </Link> */}
            <div onClick={viewDetails} className="product-link">
              {" "}
              View More Details
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  // auth: state.firebase.auth,
  // profile: state.firebase.profile,
  loading: state.async.loading,
});

const actions = {
  addToCart,
};

export default connect(mapStateToProps, actions)(ProductModal);
