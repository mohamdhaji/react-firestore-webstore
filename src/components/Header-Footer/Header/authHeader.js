import React from "react";

import { TiSocialFacebook as Facebook } from "react-icons/ti";
import { AiOutlineInstagram as Insta } from "react-icons/ai";
import { FaTwitter as Tweet, FaPinterestP as Pinterest } from "react-icons/fa";
import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
import SignInMenu from "../../util/signedInMenu";
import { withRouter } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { cartQuery } from "../../../querys";
import { RiMenuLine as Menu } from "react-icons/ri";

function AuthHeader(props) {
  const handleSignOut = () => {
    props.firebase.logout();
    props.history.push("/");
  };

  const { auth, profile } = props;
  const authenticated = auth.isLoaded && !auth.isEmpty;
  const admin = profile.role ? "admin" : null;

  const openCart = () => {
    if (authenticated)
      props.openModal("CartModel", {
        uid: props.auth.uid,
        closeModal: props.closeModal,
        // cart:props.cart,
        // cartTotal:props.profile.cart
      });
  };

  return (
    <div className="auth-header">
      <div className="identity-providers">
        <div>
          <Facebook size="30px" />
          <Insta size="25px" />
          <Tweet size="25px" />
          <Pinterest size="25px" />
        </div>
      </div>
      <ul className="user">
        <Menu
          onClick={() => props.openModal("Menu",{
            openModal:props.openModal,
            authenticated,
            handleSignOut:handleSignOut
          })}
          className="menu"
          size="30px"
        />
        {admin === "admin" ? (
          <li className="admin">Admin</li>
        ) : (
          <li onClick={openCart} className="cart-item">
            Cart ({props.profile.cart || 0})
          </li>
        )}

        {authenticated ? (
          <li>
            <SignInMenu
              history={props.history}
              profile={profile}
              handleSignOut={handleSignOut}
            />
          </li>
        ) : (
          <li
            className="login-item"
            onClick={() => props.openModal("AuthModel")}
          >
            Login
          </li>
        )}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  // cart:state.firestore.ordered.cart
});

export default compose(
  withRouter,
  connect(mapStateToProps),
  withFirebase,
  firestoreConnect((props) => cartQuery(props.auth.uid))
)(AuthHeader);
