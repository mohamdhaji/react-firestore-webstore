import React from "react";

export default function Item(props) {
  const renderTemplate = () => {
    let template = null;
    switch (props.data.element) {
      case "contact":
        template = (
          <ul className="contact-us">
            <li>JOIN US!</li>
            <li>Email *</li>
            <li>
              <input type="text" name="message"></input>
            </li>
            <li>
              {" "}
              <button className="btn">Send</button>
            </li>
          </ul>
        );

        break;
      case "adalene":
        template = <div className="adalene">adalene.</div>;
        break;
      default:
        template = (
          <ul>
            {props.data.items.map((el) => (
              <li key={el}>{el}</li>
            ))}
          </ul>
        );
    }
    return template;
  };

  return <div className="footer__item">{renderTemplate()}</div>;
}
