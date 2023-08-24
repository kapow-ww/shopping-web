import React from "react";
import { Card, Typography, Badge } from "antd";

import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  const { _id, title, description, images } = product;

  return (
    <Badge.Ribbon text="ใหม่" color="red">
      <Card
        hoverable
        cover={
          <img
            style={{ height: "150px", objectFit: "cover" }}
            src={images && images.length ? images[0].response.url : ""}
          />
        }
        actions={[
          <Link to={`/product/${_id}`}>
            <EyeOutlined />
          </Link>,
          <ShoppingCartOutlined />,
        ]}
      >
        <Card.Meta
          title={title}
          description={
            <Typography.Paragraph>{description}</Typography.Paragraph>
          }
        ></Card.Meta>
      </Card>
    </Badge.Ribbon>
  );
};

export default ProductCard;
