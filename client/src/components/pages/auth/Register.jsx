import React, { useState } from "react";
import { register } from "../../functions/auth";

const Register = () => {
  const [value, setValue] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(value);
    if (value.password !== value.confirmPassword) {
      alert("password not match");
    } else {
      // alert("ok");
      register(value)
        .then((res) => {
          console.log(res.data);
          alert(res);
        })
        .catch((err) => {
          // console.log(err.response.data);
          alert(err.response.data);
        });
    }
  };

  // console.log(value);

  return (
    <div>
      <h1>Register page</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" name="username" onChange={handleChange} />

        <label>Password</label>
        <input type="text" name="password" onChange={handleChange} />

        <label>Confirm Password</label>
        <input type="text" name="confirmPassword" onChange={handleChange} />

        <button>Submit</button>
      </form>
    </div>
  );
};

export default Register;
