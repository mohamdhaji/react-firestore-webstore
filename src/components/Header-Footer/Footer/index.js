import React from "react";
import Item from "./item";
export default function Footer() {
  const items = [
      {
          element:"adalene"
      },
    {
      element: "default",
      items: ["Home", "Shop All", "Our Story", "Our Craft", "Contact"],
    },
    {
      element: "default",
      items: [
        "FAQ",
        "Shipping & Returns",
        "Store Policy",
        "Payment Methods",
        "Stockists",
      ],
    },
    {
      element: "default",
      items: ["Facebook", "Instagram", "Twitter", "Pinterest"],
    },{
        element:"contact"
    }
  ];

  return (
    <footer className="footer">
      {items.map((item,i) => (
        <Item key={i}data={item} />
      ))}
    </footer>
  );
}
