import React from "react";
import { Link } from "react-router-dom";

const MenuBar = ({ menus }) => {
  return (
    <div>
      <ul>
        {menus.map((item, index) => (
          <li key={index}>
            <Link to={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuBar;
