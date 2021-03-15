import React, { useState, useEffect } from "react";
import firebase from "../../../firebase";
import Loader from "../../util/loader";
import { IoIosArrowForward as Arrow } from "react-icons/io";
import CartProduct from "../../util/cartProduct";
import Button from "../../util/button";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { cartProductsQuery } from "../../../querys";
import { toastr } from "react-redux-toastr";
import { Link } from "react-router-dom";
import { addOne, remove, removeOne } from "../../../actions/userActions";
function CartModel(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mount, setMount] = useState(true);

  const addOne = async (
    productId,
    productQuantity,
    userProductQuantity,
    total,
    price
  ) => {
    await props.addOne(
      productId,
      productQuantity,
      userProductQuantity,
      total,
      price,
      true
    );
  };

  const remove = async (productId, productQuantity, userProductQuantity) => {
    await props.remove(productId, productQuantity, userProductQuantity, true);
  };

  const removeOne = async (
    productId,
    productQuantity,
    userProductQuantity,
    total,
    price
  ) => {
    await props.removeOne(
      productId,
      productQuantity,
      userProductQuantity,
      total,
      price,
      true
    );
  };

 

  useEffect(() => {
    const getProducts = async () => {
      if (mount) {
        setLoading(true);
      }
      if (props.cart !== undefined) {
        const firestore = firebase.firestore();
        const productsIds = props.cart.reduce((acc, curr) => {
          acc.push(curr.id);
          return acc;
        }, []);

        const collectionRef = firestore.collection("products");

        if (productsIds.length) {
          const productsRes = await collectionRef
            .where("__name__", "in", productsIds)
            .get();
          const products = [];
          for (let i = 0; i < productsRes.docs.length; i++) {
            products.push({
              id: productsRes.docs[i].id,
              ...productsRes.docs[i].data(),
            });
          }
          setProducts(products.slice(0, 4));
        } else setProducts([]);
      }

      if (mount) {
        setLoading(false);
        setMount(false);
      }
    };

    getProducts();
  }, [props.cart]);
  // note dont use [props.userCart] rather than [props.cart] because userCart will be loaded faster than props.cart which lead to fire useEffect without cart items .

  return (
    <>
      <div onClick={props.closeModal} className="backdrop" />

      <div className="cart-model">
        <div className="head">
          <Arrow onClick={props.closeModal} className="arrow" size="30px" />
          Cart
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="user-cart__products">
            <div className="products">
              {products.length > 0 ? (
                products.map((product, i) => {
                  return (
                    <div key={product.id}>
                      {props.cart[i] && (
                        <CartProduct
                          closeModal={props.closeModal}
                          quantity={props.cart[i].quantity}
                          product={product}
                          totalPrice={props.cart[i].total}
                          addOne={() =>
                            addOne(
                              product.id,
                              product.quantity,
                              props.cart[i].quantity,
                              props.cart[i].total,
                              product.price
                            )
                          }
                          removeOne={() =>
                            removeOne(
                              product.id,
                              product.quantity,
                              props.cart[i].quantity,
                              props.cart[i].total,
                              product.price
                            )
                          }
                          remove={() =>
                            remove(
                              product.id,
                              product.quantity,
                              props.cart[i].quantity,
                              props.cart[i].total
                            )
                          }
                        />
                      )}
                      {i !== products.length - 1 && products.length !== 1 && (
                        <div className="divider" />
                      )}
                    </div>
                  );
                })
              ) : (
                <div>Cart Empty</div>
              )}
            </div>
            <Link to="/cart">
              <Button
                onClick={props.closeModal}
                loading={false}
                title="View Cart "
                type="btn-loading"
              />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  cart: state.firestore.ordered.cart,
  userCart: state.firebase.profile.cart,
});

const actions = {
  addOne,
  remove,
  removeOne,
};

export default compose(
  connect(mapStateToProps, actions),
  firestoreConnect((props) => cartProductsQuery(props.auth.uid))
)(CartModel);
