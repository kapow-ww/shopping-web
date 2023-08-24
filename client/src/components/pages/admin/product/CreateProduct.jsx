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
  images: [],
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

  const loadCategory = () => {
    listCategory(user.token)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleCreateProduct = async (values) => {
    setLoading(true);
    AddProduct(user.token, values)
      .then((res) => {
        setLoading(false);
        console.log(res);
        toast.success(`เพิ่มสินค้า ${values.title} สำเร็จ`);
        form.resetFields();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(`เพิ่มสินค้าไม่สำเร็จ`);
      });
    console.log(images);
    console.log(values);
  };

  const uploadFile = (e) => {
    const file = e.file;
    Resizer.imageFileResizer(
      file,
      720,
      720,
      "JPEG",
      100,
      0,
      (uri) => {
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
            console.log(res);
            e.onSuccess(res.data);
          })
          .catch((err) => {
            console.log(err);
            e.onError(err);
          });
      },
      "base64"
    );
  };

  const removeImage = (e) => {
    const public_id = e.response.public_id;
    console.log(public_id);
    axios
      .post(
        import.meta.env.VITE_SERVER_API + "/remove-image",
        {
          public_id: public_id,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            customRequest={uploadFile}
            onRemove={removeImage}
            multiple
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

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
