import React from "react";
import ProfileHeader from "../Header";

function UserLayout(props) {
  return (
    <div className="user-layout">
      <ProfileHeader />
      <div style={{ paddingLeft: "20px" }}>{props.children}</div>
    </div>
  );
}

export default UserLayout;
