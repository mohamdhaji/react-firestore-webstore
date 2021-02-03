import React from "react";
import facebook from "../../util/images/facebook.png";
import google from "../../util/images/google.png";
import Loader from "../../components/util/loader";
import { HiLockClosed as Lock } from "react-icons/hi";

export default function Button(props) {
  const renderTemplate = () => {
    switch (props.type) {
      case "btn-v1":
        return (
          <button onClick={props.onClick} className="btn btn-v1">
            {props.title}
          </button>
        );
      case "btn-main":
        return (
          <button
            disabled={props.disabled}
            onClick={props.onClick}
            className="btn main-btn"
          >
            {props.title}
          </button>
        );
      case "btn-load":
        return (
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
            disabled={props.disabled}
            onClick={props.onClick}
            className="btn main-btn"
          >
            {props.title}
            {props.loading ? (
              <div
                style={{ width: "15px", position: "absolute", right: "15px" }}
              >
                <Loader size={props.size} color={props.color} />
              </div>
            ) : null}
          </button>
        );
      case "btn-loading":
        return (
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
            onClick={props.onClick}
            className="btn load-btn"
            disabled={props.disabled}
          >
            {props.title}
            {props.loading ? (
              <div
                style={{ width: "15px", position: "absolute", right: "15px" }}
              >
                <Loader size="25px" color={props.color} />
              </div>
            ) : null}
          </button>
        );
      case "btn-checkout":
        return (
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
            onClick={props.onClick}
            className="btn load-btn"
            disabled={props.disabled}
          >
            <Lock size="20px" />
            {props.title}
            {props.loading ? (
              <div
                style={{ width: "15px", position: "absolute", right: "15px" }}
              >
                <Loader size="25px" color={props.color} />
              </div>
            ) : null}
          </button>
        );
      case "google-btn":
        return (
          <button onClick={props.onClick} className="btn oauth-btn google-btn">
            {" "}
            <div onClick={props.onClick} className="google-logo">
              <img src={google} alt="" />
            </div>
            {props.title}
          </button>
        );
      case "facebook-btn":
        return (
          <button
            onClick={props.onClick}
            className="btn oauth-btn facebook-btn"
          >
            <div className="facebook-logo">
              <img src={facebook} alt="" />
            </div>
            {props.title}
          </button>
        );
      case "btn-v2":
        return (
          <button onClick={props.onClick} className="btn oauth-btn btn-v2">
            {props.title}
          </button>
        );
      case "btn-v3":
        return (
          <button onClick={props.onClick} className="btn oauth-btn btn-v3">
            {props.title}
          </button>
        );

      default:
        return (
          <button onClick={props.onClick} className="btn main-btn">
            {props.title}
          </button>
        );
    }
  };

  return renderTemplate();
}
