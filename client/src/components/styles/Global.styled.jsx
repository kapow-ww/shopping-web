import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Taviraj', serif;
    }

    body{
        /* background-color: #c77e7e; */
    }
`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1500px;
  margin-right: auto;
  margin-left: auto;
  padding-left: 50px;
  padding-right: 50px;

  @media screen and(max-width:991px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

export default GlobalStyle;
