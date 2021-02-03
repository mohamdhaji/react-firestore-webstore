import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loader(props) {
  const color = props.color || "primary"
  const size = props.size || "40px"
  return (
    <div className="loader">
      <CircularProgress color={color} size={size} disableShrink />
    </div>
  );
}
