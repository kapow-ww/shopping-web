import React, { useEffect, useState } from "react";
import { readProduct } from "../../functions/product";

import { useParams } from "react-router-dom";
import { Row, Col } from "antd";

import SingleInfoCard from "../../ui/SingleInfoCard";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const SingleProduct = () => {
  const param = useParams();
  // console.log(param.id);

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    readProduct(param.id)
      .then((res) => {
        console.log(res.data.images);
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div>
      SingleProduct
      {loading ? (
        <>loading</>
      ) : (
        <Row gutter={8}>
          <Col sx={24} lg={14}>
            <Carousel dynamicHeight={true}>
              {product.images?.map((image, index) => (
                <div key={index}>
                  <img
                    src={image.response.url}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </Carousel>
          </Col>
          <Col xs={24} lg={10}>
            <SingleInfoCard product={product} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default SingleProduct;
