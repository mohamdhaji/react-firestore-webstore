import React from "react";

export default function ContactCard(props) {
  return (
    <div className="contact-card">
      <h1>{props.title}</h1>
      {props.title === "Inquiries" ? (
        <span>{props.text}</span>
      ) : (
        props.text.map((text) => <span key={text}>{text}</span>)
      )}
    </div>
  );
}
