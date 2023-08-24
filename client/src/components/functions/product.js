import axios from "axios";

export const AddProduct = async (authtoken, value) => {
  return await axios.post(import.meta.env.VITE_SERVER_API + "/product", value, {
    headers: { authtoken },
  });
};

export const listProduct = async (count) => {
  return await axios.get(
    import.meta.env.VITE_SERVER_API + `/products/${count}`
  );
};

export const listProductBy = async (sort, order, limit) => {
  return await axios.post(import.meta.env.VITE_SERVER_API + `/productby`, {
    sort,
    order,
    limit,
  });
};

export const removeProduct = async (authtoken, id) => {
  return await axios.delete(
    import.meta.env.VITE_SERVER_API + `/product/${id}`,
    {
      headers: { authtoken },
    }
  );
};

export const readProduct = async (id) => {
  return await axios.get(import.meta.env.VITE_SERVER_API + `/product/${id}`);
};

export const updateProduct = async (authtoken, id, product) => {
  return await axios.put(
    import.meta.env.VITE_SERVER_API + `/product/${id}`,
    product,
    {
      headers: { authtoken },
    }
  );
};
