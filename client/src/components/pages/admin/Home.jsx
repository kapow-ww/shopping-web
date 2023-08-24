import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { selectUser } from "../../reducers";

import { listProduct, removeProduct } from "../../functions/product";
import AdminProductCard from "../../ui/AdminProductCard";

import { Col, Row, List } from "antd";

import { toast } from "react-toastify";

const Home = () => {
  const user = useSelector(selectUser);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProduct(10);
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
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={products}
            renderItem={(item) => (
              <List.Item>
                <AdminProductCard product={item} handleRemove={handleRemove} />
              </List.Item>
            )}
          ></List>
        )}
      </div>

      {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
    </div>
  );
};

export default Home;
