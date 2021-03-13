import React, { useEffect, useState } from "react";

import { GoPlusSmall as Plus } from "react-icons/go";
import { BiMinus as Minus } from "react-icons/bi";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import Slider from "@material-ui/core/Slider";

function valuetext(value) {
  return `${value}$`;
}

export default function PriceCollapse(props) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (props.initState) {
      setOpen(true);
    }
    if (props.init && props.init.length > 0) {
      setPrice(props.init);
    }
  }, [props.init]);
  const [price, setPrice] = React.useState([0, 500]);
  const handleChange = (event, newValue) => {
    setPrice(newValue);
    props.handleFilters(newValue);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleAngle = () =>
    open ? <Minus size="18px" /> : <Plus size="25px" />;

  return (
    <div className="collapse_items_wrapper">
      <List style={{ borderBottom: "1px solid #dbdbdb" }}>
        <ListItem onClick={handleClick} style={{ padding: "10px 23px 10px 0" }}>
          <ListItemText primary={props.title} className="collapse_title" />
          {handleAngle()}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Slider
            min={0}
            step={50}
            max={500}
            value={price}
            onChange={handleChange}
            onChangeCommitted={props.sliderBlur}
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
            valueLabelFormat={valuetext}
            valueLabelDisplay="auto"
          />
          <div className="price-values">
            <span>${price[0]}.00</span>
            <span>${price[1]}.00</span>
          </div>
        </Collapse>
      </List>
    </div>
  );
}
