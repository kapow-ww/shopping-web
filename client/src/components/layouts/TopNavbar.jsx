import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
const TopNav = styled.div`
  display: flex;
  justify-content: center;
  background-color: black;
  padding: 10px 0 10px 0;
`;

const Text = styled.span`
  color: #fff;
`;

const TopNavbar = () => {
  return (
    <TopNav>
      <Text>
        Sign up and{" "}
        <span style={{ fontWeight: "bold", color: "#fff" }}>GET 20% OFF</span>{" "}
        for your first order.{" "}
        <Link to="/register" style={{ color: "#fff" }}>
          Sign up now
        </Link>
      </Text>
    </TopNav>
  );
};

export default TopNavbar;
