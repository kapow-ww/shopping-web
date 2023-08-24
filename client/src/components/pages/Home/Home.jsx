import React from "react";
import BestSeller from "./BestSeller";
import NewProduct from "./NewProduct";

import { HomeContainer } from "../../styles/Home.styled";

const Home = () => {
  return (
    <HomeContainer>
      <div>
        <div>สินค้ามาใหม่</div>
        <NewProduct />
      </div>

      <div>
        <div>สินค้าขายดี</div>
        <BestSeller />
      </div>
    </HomeContainer>
  );
};

export default Home;
