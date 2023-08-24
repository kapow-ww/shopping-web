import React from "react";
import { Card, Typography, Rate, Divider } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const SingleInfoCard = ({ product }) => {
  const { title, description, price, quantity, sold } = product;
  return (
    <Card
      actions={[
        <Link>
          <HeartOutlined />
          <br></br>
          เพิ่มไปยังสินค้าที่ถูกใจ
        </Link>,
        <Link>
          <ShoppingCartOutlined />
          <br></br>
          เพิ่มไปยังตระกร้า
        </Link>,
      ]}
    >
      {/* <Card.Meta title={product.title} description={product.description} /> */}

      <Typography.Title strong>{title}</Typography.Title>
      <Typography.Paragraph strong>{description}</Typography.Paragraph>
      <Rate disabled defaultValue={4}></Rate>
      <Divider />
      <Typography.Text>ราคา {price} บาท</Typography.Text>
      <Typography.Text> ขายไปแล้ว {sold} ชิ้น</Typography.Text>
      <Typography.Text> เหลือ {quantity} ชิ้น</Typography.Text>
    </Card>
  );
};

export default SingleInfoCard;
