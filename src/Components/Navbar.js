import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Your Weather");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderNavLink = (to, label) => (
    <NavLink to={to} onClick={() => handleTabClick(label)}>
      <button
        className={`text-lg font-semibold text-slate-100 ${
          activeTab === label
            ? "bg-black bg-opacity-30 p-2 rounded-md"
            : ""
        }`}
      >
        {label}
      </button>
    </NavLink>
  );

  return (
    <nav className="py-5">
      <h1 className="text-slate-100 text-4xl text-center font-bold mb-8">
        WEATHER APP
      </h1>
      <div className="max-w-[900px] mx-auto flex justify-between items-center">
       
        {renderNavLink("/user", "Your Weather")}
        {renderNavLink("/search", "Search Weather")}
        {renderNavLink("/travels", "Travelers")}
        {renderNavLink("/eventplanner", "Event Planner")}
        {renderNavLink("/farmer", "Farmers")}
      </div>
    </nav>
  );
};

export default Navbar;
