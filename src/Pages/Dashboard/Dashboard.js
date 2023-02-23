import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../../Images/logo.svg";

const Dashboard = () => {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Outlet></Outlet>
      </div>
      <div className="drawer-side shadow-md">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-70 bg-base-100 text-base-content">
          <div className="pt-5 pb-8 border-b rounded-none flex items-center gap-3">
            <img src={Logo} alt="" className="w-12" />
            <h2 className="text-primary font-extrabold text-3xl">
              School Space
            </h2>
          </div>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
