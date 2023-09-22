import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HeroSection from "./HeroSection";

function AnimatedRoutes(props) {
  return (
    <AnimatePresence>
      <Routes>
        <Route
          path="/"
          element={
            <div className="BodyContainer">
              <HeroSection />
              <div className="AssessmentsContainer GridContainer">
                <div className="Assessments">
                  <div className="SectionText">
                    <h3>
                      The <span>Assessments</span>
                    </h3>
                    <p>
                      I'm a Developer who loves exploring new technologies to
                      bring creative solutions to life. Check out the
                      technologies I use below to see how I can help bring your
                      ideas to life.
                    </p>
                  </div>
                  <div className="Carousel">
                    <div className="Card">
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
              <div className="ResultsContainer GridContainer">
                <div className="Results">
                  <div className="SectionText">
                    <h3>
                      Your <span>Results</span>
                    </h3>
                    <p>
                      I'm a Developer who loves exploring new technologies to
                      bring creative solutions to life. Check out the
                      technologies I use below to see how I can help bring your
                      ideas to life.
                    </p>
                  </div>
                  <div className="ResultEntryContainer">
                    <div className="ResultEntry">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/settings" element={<div className="">Settings</div>} />
        <Route path="*" element={<div className="">Not Found</div>} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
