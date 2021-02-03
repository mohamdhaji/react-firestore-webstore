import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import Loader from "../../components/util/loader";
import Button from "../../components/util/button";
import {
  MdFavoriteBorder as Fav,
  MdKeyboardArrowRight as RightArrow,
  MdKeyboardArrowLeft as LeftArrow,
} from "react-icons/md";
import TextCollapse from "../../components/util/collapse/textCollapse";
import ProdImg from "../../components/util/prodImg";
import { connect } from "react-redux";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../../actions/asyncActions";
import { addToCart } from "../../actions/userActions";
import { toastr } from "react-redux-toastr";

function Product(props) {
  const [product, setProduct] = useState({});
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [closeCollapse, setCloseCollapse] = useState("not set");
  const [quantity, setQuantity] = useState(0);
  const [mount, setMount] = useState(true);
  const onChange = ({ target }) => {
    if (target.value <= product.quantity && target.value >= 0)
      setQuantity(target.value);
  };

  const addToCart = async () => {
    const data = {
      product: {
        id: product.id,
        quantity: product.quantity,
        price: product.price,
      },
      quantity: quantity,
    };
    const res = await props.addToCart(data);

    setProduct({
      ...product,
      quantity: res,
    });
    setQuantity(res);
  };

  const next = async () => {
    setLoading(true);

    const firestore = firebase.firestore();
    const collectionRef = firestore.collection("products");
    let query = collectionRef;

    if (filters.collection !== "All" && filters.collection !== "Best Sellers")
      query = query.where("collection", "==", filters.collection);
    if (filters.collection === "Best Sellers")
      query = query.where("bestSeller", "==", true);

    if (filters["model"].length > 0)
      query = query.where("modelName", "in", filters["model"]);
    if (filters["price"].length > 0) {
      query = query.where("price", ">=", filters["price"][0]);
      query = query.where("price", "<=", filters["price"][1]);
    }

    let startAfter = await collectionRef.doc(product.id).get();
    query = query.startAfter(startAfter).limit(1);
    const querySnap = await query.get();
    const length = querySnap.docs.length;

    if (length === 1) {
      const id = querySnap.docs[0].id;
      props.history.push({
        pathname: "/product/" + id,
        state: {
          collection: filters.collection,
          model: filters.model,
          price: filters.price,
        },
      });
    }
    setLoading(false);
  };

  const before = async () => {
    setLoading(true);

    const firestore = firebase.firestore();
    const collectionRef = firestore.collection("products");

    let query = collectionRef;
    if (filters.collection !== "All" && filters.collection !== "Best Sellers")
      query = query.where("collection", "==", filters.collection);
    if (filters.collection === "Best Sellers")
      query = query.where("bestSeller", "==", true);

    if (filters["model"].length > 0)
      query = query.where("modelName", "in", filters["model"]);
    if (filters["price"].length > 0) {
      query = query.where("price", ">=", filters["price"][0]);
      query = query.where("price", "<=", filters["price"][1]);
    }

    let endBefore = await collectionRef.doc(product.id).get();
    query = query.endBefore(endBefore);
    const querySnap = await query.get();
    const length = querySnap.docs.length;
    if (length !== 0) {
      const id = querySnap.docs[length - 1].id;
      props.history.push({
        pathname: "/product/" + id,
        state: {
          collection: filters.collection,
          model: filters.model,
          price: filters.price,
        },
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    let product = null;
    if (mount) {
      setLoading(true);
    }
    const getProduct = async () => {
      const firestore = firebase.firestore();
      const productId = props.match.params["id"];
      let filters = {};
      if (props.location.state)
        filters = {
          collection: props.location.state["collection"] || "All",
          price: props.location.state["price"] || [],
          model: props.location.state["model"] || [],
        };
      else
        filters = {
          collection: "All",
          price: [],
          model: [],
        };

      const docRef = firestore.collection("products").doc(productId);
      product = await docRef.get();
      setProduct({ id: product.id, ...product.data() });
      setFilters(filters);
      setQuantity(product.data().quantity);

      if (mount) {
        setLoading(false);
        setMount(false);
      }
    };
    getProduct();
  }, [props.match.params["id"], props.profile.cart]);

  const closeOtherCollapse = (collapseName) => {
    setCloseCollapse(collapseName);
  };

  return (
    <div className="product-details__page">
      {loading ? (
        <Loader />
      ) : (
        <div className="product product-details">
          <div className="breadcrump">
            {filters.collection}/ {product.productName}
          </div>
          <div className="pagination">
            <LeftArrow onClick={before} className="back" size="25px" />
            <div>Prev | Next</div>

            <RightArrow onClick={next} className="next" size="25px" />
          </div>
          <div className="left">
            {product.images && <ProdImg images={product.images}></ProdImg>}
            {/* <img src={product.mainImage} alt="" /> */}
          </div>
          <div className="right">
            <div className="product-info">
              <div className="name">{product.productName}</div>
              <div className="sku">SKU:0002</div>
              <div className="price">${product.price}.00</div>
              <div className="quantity">Quantity</div>
              <div className="quantity-input">
                <input
                  max={product.quantity}
                  type="number"
                  value={quantity}
                  onChange={(event) => onChange(event)}
                />
              </div>
              {product.quantity === 0 && (
                <div className="out">Out of stock</div>
              )}
              <div className="buttons">
                <Button
                  loading={props.loading}
                  onClick={addToCart}
                  title="Add to Cart "
                  type="btn-loading"
                  disabled={product.quantity === 0}
                />
                <button className="favourite">
                  <Fav size="28px" color="#BC4C2A" />
                </button>
              </div>
              <button className="buy-now">Buy Now</button>
              <div style={{ marginTop: "20px" }}>
                <TextCollapse
                  closeOtherCollapse={() => closeOtherCollapse("PRODUCT INFO")}
                  closeCollapse={closeCollapse}
                  title="PRODUCT INFO"
                  initState={true}
                >
                  I'm a product detail. I'm a great place to add more
                  information about your product such as sizing, material, care
                  and cleaning instructions. This is also a great space to write
                  what makes this product special and how your customers can
                  benefit from this item.
                </TextCollapse>
                <TextCollapse
                  closeOtherCollapse={() =>
                    closeOtherCollapse("RETURN & REFUND POLICY")
                  }
                  closeCollapse={closeCollapse}
                  title="RETURN & REFUND POLICY"
                >
                  I’m a Return and Refund policy. I’m a great place to let your
                  customers know what to do in case they are dissatisfied with
                  their purchase. Having a straightforward refund or exchange
                  policy is a great way to build trust and reassure your
                  customers that they can buy with confidence.
                </TextCollapse>
                <TextCollapse
                  closeOtherCollapse={() => closeOtherCollapse("SHIPPING INFO")}
                  closeCollapse={closeCollapse}
                  title="SHIPPING INFO"
                >
                  I'm a shipping policy. I'm a great place to add more
                  information about your shipping methods, packaging and cost.
                  Providing straightforward information about your shipping
                  policy is a great way to build trust and reassure your
                  customers that they can buy from you with confidence.
                </TextCollapse>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  // auth: state.firebase.auth,
  profile: state.firebase.profile,
  loading: state.async.loading,
});

const actions = {
  addToCart,
};

// because we connect to profile each time we update profile this component will render update and re-render

export default connect(mapStateToProps, actions)(Product);
