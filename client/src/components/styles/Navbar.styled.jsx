import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { Container } from "./Global.styled";

export const Nav = styled.nav`
  background-color: #fff;
`;

export const NavContainer = styled(Container)`
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: space-between;
  /* padding: 0.5rem calc((100vw - 1000px) / 2); */
  ${Container}
`;

export const NavLogo = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 2rem;
`;

export const MobileNav = styled.div`
  display: none;

  @media screen and (max-width: 960px) {
    display: flex;
    position: absolute;
    right: 0;
    cursor: pointer;
    font-size: 2rem;
    margin-right: 50px;
  }
`;

export const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media screen and (max-width: 960px) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    opacity: 60%;
  }
`;

export const NavWithIcon = styled(NavLink)`
  display: flex;
  gap: 5px;
  align-items: center;
  &:hover {
    color: #e48586;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownContent = styled.div`
  .content-title {
    margin-top: 30px;
    font-weight: bold;
  }

  display: none;
  flex-direction: column;
  white-space: nowrap;
  position: absolute;
  background-color: #ffffff;
  padding: 12px 16px;
  border-radius: 5%;
  z-index: 1;
`;

export const Dropdown = styled(DropdownContainer)`
  .dropdown-header {
    display: flex;
    align-items: center;
    gap: 2px;
    cursor: pointer;
  }
  &:hover ${DropdownContent} {
    display: flex;
  }
`;
