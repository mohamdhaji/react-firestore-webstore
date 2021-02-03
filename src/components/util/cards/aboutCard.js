import React from "react";
import { Link } from "react-router-dom";
export default function AboutCard(props) {
  const { background, title, text, to, linkText } = props.card;
  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="about-card"
    >
      <div className="black-shadow"></div>

      <div className="title">{title}</div>
      <div className="text">{text}</div>
      <div className="dash"></div>
      <Link to={to}>{linkText}</Link>
    </div>
  );
}
