import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../reducers";

import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { readProduct, updateProduct } from "../../../functions/product";
import { listCategory } from "../../../functions/category";

import { Form, Button, Input } from "antd";

const intialstate = {
  title: "",
  description: "",
  category: [],
  price: 0,
  quantity: 0,
  images: [],
};

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const user = useSelector(selectUser);

  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    readProduct(params.id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));

    listCategory(user.token)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleCreateProduct = async (values) => {
    setLoading(true);
    values.images = await handleUpload(values.images);
    AddProduct(user.token, values)
      .then((res) => {
        setLoading(false);
        console.log(res);
        toast.success(`เพิ่มสินค้า ${values.title} สำเร็จ`);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(`เพิ่มสินค้าไม่สำเร็จ`);
      });
  };

  console.log("product : ", product, "cate : ", category);

  return (
    <div>
      <h1>UpdateProduct</h1>
      <Form
        form={form}
        // disabled={loading}
        onFinish={handleCreateProduct}
        layout="vertical"
        initialValues={intialstate}
      ></Form>
    </div>
  );
};

export default UpdateProduct;
