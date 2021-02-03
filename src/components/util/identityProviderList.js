import React from "react";
import facebook from "../../util/images/facebook-v2.png";
import google from "../../util/images/google-v2.png";

export default function IdentityProviderList() {
  return (
    <div className="identity-provider">
      <img src={facebook} alt="" />
      <img src={google} alt="" />
    </div>
  );
}
