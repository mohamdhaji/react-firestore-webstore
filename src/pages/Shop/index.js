import React, { useState, useEffect, useMemo } from "react";

import ProductCard from "../../components/util/cards/productCard";
import CollapseCheckbox from "../../components/util/collapse/collapseCheckbox";
import PriceCollapse from "../../components/util/collapse/priceCollapse";
import ListCollapse from "../../components/util/collapse/listCollapse";
import Button from "../../components/util/button";
import { connect } from "react-redux";
import {
  getProductsForShop,
  filterProducts,
  loadMore,
} from "../../actions/productActions";
import Loader from "../../components/util/loader";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { openModal, closeModal } from "../../actions/modalActions";

function Shop(props) {
  const [filters, setFilters] = useState({
    model: [],
    price: [],
    collection: "All",
  });
  const [loadMoreProducts, setLoadMoreProducts] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [pagination, setPagination] = useState("");
  const [disableLoadBtn, setDisableLoadBtn] = useState(false);
  const [loadedProducts, setLoadedProducts] = useState([]);
  useEffect(() => {
    async function fetchPagination() {
      const res = await props.getProductsForShop();
      setPagination(res.lastRef);
      setDisableLoadBtn(res.disableLoadBtn);
    }
    fetchPagination();
  }, []);

  useEffect(() => {
    if (loadMoreProducts) {
      setLoadedProducts([...loadedProducts, ...props.products]);
      setLoadMoreProducts(false);
      setLoadMoreLoading(false);
    }
  }, [loadMoreProducts]);

  useMemo(() => {
    if (props.products.length === 0 && !props.loading) setLoadedProducts([]);
    else if (!props.loading) setLoadedProducts([...props.products]);
  }, [props.loading]);

  const loadMore = async () => {
    setLoadMoreLoading(true);
    const res = await props.loadMore(pagination, filters);
    setPagination(res.lastRef);
    setDisableLoadBtn(res.disableLoadBtn);
    setLoadMoreProducts(true);
  };

  const models = {
    All: [
      { id: "iPhone X", name: "iPhone X" },
      { id: "iPhone XS", name: "iPhone XS" },
      { id: "Shoulder bag", name: "Shoulder bag" },
      { id: "Cross body", name: "Cross body" },
      { id: "Shopper Tote", name: "Shopper Tote" },
      { id: "Full Grain", name: "Full Grain" },
      { id: "Corrected Grain", name: "Corrected Grain" },
      { id: "Split", name: "Split" },
    ],
    phoneCases: [
      { id: "iPhone X", name: "iPhone X" },
      { id: "iPhone XS", name: "iPhone XS" },
    ],
    miniLeatherGoods: [
      { id: "Shoulder bag", name: "Shoulder bag" },
      { id: "Cross body", name: "Cross body" },
      { id: "Shopper Tote", name: "Shopper Tote" },
    ],
    leatherBelts: [
      { id: "Full Grain", name: "Full Grain" },
      { id: "Corrected Grain", name: "Corrected Grain" },
      { id: "Split", name: "Split" },
    ],
  };

  const [selectedModels, setSelectedModels] = useState(models["All"]);

  const collections = [
    { id: "All", name: "All" },
    { id: "phoneCases", name: "Phone Cases" },
    { id: "miniLeatherGoods", name: "Mini leather goods" },
    { id: "leatherBelts", name: "Leather Belts" },
    { id: "bestSeller", name: "Best Sellers" },
  ];

  const viewProduct = (id) => {
    props.history.push({
      pathname: "/product/" + id,
      state: {
        collection: filters.collection,
        model: filters.model,
        price: filters.price,
      },
    });
  };

  const handleFilters = async (newData, category, collection) => {
    const newFilters = { ...filters };
    if (category === "collection") {
      if (collection === "bestSeller") setSelectedModels(models["All"]);
      else setSelectedModels(models[collection]);

      newFilters[category] = newData;

      newFilters["model"] = [];
      setFilters(newFilters);
    } else {
      newFilters[category] = newData;

      setFilters(newFilters);
    }
    // setClearProducts(true);
    if (category !== "price") {
      const res = await props.filterProducts(newFilters);
      setPagination(res.lastRef);
      setDisableLoadBtn(res.disableLoadBtn);
    }
  };

  const applyFilters = async (filters) => {
    setFilters({...filters})
    const res = await props.filterProducts(filters);
    setPagination(res.lastRef);
    setDisableLoadBtn(res.disableLoadBtn);
  };

  const sliderOnChangeCommitted = async () => {
    const res = await props.filterProducts(filters);
    setPagination(res.lastRef);
    setDisableLoadBtn(res.disableLoadBtn);
  };

  return (
    <div>
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName="SlideOut"
      >
        <div className="main-title">SHOP ALL</div>
      </ReactCSSTransitionGroup>
      <div className="filter-btn">
        <Button
          onClick={() =>
            props.openModal("Filter", {
              collections,
              selectedModels,
              filters,
              models,
              applyFilters: applyFilters
            })
          }
          title="Filter"
          type="btn-load"
          color="primary"
          size="20px"
        />
      </div>
      <div className="shop">
        <div className="left">
          <div className="title">Filter by</div>
          <div className="dash"></div>
          <ListCollapse
            handleFilters={(filters, collection) =>
              handleFilters(filters, "collection", collection)
            }
            initState={true}
            list={collections}
            title="Collection"
          />
          <PriceCollapse
            handleFilters={(filters) => handleFilters(filters, "price")}
            initState={false}
            title="Price"
            sliderBlur={sliderOnChangeCommitted}
          />

          <CollapseCheckbox
            initState={false}
            title="Model"
            collection={filters.collection}
            list={selectedModels}
            handleFilters={(filters) => handleFilters(filters, "model")}
          />
        </div>
        {props.loading ? (
          <>
            <div className="products">
              <Loader />
            </div>
          </>
        ) : (
          <div className="products">
            {loadedProducts.length > 0 ? (
              <>
                {loadedProducts.map((product) => (
                  <ProductCard
                    openModal={props.openModal}
                    closeModal={props.closeModal}
                    key={product.id}
                    product={product}
                    viewProduct={() => viewProduct(product.id)}
                  />
                ))}
                <div className="load-more">
                  <Button
                    disabled={disableLoadBtn}
                    onClick={loadMore}
                    title="Load More"
                    type="btn-load"
                    color="primary"
                    size="20px"
                    loading={loadMoreLoading}
                  />
                </div>
              </>
            ) : (
              <div className="no-products">No Products</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const actions = {
  getProductsForShop,
  filterProducts,
  loadMore,
  openModal,
  closeModal,
};

const mapStateToProps = (state) => ({
  products: state.products,
  loading: state.async.loading,
});

export default connect(mapStateToProps, actions)(Shop);
