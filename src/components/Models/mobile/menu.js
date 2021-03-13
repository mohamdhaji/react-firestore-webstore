import React from "react";
import { AiOutlineClose as Close } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";

const Menu = (props) => {
  let history = useHistory();
  return (
    <div className="main-menu__mobile">
      <Close className="close-icon" onClick={props.closeModal} size="30px" />
      {props.authenticated ? (
        <div
          onClick={() => {
            props.handleSignOut();
            props.closeModal();
            history.push("/");
          }}
          className="login"
        >
          Logout
        </div>
      ) : (
        <div
          onClick={() => {
            props.closeModal();
            props.openModal("AuthModel");
          }}
          className="login"
        >
          Login
        </div>
      )}
      <div class="items">
        <Link onClick={props.closeModal} to="/">
          Home
        </Link>
        <Link onClick={props.closeModal} to="shop">
          Shop
        </Link>
        <Link onClick={props.closeModal} to="ourCraft">
          Our Craft
        </Link>
        <Link onClick={props.closeModal} to="ourStory">
          Our Stroy
        </Link>
        <Link onClick={props.closeModal} to="contact-us">
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Menu;
