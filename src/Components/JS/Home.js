import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Home.css";
import HeroSection from "./HeroSection";
//import './Home.css'

function Home(props) {
  const navigate = useNavigate();

  const SavedEntries_Keys = JSON.parse(localStorage.getItem("SavedEntries"));
  const SavedEntries = SavedEntries_Keys.map((key, index) => {
    return JSON.parse(localStorage.getItem(`${key}`));
  });
  console.log({ SavedEntries });

  // useEffect(() => {
  //   console.log(SavedEntries);
  //   console.log(
  //     JSON.parse(localStorage.getItem("chatcmpl-867zIX476EyoS7OMrsWiFGmPXKtaR"))
  //   );
  // }, []);

  return (
    <div className="HomeContainer">
      {/* <HeroSection /> */}
      <div className="JournalContainer SectionContainer">
        <div className="JournalSection GridLayout">
          <div className="SectionText">
            <h3>
              What's on <span>Your Mind</span> Today?
            </h3>
            <p>
              I'm a Developer who loves exploring new technologies to bring
              creative solutions to life. Check out the technologies I use below
              to see how I can help bring your ideas to life.
            </p>
            <div className="ButtonsContainer">
              <button className="Primary">Start Today's Journal</button>
              <button
                className="Secondary"
                onClick={() => {
                  navigate("/JournalHistory");
                }}
              >
                See Previous Journals
              </button>
            </div>
            <div className="LandingImageContainer">
              <img />
              <div className="GradientLayer" />
            </div>
          </div>
        </div>
      </div>
      <div className="StoriesContainer SectionContainer">
        <div className="StoryModes GridLayout">
          <div className="SectionText">
            <h3>
              The <span>Stories</span>
            </h3>
            <p>
              I'm a Developer who loves exploring new technologies to bring
              creative solutions to life. Check out the technologies I use below
              to see how I can help bring your ideas to life.
            </p>
          </div>
          <div className="Carousel">
            <div
              className="Card"
              onClick={() => {
                navigate(`/assessment`);
              }}
            >
              <h4>The First One</h4>
            </div>
            <div className="Card">
              <h4>The Second One</h4>
            </div>
            <div className="Card">
              <h4>The Third One</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="ResultsContainer SectionContainer">
        <div className="Results GridLayout">
          <div className="SectionText">
            <h3>
              Your <span>Results</span>
            </h3>
            <p>
              I'm a Developer who loves exploring new technologies to bring
              creative solutions to life. Check out the technologies I use below
              to see how I can help bring your ideas to life.
            </p>
          </div>
          <div className="ResultEntryContainer">
            {SavedEntries.map((Entry, index) => {
              return (
                <div className="ResultEntry GridLayout" key={index}>
                  <div className="ResultEntryName">{`Entry No.${Entry.id}`}</div>
                  <button
                    onClick={() => {
                      navigate(`/assessment/${Entry.id}`);
                    }}
                  >
                    More
                  </button>
                </div>
              );
            })}
            {/* <div className="ResultEntry">
              <div className="ResultEntryName">First Result</div>
              <button>More</button>
            </div>
            <div className="ResultEntry">
              <div className="ResultEntryName">Second Result</div>
              <button>More</button>
            </div>
            <div className="ResultEntry">
              <div className="ResultEntryName">Third Result</div>
              <button>More</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
