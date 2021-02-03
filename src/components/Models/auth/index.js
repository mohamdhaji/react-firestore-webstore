import React, { useState } from "react";
import { AiOutlineClose as Close } from "react-icons/ai";
import Login from "./login";
import Signup from "./signup";
import { connect } from "react-redux";
import {login,register,socialLogin} from "../../../actions/auth"
function AuthModel(props) {
  const [showSignUp, setShowSignUp] = useState(true);

  const toggleAuth = (value) => {
    setShowSignUp(value);
  };

  return (
    <div className="auth-model">
      <div>
        <Close className="close-icon" onClick={props.closeModal} size="30px" />
        {showSignUp ? (
          <Signup socialLogin={props.socialLogin} register={props.register} toggleAuth={() => toggleAuth(false)} />
        ) : (
          <Login socialLogin={props.socialLogin} login={props.login} toggleAuth={() => toggleAuth(true)} />
        )}
      </div>
    </div>
  );
}

const actions = {
  login,
  register,
  socialLogin

}

export default connect(null,actions)(AuthModel);
