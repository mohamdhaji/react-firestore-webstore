import React from "react";
import ProfileHeader from "../Header";

function UserLayout(props) {
  return (
    <div className="user-layout">
      <ProfileHeader />
      <section  style={{ paddingLeft: "20px" }}>{props.children}</section>
    </div>
  );
}

export default UserLayout;
