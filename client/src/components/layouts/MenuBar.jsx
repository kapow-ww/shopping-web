import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, MenuContainer, MenuItem, Item } from "../styles/MenuBar.styled";

const MenuBar = ({ menus }) => {
  return (
    <Menu>
      <MenuContainer>
        <MenuItem>
          {menus.map((item, index) => (
            <Item key={index}>
              <NavLink to={item.url} className="link">
                {item.name}
              </NavLink>
            </Item>
          ))}
        </MenuItem>
      </MenuContainer>
    </Menu>
  );
};

export default MenuBar;
