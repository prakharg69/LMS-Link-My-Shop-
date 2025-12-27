import React from "react";
import logo from "../assets/LMS.png";

function Nav() {
  return (
    <div className="h-12 w-full bg-white rounded-2xl flex items-center px-4">
      <img src={logo} alt="Logo" className="h-10" />
    </div>
  );
}

export default Nav;
