import React, { useState } from "react";
import Button from "../../util/button";
import OauthWithEmail from "./oauthWithEmail";

export default function Signup(props) {
  const [showLoginEmail, setShowLoginEmail] = useState(false);

  return (
    <div className="signup">
      <h1 className="title">Sign Up</h1>
      <div className="text">
        Already a member? <span onClick={props.toggleAuth}>Log In</span>
      </div>
      {showLoginEmail ? (
        <OauthWithEmail
          onClick={(email, password) => props.register(email, password)}
          type="Sign Up"
          text="or sign up with"
        />
      ) : (
        <>
          <Button
            onClick={() => props.socialLogin("facebook")}
            title="Sign up with Facebook"
            type="facebook-btn"
          />
          <Button
            onClick={() => props.socialLogin("google")}
            title="Sign up with Google"
            type="google-btn"
          />

          <div className="or-divider">
            <span className="dash"></span>
            <span>or</span>
            <span className="dash"></span>
          </div>
          <Button
            onClick={() => setShowLoginEmail(true)}
            title="Sign up with email"
            type="btn-v2"
          />
        </>
      )}
    </div>
  );
}
