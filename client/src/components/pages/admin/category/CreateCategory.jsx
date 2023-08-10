import React, { useState, useEffect } from "react";
import { Form, Input, Button, Divider, Tag, List, Typography } from "antd";
import { styled } from "styled-components";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import { selectUser } from "../../../reducers";
import { useSelector } from "react-redux";

import {
  createCate,
  listCategory,
  deleteCategory,
} from "../../../functions/category";

const DelButton = styled.span`
  color: red;
  cursor: pointer;
  &:hover {
    opacity: 60%;
  }
`;

const UpdateButton = styled(Link)``;

const CreateCategory = () => {
  const user = useSelector(selectUser);

  const [category, setCategory] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listCategory(user.token)
      .then((res) => {
        setCategory(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleCreate = (value) => {
    createCate(user.token, value)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    deleteCategory(user.token, id)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  console.log(category);
  return (
    <div>
      <h1>CreateCategory</h1>

      <Form onFinish={handleCreate} layout="vertical">
        <Form.Item label="Category name" name="name">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">เพิ่ม</Button>
        </Form.Item>
      </Form>
      <Divider>Category List</Divider>
      <List
        bordered
        dataSource={category}
        renderItem={(item) => (
          <List.Item
            actions={[
              <UpdateButton to={`/admin/update-category/${item._id}`}>
                Edit
              </UpdateButton>,
              <DelButton onClick={() => handleDelete(item._id)}>
                Delete
              </DelButton>,
            ]}
          >
            <Typography.Text strong>{item.name}</Typography.Text>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CreateCategory;
