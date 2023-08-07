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
    import.meta.env.VITE_SERVER_API + "/users/change-role",
    value,
    {
      headers: {
        authtoken,
      },
    }
  );
};
