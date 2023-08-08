import axios from "axios";

export const listUsers = async (authtoken) => {
  return await axios.get(import.meta.env.VITE_SERVER_API + "/users", {
    headers: {
      authtoken,
    },
  });
};

export const changeStatus = async (authtoken, value) => {
  return await axios.post(
    import.meta.env.VITE_SERVER_API + "/users/change-status",
    value,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const changeRole = async (authtoken, value) => {
  return await axios.post(
    import.meta.env.VITE_SERVER_API + "/users/change-role",
    value,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const resetPassword = async (authtoken, id, value) => {
  return await axios.put(
    import.meta.env.VITE_SERVER_API + `/users/${id}`,
    value,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const removeUser = async (authtoken, id) => {
  return await axios.delete(import.meta.env.VITE_SERVER_API + `/users/${id}`, {
    headers: {
      authtoken,
    },
  });
};
