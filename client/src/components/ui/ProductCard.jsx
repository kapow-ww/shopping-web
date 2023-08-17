import React from "react";
import { Card, Carousel, Image } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ProductCard = ({ product, handleRemove }) => {
  const { _id, title, description, images } = product;
  return (
    <Card
      hoverable
      cover={
        // <Carousel>
        //   {images.map((image) => (
        //     <Image src={image.secure_url} key={image.asset_id}></Image>
        //   ))}
        // </Carousel>
        <img
          style={{ height: "150px", objectFit: "cover" }}
          src={images && images.length ? images[0].url : ""}
        />
      }
      actions={[
        <Link to={`/admin/update-product/${_id}`}>
          <EditOutlined />
        </Link>,
        <DeleteOutlined
          style={{ color: "red" }}
          onClick={() => handleRemove(_id)}
        />,
      ]}
    >
      <Card.Meta title={title} description={description}></Card.Meta>
    </Card>
  );
};

export default ProductCard;
