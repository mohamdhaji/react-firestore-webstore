import React from "react";
import AboutUsCard from "../../components/util/cards/aboutUsCard";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default function OurCraft() {
  return (
    <div className="our-store our-craft">
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName="SlideOut"
      >
        <div className="main-title">THE PROCESS</div>
      </ReactCSSTransitionGroup>

      <div className="features">
        <AboutUsCard title="DESIGN" />

        <div className="feature"></div>
        <div className="feature"></div>
        <AboutUsCard title="SELECTION" />
        <AboutUsCard title="CRAFTSMANSHIP" />

        <div className="feature"></div>
      </div>
    </div>
  );
}
