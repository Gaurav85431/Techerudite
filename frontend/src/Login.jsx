import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validation(values));

    setErrors(err);
    if (err.email === "" && errors.password === "") {
      axios
        .post("http://localhost:3000/login", values)
        .then((res) => {
          if (res.data === "Success") {
            navigate("/home");
          } else {
            alert("No record found");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              {" "}
              <strong> Email</strong>{" "}
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control rounded-0"
              name="email"
              onChange={handleInput}
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              {" "}
              <strong>Password</strong>{" "}
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control rounded-0"
              name="password"
              onChange={handleInput}
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100">
            {" "}
            <strong> Log In</strong>
          </button>
          <p></p>
          <Link
            to="/register"
            className="btn btn-default border w-100 bg-light"
          >
            <strong>Register</strong>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
