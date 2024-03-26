import React from "react";
import Cat from "../../Media/Images/Cat.JPG";
import "../CSS/Hero.css";

function HeroSection(props) {
  return (
    <section className="HeroContainer">
      <div id="Hero">
        <div className="HeroText">
          <h1>
            The <span>Bugs</span>
          </h1>
          <p>
            This site is a tribute to Irina and artificial intelligence, two
            mirrors that uniquely reflect facets of my own identity. Through
            their unpredictable behaviors and complex logical processes, I find
            a deeper understanding of myself.
          </p>
          <button>See For Yourself</button>
        </div>
        <div className="HeroVisual">
          <img src={Cat} />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
