import React from "react";
import { Link } from "react-router-dom";
import { Menu, MenuContainer, MenuItem, Item } from "../styles/MenuBar.styled";

const MenuBar = ({ menus }) => {
  return (
    <Menu>
      <MenuContainer>
        <MenuItem>
          {menus.map((item, index) => (
            <Item key={index}>
              <Link to={item.url} className="link">
                {item.name}
              </Link>
            </Item>
          ))}
        </MenuItem>
      </MenuContainer>
    </Menu>
  );
};

export default MenuBar;
