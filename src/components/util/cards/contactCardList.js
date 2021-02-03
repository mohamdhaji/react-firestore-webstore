import React from "react";
import ContactCard from "./contactCard";
export default function ContactCardList(props) {
  return (
    <div className="contact-cards">
      {props.data.map((el,i) => (
        <ContactCard key={i} title={el.title || ""} text={el.text} />
      ))}
    </div>
  );
}
