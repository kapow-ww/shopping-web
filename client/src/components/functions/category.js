import axios from "axios";

export const createCate = async (authtoken, value) => {
  return await axios.post(
    import.meta.env.VITE_SERVER_API + "/category",
    value,
    { headers: { authtoken } }
  );
};

export const listCategory = async (authtoken) => {
  return await axios.get(import.meta.env.VITE_SERVER_API + "/category", {
    headers: { authtoken },
  });
};

export const deleteCategory = async (authtoken, id) => {
  return await axios.delete(
    import.meta.env.VITE_SERVER_API + `/category/${id}`,
    { headers: { authtoken } }
  );
};

export const readCategory = async (authtoken, id) => {
  return await axios.get(import.meta.env.VITE_SERVER_API + `/category/${id}`, {
    headers: { authtoken },
  });
};

export const editCategory = async (authtoken, id, value) => {
  return await axios.put(
    import.meta.env.VITE_SERVER_API + `/category/${id}`,
    value,
    { headers: { authtoken } }
  );
};
