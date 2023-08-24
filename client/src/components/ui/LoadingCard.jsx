import { Card, Skeleton } from "antd";
import React from "react";
import { DotChartOutlined } from "@ant-design/icons";
const LoadingCard = () => {
  return (
    <Card
      cover={
        <Skeleton.Image active style={{ height: "150px", width: "100%" }} />
      }
    >
      <Skeleton
        paragraph={{
          rows: 1,
        }}
        active
      />
    </Card>
  );
};

export default LoadingCard;
