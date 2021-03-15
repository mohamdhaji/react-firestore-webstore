import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from "../../../firebase";
import UserLayout from "../hoc";
import CartProduct from "../../../components/util/cartProduct";
import { firestoreConnect } from "react-redux-firebase";
import { cartProductsQuery } from "../../../querys";
import { compose } from "redux";
import Button from "../../../components/util/button";
import Loader from "../../../components/util/loader";
import { addOne, remove, removeOne } from "../../../actions/userActions";

function Cart(props) {
  const [loading, setLoading] = useState(false);
  const [mount, setMount] = useState(true);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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
    await props.remove(productId, productQuantity, userProductQuantity,true);
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
        let total = 0;
        const productsIds = props.cart.reduce((acc, curr) => {
          acc.push(curr.id);
          total += curr.total;
          return acc;
        }, []);
        setTotalPrice(total);

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

  return (
    <UserLayout>
      <div  className="my-orders">
      <div className="mobile-checkout">
      <Button loading={false} title="Checkout" type="btn-checkout" />

      </div>

        <div className="left">
          <div className="title">My Cart</div>
          <div className="dash"></div>
          {loading ? (
            <Loader />
          ) : products.length > 0 ? (
            products.map((product, i) => {
              return (
                <div key={product.id}>
                  {props.cart[i] && (
                    <CartProduct
                      viewCart={true}
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
            <div className="empty-cart">Cart Empty</div>
          )}
        </div>

        <div className="right">
          <div className="title">Order Summary</div>
          <div className="dash"></div>
          <div className="total-price">
            <div className="title">Subtotal</div>
            <div> ${totalPrice}.00</div>
          </div>
          <div className="shipping">
            <div className="title">Shipping</div>
            <div>FREE</div>
          </div>
          <div className="ship-to">Palestine</div>
          <div className="dash"></div>
          <div className="price">
            <div>Total</div>
            <div> ${totalPrice}.00</div>
          </div>
          <Button loading={false} title="Checkout" type="btn-checkout" />
        </div>
      </div>
    </UserLayout>
  );
}
const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  cart: state.firestore.ordered.cart,
  loading: state.async.loading,
});
const actions = {
    addOne,
    remove,
    removeOne,
  };
export default compose(
  connect(mapStateToProps,actions),
  firestoreConnect((props) => cartProductsQuery(props.auth.uid))
)(Cart);
