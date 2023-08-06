import axios from "axios";

export const register = async (value) =>
  await axios.post(import.meta.env.VITE_SERVER_API + "/register", value);

export const login = async (value) =>
  await axios.post(import.meta.env.VITE_SERVER_API + "/login", value);

export const currentUser = async (authtoken) => {
  return await axios.post(
    import.meta.env.VITE_SERVER_API + "/current-user",
    {},
    { headers: { authtoken } }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    import.meta.env.VITE_SERVER_API + "/current-admin",
    {},
    { headers: { authtoken } }
  );
};
