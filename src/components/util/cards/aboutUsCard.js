import React from "react";
import DashTitle from "../dashTitle";
export default function AboutUsCard(props) {
  return (
    <div className="feature">
      <DashTitle title={props.title} />
      <p className="text">
        <span> I'm a paragraph. Click here to add your own text and</span>
        <span>
          edit me. It’s easy. click “Edit Text” or double click me to{" "}
        </span>
        <span>add your own content and make changes to the font.</span>

        <span>Feel free to drag and drop me anywhere you like on</span>
        <span>your page. I’m a great place for you to tell a story and</span>
        <span>let your users know a little more about you.</span>
      </p>
    </div>
  );
}
