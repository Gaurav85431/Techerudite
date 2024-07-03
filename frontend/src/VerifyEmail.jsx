import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const VerifyEmail = () => {
  const [message, setMessage] = useState("");
  const query = useQuery();
  const token = query.get("token");

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:3000/verify-email?token=${token}`)
        .then((response) => setMessage(response.data))
        .catch((error) => setMessage("Error"));
    }
  }, [token]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
