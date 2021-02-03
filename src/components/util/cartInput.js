import React, { useState } from "react";
import { GoPlusSmall as Plus } from "react-icons/go";
import { CgMathMinus as Minus } from "react-icons/cg";

 function CartInput(props) {
  const [quantity, setQuantity] = useState(props.value);
  const [pointerEvents, setPointerEvents] = useState("unset");
  const onChange = ({ target }) => {
    if (target.value <= props.productQuantity && target.value >= 0)
      setQuantity(target.value);
  };

  const addOne = async () => {
    if (props.productQuantity > 0) {
      try {
        setPointerEvents("none");
        await props.addOne();
        setQuantity(quantity + 1);
        setTimeout(() => {
          setPointerEvents("unset");
        }, 400);
      } catch (error) {}
    }
  };
  const removeOne = async () => {
    if (quantity > 0) {
      try {
        setPointerEvents("none");
        await props.removeOne();
        setQuantity(quantity - 1);
        setTimeout(() => {
          setPointerEvents("unset");
        }, 400);
      } catch (error) {}
    }
  };

  return (
    <div className="cart-input">
      <Minus
        style={{ pointerEvents: pointerEvents }}
        onClick={removeOne}
        size="16px"
        className="minus"
      />
      <input
        onChange={onChange}
        max={props.productQuantity}
        value={quantity}
        type="number"
      ></input>
      <Plus
        style={{ pointerEvents: pointerEvents }}
        onClick={addOne}
        size="19px"
        className="plus"
      />
    </div>
  );
}

export default CartInput;