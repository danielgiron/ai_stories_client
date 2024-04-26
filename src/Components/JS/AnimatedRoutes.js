import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./Home";
import GPT_Console from "./GPT_Console";
import Landing from "./Landing";
import JournalHistory from "./JournalHistory";

function AnimatedRoutes(props) {
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<div className="">Settings</div>} />
        <Route path="/assessment/:ID_Param" element={<GPT_Console />} />
        <Route path="/assessment" element={<GPT_Console />} />
        <Route path="/JournalHistory" element={<JournalHistory />} />
        <Route path="*" element={<div className="">Not Found</div>} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
