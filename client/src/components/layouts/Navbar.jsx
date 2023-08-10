import React, { useState } from "react";
import {
  Nav,
  NavContainer,
  NavLogo,
  NavWrapper,
  NavLink,
  NavWithIcon,
  MobileNav,
  Dropdown,
  DropdownContent,
} from "../styles/Navbar.styled";

import { BiUser, BiCartAdd, BiChevronDown, BiMenu } from "react-icons/bi";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { selectUser } from "../reducers";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [openNav, setOpenNav] = useState(false);
  const handleOpenNav = () => setOpenNav(!openNav);
  // console.log(user);

  return (
    <Nav>
      <NavContainer>
        <NavLogo to="/home">SHOP</NavLogo>

        <MobileNav onClick={handleOpenNav}>
          {openNav ? <BiChevronDown /> : <BiMenu />}
        </MobileNav>

        <NavWrapper>
          <Dropdown>
            <span className="dropdown-header">
              Category
              <BiChevronDown />
            </span>
            <DropdownContent>
              <span className="content-title">Popular Category</span>
              <NavLink>asdasd</NavLink>
              <NavLink>asdasd</NavLink>
              <NavLink>asdasd</NavLink>
              <NavLink>asdasd</NavLink>
              <NavLink>asdasd</NavLink>
            </DropdownContent>
          </Dropdown>
          <NavLink to="/deal">Deals</NavLink>
          <NavLink to="/what-new">What'new</NavLink>

          {user && user.role === "admin" && (
            <NavLink to="/admin/dashboard" danger="true">
              Admin
            </NavLink>
          )}
        </NavWrapper>

        <NavWrapper>
          <NavWithIcon to="/cart">
            <BiCartAdd />
            <span>Cart</span>
          </NavWithIcon>

          {/* check login */}
          {user ? (
            <>
              <span style={{ fontWeight: "bold" }}>{user.username}</span>
              <div
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => {
                  dispatch({ type: "LOGOUT", payload: null });
                  navigate("/");
                }}
              >
                Logout
              </div>
            </>
          ) : (
            <NavWithIcon to="/login">
              <BiUser />
              <span>Account</span>
            </NavWithIcon>
          )}
        </NavWrapper>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
