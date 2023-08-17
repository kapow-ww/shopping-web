import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../reducers";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { readProduct, updateProduct } from "../../../functions/product";
import { listCategory } from "../../../functions/category";

import { UploadOutlined } from "@ant-design/icons";

import SubmitButton from "../../../ui/SubmitButton";

import { Form, Button, Input, Select, InputNumber, Upload } from "antd";

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const user = useSelector(selectUser);

  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);

  const [initialValue, setInitialValue] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [product]);

  const loadData = () => {
    setLoading(true);
    readProduct(params.id)
      .then((res) => {
        setProduct(res.data);
        setInitialValue({
          title: res.data.title,
          description: res.data.description,
          price: res.data.price,
          quantity: res.data.quantity,
          images: res.data.images,
          category: res.data.category._id,
        });
      })
      .catch((err) => console.log(err));

    listCategory(user.token)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  const handleUpdateProduct = async (values) => {
    setLoading(true);

    updateProduct(user.token, params.id, values)
      .then((res) => {
        setLoading(false);
        console.log(res);
        toast.success(`แก้ไขสินค้า ${values.title} สำเร็จ`);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(`แก้ไขสินค้าไม่สำเร็จ`);
      });
    console.log("hello", values);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
      <h1>UpdateProduct</h1>
      {loading ? (
        <p>...loading</p>
      ) : (
        <Form
          form={form}
          disabled={loading}
          onFinish={handleUpdateProduct}
          layout="vertical"
          initialValues={initialValue}
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
              {category.map(({ _id, name }, index) => (
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
      )}
    </div>
  );
};

export default UpdateProduct;
