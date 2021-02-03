import React, { useState, useRef } from "react";
import { IoIosArrowDown as ArrowDown } from "react-icons/io";
import user from "../../util/images/user.png";
import {
  ControlledMenu,
  MenuItem,
  MenuDivider,
  useMenuState,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

function SingedInMenu(props) {
  // const [open, setOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const { openMenu, closeMenu, toggleMenu, ...menuProps } = useMenuState();

  const navItems = [
    { to: "/orders", name: "My Orders" },
    { to: "/addresses", name: "My Addresses" },
    { to: "/wallet", name: "My Wallet" },
    { to: "/wishlist", name: "My Wishlist" },
    { to: "/profile", name: "My Account" },
  ];

  const logout = () => {
    closeMenu();
    props.handleSignOut();
  };

  const onClick = (to) => {
    props.history.push(to);
    closeMenu();
  };

  const ref = useRef(null);

  const toggle=()=>{
    setOpen(!isOpen)
    if(isOpen)
    closeMenu()
    else 
    openMenu()

  }

  return (
    <div className="signedIn-menu">
      <div ref={ref} onClick={() => toggle()} className="title">
        <img
          className="user-image"
          src={props.profile.photoURL || user}
          style={{ borderRadius: "50%", width: "33px" }}
          alt=""
        />
        <div className="username">{props.profile.displayName}</div>
        <div className="icon">
          <ArrowDown size="18px" />
        </div>
      <div className="controlled-menu">
        <ControlledMenu onClose={() => closeMenu()} {...menuProps}   >
          {navItems.map((item) => (
            <MenuItem key={item.to} onClick={() => onClick(item.to)}>
              {" "}
              {item.name}
            </MenuItem>
          ))}
          <MenuDivider />

          <MenuItem onClick={logout}>Log Out</MenuItem>
        </ControlledMenu>
      </div>
      </div>

      {/* {open ? (
        <ul className="dropdown">
          {navItems.map((item) => (
            <li onClick={() => onClick(item.to)} key={item.to}>
              {item.name}
            </li>
          ))}
          <li className="dash"></li>
          <li onClick={logout}>Log Out</li>
        </ul>
      ) : null} */}
    </div>
  );
}

export default SingedInMenu;
