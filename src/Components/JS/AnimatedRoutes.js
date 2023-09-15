import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes(props) {
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<div className="PageContent">Home</div>} />
        <Route
          path="/settings"
          element={<div className="PageContent">Settings</div>}
        />
        <Route
          path="*"
          element={<div className="PageContent">Not Found</div>}
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
