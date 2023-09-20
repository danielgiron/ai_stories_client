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
              <div className="AssessmentsContainer">
                <div className="Assessments">Assessments</div>
              </div>
              <div className="ResultsContainer">
                <div className="Results">Results</div>
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
