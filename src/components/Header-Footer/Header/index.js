import React from "react";
import { NavLink } from "react-router-dom";

export default function Header(props) {
  return (
    <div className="main-header">
      <div className="title">adalene.</div>
      <ul className="nav-items">
        <li>
          <NavLink
            activeStyle={{
              color: "#BC4C2A",
            }}
            style={{ color: "inherit", textDecoration: "inherit" }}
            to={"/"}
            exact
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={{
              color: "#BC4C2A",
            }}
            style={{ color: "inherit", textDecoration: "inherit" }}
            to={"/shop"}
            exact
          >
            Shop All
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={{
              color: "#BC4C2A",
            }}
            style={{ color: "inherit", textDecoration: "inherit" }}
            to={"/ourStory"}
            exact
          >
            Our Stroy
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink
            activeStyle={{
              color: "#BC4C2A",
            }}
            style={{ color: "inherit", textDecoration: "inherit" }}
            to={"/ourCraft"}
            exact
          >
            Our Craft
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={{
              color: "#BC4C2A",
            }}
            style={{ color: "inherit", textDecoration: "inherit" }}
            to={"/contact-us"}
            exact
          >
            Contact
          </NavLink>
        </li>
        {props.role === "admin" && (
          <li>
            <NavLink
              activeStyle={{
                color: "#BC4C2A",
              }}
              style={{ color: "inherit", textDecoration: "inherit" }}
              to={"/addProduct"}
              exact
            >
              Add Product
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}
