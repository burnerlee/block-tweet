import React from "react";
import "./sidebar.css";

const sideBar = (props) => {
  return <div className="sideBar">{props.children}</div>;
};

export default sideBar;
