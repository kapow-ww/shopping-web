import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../reducers";

import { AddProduct } from "../../../functions/product";
import { listCategory } from "../../../functions/category";
import { Form, Input, Button, InputNumber, Select, Upload, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import SubmitButton from "../../../ui/SubmitButton";

const intialstate = {
  title: "",
  description: "",
  category: [],
  price: 0,
  quantity: 0,
};

const CreateProduct = () => {
  const user = useSelector(selectUser);

  const [form] = Form.useForm();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, []);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleUpload = async (images) => {
    const allfileUpload = await Promise.all(
      images.map(async (file) => {
        return new Promise((resolve) => {
          Resizer.imageFileResizer(
            file.originFileObj,
            720,
            720,
            "JPEG",
            100,
            0,
            (uri) =>
              axios
                .post(
                  import.meta.env.VITE_SERVER_API + "/images",
                  {
                    image: uri,
                  },
                  {
                    headers: {
                      authtoken: user.token,
                    },
                  }
                )
                .then((res) => {
                  resolve(res.data);
                })
                .catch((err) => console.log(err)),
            "base64"
          );
        });
      })
    );

    return allfileUpload;
  };

  const loadCategory = () => {
    listCategory(user.token)
      .then((res) => {
        setCategories(res.data);
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
    console.log(values);
  };

  const uploadImage = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <div>
      <h1>CreateProduct</h1>

      <Form
        form={form}
        disabled={loading}
        onFinish={handleCreateProduct}
        layout="vertical"
        initialValues={intialstate}
      >
        <Form.Item
          label="title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="description" name="description">
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>

        <Form.Item
          label="category"
          name="category"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="เลือกประเภทของสินค้า">
            {categories.map(({ _id, name }, index) => (
              <Select.Option key={index} value={_id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="price"
          name="price"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="quantity"
          name="quantity"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          name="images"
          label="upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload.Dragger
            customRequest={dummyRequest}
            listType="picture"
            multiple
          >
            <Button loading={loading}>
              <UploadOutlined /> Click to upload
            </Button>
          </Upload.Dragger>
        </Form.Item>

        {/* <Upload.Dragger customRequest={uploadImage} listType="picture" multiple>
          <Button>
            <UploadOutlined /> Click to upload
          </Button>
        </Upload.Dragger> */}

        <Form.Item>
          {/* <Button htmlType="submit">Create</Button> */}
          <SubmitButton form={form} />
          {/* <Button htmlType="reset">Reset</Button> */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProduct;
