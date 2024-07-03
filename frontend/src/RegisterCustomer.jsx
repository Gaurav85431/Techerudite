import React, { useState } from "react";
import axios from "axios";

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/register/customer", formData)
      .then((response) => setMessage(response.data))
      .catch((error) => setMessage("Error"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Register as Customer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CustomerRegister;
