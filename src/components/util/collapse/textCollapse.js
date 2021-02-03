import React, { useEffect, useState } from "react";

import { GoPlusSmall as Plus } from "react-icons/go";
import { CgMathMinus as Minus } from "react-icons/cg";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
export default function TextCollapse(props) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (props.initState) {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (
      props.closeCollapse !== "not set" &&
      props.closeCollapse !== props.title
    )
      setOpen(false);
  }, [props.closeCollapse]);

  const handleClick = () => {
    setOpen(!open);
    props.closeOtherCollapse();
  };

  const handleAngle = () =>
    open ? (
      <Minus color="#bc4c2a" className="icon" size="22px" />
    ) : (
      <Plus color="#bc4c2a" className="icon" size="22px" />
    );

  return (
    <div className="collapse_items_wrapper">
      <List style={{ borderBottom: "1px solid #dbdbdb" }}>
        <ListItem onClick={handleClick} style={{ padding: "10px 23px 10px 0" }}>
          <ListItemText primary={props.title} className="collapse_title" />
          {handleAngle()}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <div>{props.children}</div>
        </Collapse>
      </List>
    </div>
  );
}
