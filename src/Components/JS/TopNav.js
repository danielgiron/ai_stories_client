import React from "react";
import "../CSS/TopNav.css";

function TopNav(props) {
  return (
    <nav id="TopNav">
      <div id="TopNavContainer">
        <div id="Logo">
          a<span>Irina</span>
        </div>
        <div id="Menu">
          <div className="Menu-Line Top" />
          <div className="Menu-Line Center" />
          <div className="Menu-Line Bottom" />
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
