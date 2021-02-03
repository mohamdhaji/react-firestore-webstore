import React, { useEffect, useState } from "react";

import { GoPlusSmall as Plus } from "react-icons/go";
import { BiMinus as Minus } from "react-icons/bi";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
export default function ListCollapse(props) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (props.initState) {
      setOpen(true);
    }
  }, []);

  const [selectedCollection, setSelectedCollection] = useState("All");

  const handleClick = () => {
    setOpen(!open);
  };

  const handleAngle = () =>
    open ? <Minus size="18px" /> : <Plus size="25px" />;

  const handleOnClickItem = (value,collection) => {
    setSelectedCollection(value);
    props.handleFilters(value,collection)
  };
  const renderList = () =>
    props.list
      ? props.list.map((value) => (
          <ListItem key={value.id} style={{ padding: "0 0" }}>
            <ListItemText
              className="collection-item__filter"
              style={{
                fontWeight: `${
                  value.name === selectedCollection ? "700" : "200"
                }`,
              }}
              onClick={() => handleOnClickItem(value.name,value.id)}
              primary={value.name}
            />
          </ListItem>
        ))
      : null;

  return (
    <div className="collapse_items_wrapper">
      <List style={{ borderBottom: "1px solid #dbdbdb" }}>
        <ListItem onClick={handleClick} style={{ padding: "10px 23px 10px 0" }}>
          <ListItemText primary={props.title} className="collapse_title" />
          {handleAngle()}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {renderList()}
          </List>
        </Collapse>
      </List>
    </div>
  );
}
