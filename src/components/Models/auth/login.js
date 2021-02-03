import React, { useState } from "react";
import Button from "../../util/button";
import OauthWithEmail from "./oauthWithEmail";
export default function Login(props) {
  const [showLoginEmail, setShowLoginEmail] = useState(false);

  return (
    <div className="login">
      <h1 className="title">Log In</h1>
      <div className="text">
        New to this site? <span onClick={props.toggleAuth}>Sign Up</span>
      </div>
      {showLoginEmail ? (
        <OauthWithEmail
          onClick={(email, password) => props.login(email, password)}
          type="Log In"
          text="or log in with"
        />
      ) : (
        <>
          <Button onClick={()=>props.socialLogin("facebook")} title="Log in with Facebook" type="facebook-btn" />
          <Button onClick={()=>props.socialLogin("google")} title="Log in with Google" type="google-btn" />

          <div className="or-divider">
            <span className="dash"></span>
            <span>or</span>
            <span className="dash"></span>
          </div>
          <Button
            onClick={() => setShowLoginEmail(true)}
            title="Log in with email"
            type="btn-v2"
          />
        </>
      )}
    </div>
  );
}
