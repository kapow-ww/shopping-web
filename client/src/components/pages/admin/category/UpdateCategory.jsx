import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { Form, Input, Button } from "antd";

import { editCategory, readCategory } from "../../../functions/category";

import { toast } from "react-toastify";
import { selectUser } from "../../../reducers";
import { useSelector } from "react-redux";

const UpdateCategory = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const param = useParams();

  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    loadData(param.id);
  }, []);

  const loadData = (id) => {
    setLoading(true);
    readCategory(user.token, id)
      .then((res) => {
        console.log(res);
        setCategoryName(res.data.name);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateCategory = (value) => {
    editCategory(user.token, param.id, value)
      .then((res) => {
        console.log(res);
        navigate("/admin/create-category");
        toast.success(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>UpdateCategory</h1>
      {!loading && (
        <Form
          layout="vertical"
          onFinish={handleUpdateCategory}
          initialValues={{ name: categoryName }}
        >
          <Form.Item label="Category name" name="name" required>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Update</Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default UpdateCategory;
