import "./App.css";
import GPT_Console from "./Components/JS/GPT_Console";
import AnimatedRoutes from "./Components/JS/AnimatedRoutes";
import TopNav from "./Components/JS/TopNav";
import Footer from "./Components/JS/Footer";
import HeroSection from "./Components/JS/HeroSection";

function App() {
  return (
    <div className="App ">
      <TopNav />
      {/* <HeroSection /> */}

      <AnimatedRoutes />

      <Footer />
    </div>
  );
}

export default App;
