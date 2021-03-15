import React from "react";
import { connect } from "react-redux";
import user from "../../../util/images/user.png";
import { BsThreeDotsVertical as Dots } from "react-icons/bs";
import { Link, withRouter } from "react-router-dom";

function ProfileHeader(props) {
  const navItems = [
    { to: "/cart", name: "My Cart" },
    { to: "/myAddress", name: "My Addresses" },
    { to: "/wallet", name: "My Wallet" },
    { to: "/wishlist", name: "My Wishlist" },
    { to: "/profile", name: "My Account" },
  ];

  return (
    <div className="user-profile__header">
      <div className="user-profile__card">
        <img
          className="userphoto"
          src={props.profile.photoURL || user}
          alt=""
        />
        <span className="username">{props.profile.displayName}</span>
        <Dots className="dots" color="#fff" size="30px" />
      </div>
      <ul className="nav-items">
        {navItems.map((item) => (
          <li key={item.to}>
            <Link
              style={{
                borderTop: `${
                  props.location.pathname === item.to
                    ? "4px solid #546E7A"
                    : "4px solid #fff"
                }`,
              }}
              to={item.to}
            >
              {" "}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
// border-top: 4px solid #bc4c2a;

const mapStateToProps = (state) => ({
  profile: state.firebase.profile,
});

export default withRouter(connect(mapStateToProps)(ProfileHeader));
// export default connect(mapStateToProps)(withRouter(ProfileHeader));
