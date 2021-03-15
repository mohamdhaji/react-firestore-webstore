import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/hoc/layout";
import Loader from "./components/util/loader";

const Shop = React.lazy(() => import("./pages/Shop"));
const OurStroy = React.lazy(() => import("./pages/OurStory"));
const OurCraft = React.lazy(() => import("./pages/OurCraft"));
const Contact = React.lazy(() => import("./pages/Contact"));
const AddProduct = React.lazy(() => import("./pages/Admin/add_product"));
const Profile = React.lazy(() => import("./pages/User/Profile"));
const Product = React.lazy(() => import("./pages/Product"));
const Cart = React.lazy(() => import("./pages/User/Cart"));
const Wallet = React.lazy(() => import("./pages/User/Wallet"));
const Address = React.lazy(() => import("./pages/User/Addresses"));
const WishList = React.lazy(() => import("./pages/User/WishList"));

export default function Routes() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter basename="adalene-webstore">
        <Layout>
          <Switch>
            <Route path="/shop" component={Shop} />
            <Route path="/ourStory" component={OurStroy} />
            <Route path="/ourCraft" component={OurCraft} />
            <Route path="/contact-us" component={Contact} />
            <Route path="/addProduct" component={AddProduct} />
            <Route path="/product/:id" component={Product} />
            <Route path="/profile" component={Profile} />
            <Route path="/cart" component={Cart} />
            <Route path="/myAddress" component={Address} />
            <Route path="/wallet" component={Wallet} />
            <Route path="/wishlist" component={WishList} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Suspense>
  );
}
