import React, { Component } from "react";

import { GoPlusSmall as Plus } from "react-icons/go";
import { BiMinus as Minus } from "react-icons/bi";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
class CollapseCheckbox extends Component {
  state = {
    open: false,
    checked: [],
  };

  componentDidMount() {
    if (this.props.initState) {
      this.setState({
        open: this.props.initState,
      });
    }
    if(this.props.init){
      this.setState({
        checked:this.props.init
      })
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.collection !== this.props.collection)
    this.setState({checked:[]})
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleAngle = () =>
    this.state.open ? <Minus size="18px" /> : <Plus size="25px" />;

  renderList = () =>
    this.props.list
      ? this.props.list.map((value) => (
          <ListItem key={value.id} style={{ padding: "0 0" }}>
            <ListItemText style={{ marginLeft: "40px" }} primary={value.name} />
            <ListItemSecondaryAction>
              <Checkbox
                color="default"
                style={{marginLeft:"-15px"}}
                onChange={this.handleToggle(value.name)}
                checked={this.state.checked.indexOf(value.name) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      : null;

  handleToggle = (value) => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      // newChecked.push(parseInt(value, 10));
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState(
      {
        checked: newChecked,
      },
      () => {
        this.props.handleFilters(newChecked);
      }
    );
  };

  render() {
    return (
      <div className="collapse_items_wrapper">
        <List style={{ borderBottom: "1px solid #dbdbdb" }}>
          <ListItem
            onClick={this.handleClick}
            style={{ padding: "10px 23px 10px 0" }}
          >
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            {this.handleAngle()}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this.renderList()}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseCheckbox;
