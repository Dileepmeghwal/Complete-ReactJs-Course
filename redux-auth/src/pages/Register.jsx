// src/components/Register.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await dispatch(register(name, email, password, avatar));
      if (userData) {
        navigate("/login"); // Navigate on successful registration
      }
    } catch (error) {
      console.log("Registration failed:", error);
      // Handle error if needed
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input value={avatar} onChange={(e) => setAvatar(e.target.value)} />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {error && <p>{error}</p>}
      {user && <p>Welcome, {user.token}</p>}
    </div>
  );
};

export default Register;
