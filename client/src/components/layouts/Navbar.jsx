import React, { useState } from "react";

import { BiUser, BiCartAdd, BiChevronDown, BiMenu } from "react-icons/bi";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { selectUser } from "../reducers";

import { styled } from "styled-components";

const StyledNavLink = styled(NavLink)`
  color: black;
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [openNav, setOpenNav] = useState(false);
  const handleOpenNav = () => setOpenNav(!openNav);
  // console.log(user);

  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <StyledNavLink to="/">shop</StyledNavLink>
        </div>
        <nav>
          <ul>
            <li>
              <StyledNavLink to="/">Home</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="shop">Shop</StyledNavLink>
            </li>
            {user && user.role === "admin" && (
              <li>
                <StyledNavLink to="/admin/dashboard">Admin</StyledNavLink>
              </li>
            )}
            <li>
              {user ? (
                <div className="login">
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
                </div>
              ) : (
                <StyledNavLink to="login">
                  <BiUser /> Login
                </StyledNavLink>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
