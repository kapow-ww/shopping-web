import { styled } from "styled-components";
import { Container } from "./Global.styled";
export const Menu = styled.div`
  width: 100%;
  background-color: #c3c3c3;
`;

export const MenuContainer = styled(Container)`
  ${Container}
`;

export const MenuItem = styled.ul`
  display: flex;
  align-items: center;
  height: 40px;
  gap: 2rem;
  /* justify-content: center; */
`;

export const Item = styled.li`
  list-style: none;
  .link {
    text-decoration: none;
    color: inherit;
  }
`;
