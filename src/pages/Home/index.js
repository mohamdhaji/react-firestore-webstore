import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/util/cards/productCard";

import img2 from "../../util/images/img2.jpeg";
import img4 from "../../util/images/img4.jpeg";

import img5 from "../../util/images/img5.jpeg";
import img6 from "../../util/images/img6.jpeg";
import img7 from "../../util/images/img7.jpeg";

import img14 from "../../util/images/img14.jpeg";
import img15 from "../../util/images/img15.jpeg";
import img16 from "../../util/images/img16.jpeg";
import img17 from "../../util/images/img17.jpeg";
import img18 from "../../util/images/img18.jpeg";

import Loader from "../../components/util/loader";
import product from "../../util/images/product.png";
import back from "../../util/images/back.png";
import next from "../../util/images/next.png";
import Slider from "react-slick";
import AboutCard from "../../components/util/cards/aboutCard";
import Button from "../../components/util/button";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { connect } from "react-redux";
import { getProductsForHome } from "../../actions/productActions";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
import { openModal, closeModal } from "../../actions/modalActions";

function Home(props) {
  const ArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img
      {...props}
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      className={
        "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
      }
      alt=""
      src={back}
    />
  );
  const ArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img
      size="30px"
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      color="black"
      alt=""
      src={next}
    />
  );
  const config = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,

    rows: 1,
  };

  const viewProduct = (id)=>{
    props.history.push({
      pathname:"/product/"+id,
      state: { collection: "Best Sellers" }
    })
  }

  useEffect(() => {
    props.getProductsForHome();
  }, []);

  const aboutCards = [
    {
      title: "Family Owned",
      text: "BRAND",
      to: "/",
      linkText: "Read our story",
      background: img5,
    },
    {
      title: "Hand Crafted",
      text: "PRODUCTS",
      to: "/",
      linkText: "About our leather",
      background: img6,
    },
    {
      title: "Created in the",
      text: "USA",
      to: "/",
      linkText: "learn our process",
      background: img7,
    },
  ];
  

  return (
    <div className="home">
      <section className="main-section">
        <div className="black-shadow"></div>
        <ReactCSSTransitionGroup
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
          transitionName="SlideOut"
        >
          <div className="title">CUE THE COLOR</div>
          <Button title="Shop the collection" type="btn-v1" />
        </ReactCSSTransitionGroup>
      </section>
      <div className="best-sell-products">
        <div className="title">BEST SELLERS</div>
        {props.loading ? (
          <Loader />
        ) : (
          <>
            <div className="dash" />
            <div className="slider">
              <LazyLoadComponent key={product.id}>
                <Slider {...config}>
                  {props.products.length > 0
                    ? props.products.map((product) => (
                        <ProductCard
                          openModal={props.openModal}
                          closeModal={props.closeModal}
                          key={product.id}
                          product={product}
                          viewProduct={()=>viewProduct(product.id)}
                        />
                      ))
                    : ""}
                </Slider>
              </LazyLoadComponent>
            </div>

            <Button title="Shop All Bags" type="btn-main" />
          </>
        )}
      </div>
      <div className="features">
        <div className="feature img-feature">
          {/* <LazyLoadImage src={img2}></LazyLoadImage> */}
          <img src={img2} alt=""/>
          <div>
            <button className="label-btn">Add to Cart</button>
            <div className="product-card__footer">
              <div className="name">i'm a product</div>
              <div className="price">$100.00</div>
            </div>
          </div>
        </div>
        <div className="feature feature__two">
          <div className="black-shadow"></div>
          <div className="title"> MINI LEATHER GOODS</div>
        </div>
        <div className="feature feature__three">
          <div className="black-shadow"></div>
          <div className="title">LEATHER BELTS</div>
        </div>
        <div className="feature img-feature feature__four">
          {/* <LazyLoadImage src={img4}></LazyLoadImage> */}
          <img src={img4} alt=""/>
          <div>
            <button className="label-btn">Add to Cart</button>
            <div className="product-card__footer">
              <div className="name">i'm a product</div>
              <div className="price">$50.00</div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-us">
        {aboutCards.map((card) => (
          <LazyLoadComponent key={card.title}>
            <AboutCard key={card.title} card={card} />
          </LazyLoadComponent>
        ))}
      </div>
      <div className="shopping-info">
        <div>
          <h2>FOLLOW</h2>
          <h3>ADALENE ON INSTAGRAM</h3>
          <span>@adaleneshop</span>

          <div className="photos">
            <img src={img14} alt=""></img>
            <img src={img16} alt=""></img>
            <img src={img17} alt=""></img>
            <img src={img15} alt=""></img>
            <img src={img18} alt=""></img>
          </div>
          <div className="desc">
            <div>
              <div className="dash" />
              <div className="title">Worldwide shipping</div>
            </div>
            <div>
              <div className="dash" />
              <div className="title">Easy 30 day returns</div>
            </div>
            <div>
              <div className="dash" />
              <div className="title">12 month warranty</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  products: state.products,
  loading: state.async.loading,
});

const actions = {
  openModal,
  closeModal,
  getProductsForHome,
};

export default connect(mapStateToProps, actions)(Home);
