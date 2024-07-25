import React from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar-ops">
        <NavLink to={"/add"} className="sidebar-op">
          <img src={assets.add_icon} alt="" />
          <p>Add items</p>
        </NavLink >
        <NavLink to={"/list"} className="sidebar-op">
          <img src={assets.order_icon} alt="" />
          <p>List items</p>
        </NavLink>
        <NavLink to={"/orders"}  className="sidebar-op">
          <img src={assets.order_icon} alt="" />
          <p>orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;
