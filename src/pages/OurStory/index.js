import React from "react";
import AboutUsCard from "../../components/util/cards/aboutUsCard";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default function OurStory() {
  return (
    <div className="our-store our-story">
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName="SlideOut"
      >
        <div className="main-title">OUR STORY</div>
      </ReactCSSTransitionGroup>

      <div className="features">
        <AboutUsCard title="THE BRAND" />

        <div className="feature"></div>
        <div className="feature"></div>
        <AboutUsCard title="THE DESIGNERS" />
      </div>
    </div>
  );
}
