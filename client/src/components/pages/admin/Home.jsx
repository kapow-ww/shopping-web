import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { selectUser } from "../../reducers";

import { listProduct, removeProduct } from "../../functions/product";
import ProductCard from "../../ui/ProductCard";

import { Col, Row } from "antd";

import { toast } from "react-toastify";

const Home = () => {
  const user = useSelector(selectUser);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProduct(5);
  }, []);

  const loadProduct = (count) => {
    setLoading(true);
    listProduct(count)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("Delete ?")) {
      removeProduct(user.token, id)
        .then((res) => {
          console.log(res);
          toast.success(`ลบ ${res.data.title} เสร็จสิ้น`);
          loadProduct(5);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <h1>Home Admin</h1>
      <div>
        {loading ? (
          <>...loading</>
        ) : (
          <Row gutter={[16, 16]} justify="space-between">
            {products.map((product, index) => (
              <Col span={8} key={index}>
                <ProductCard product={product} handleRemove={handleRemove} />
              </Col>
            ))}
          </Row>
        )}
      </div>

      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
};

export default Home;
