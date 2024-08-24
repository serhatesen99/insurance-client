import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import NavScrollExample from "./navbar";
import allianzLogo from "../assets/allianzLogo.png";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <img src={allianzLogo} alt="Allianz Logo" className="logo" />
        <NavScrollExample />
        <button>Online İşlemler</button>
      </div>
    </header>
  );
};

export default Header;
