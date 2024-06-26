import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/TopNav.css";

function TopNav(props) {
  const [navState, navStateToggle] = useState(false);
  return (
    <nav id="TopNav">
      <div id="TopNavContainer" className="GridLayout">
        <div id="Logo">
          The <span>Bugs</span>
        </div>
        <div
          id="NavMenu"
          className={`${navState ? "Active" : ""}`}
          onClick={() => {
            navStateToggle(!navState);
          }}
        >
          <div className="Menu-Line Top" />
          <div className="Menu-Line Center" />
          <div className="Menu-Line Bottom" />
          <ul className="LinksList">
            <Link to="/" className="NavLink">
              Home
            </Link>
            <Link to="/settings" className="NavLink">
              Settings
            </Link>
            <Link to="https://v2bdg.netlify.app" className="NavLink">
              Baldwin
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
