import React, { useState, useEffect } from "react";
import { listProductBy } from "../../functions/product";
import ProductCard from "../../ui/ProductCard";

import { List } from "antd";
import LoadingCard from "../../ui/LoadingCard";

const NewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    listProductBy("createdAt", "desc", 3)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <List
      grid={{
        column: 3,
        gutter: 16,
        xs: 1,
      }}
      dataSource={products}
      renderItem={(item) => (
        <List.Item>
          {loading ? (
            <LoadingCard />
          ) : (
            <ProductCard product={item}></ProductCard>
          )}
        </List.Item>
      )}
    />
  );
};

export default NewProduct;
