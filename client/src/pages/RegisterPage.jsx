import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!username || !password) {
      toast.warn("Please fill in both fields");
      return;
    }

    const resultAction = await dispatch(registerUser({ username, password }));

    if (registerUser.fulfilled.match(resultAction)) {
      toast.success("Registration successful");
      navigate("/"); 
    } else {
      toast.error(resultAction.payload?.message || "Registration failed");
    }

    setUsername("");
    setPassword("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-1/4 h-auto mx-auto mt-40"
    >
      <h1 className="text-3xl text-tapestry-900 mb-4 text-center">Sign up</h1>
      <label className="text-xs text-gray-400">
        Username:
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 mb-3 text-white w-full h-10 rounded-lg bg-tapestry-600 border py-1 px-2 outline-none placeholder:text-white"
        />
      </label>

      <label className="text-xs text-gray-400">
        Password:
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 mb-3 text-white w-full h-10 rounded-lg bg-tapestry-600 border py-1 px-2 outline-none placeholder:text-white"
        />
      </label>

      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          className="flex justify-center items-center text-xs text-white rounded-sm py-2 px-4 bg-tapestry-950"
        >
          Sign up
        </button>
        <Link
          to="/login"
          className="flex justify-center items-center text-xs text-tapestry-950"
        >
          I already have an account
        </Link>
      </div>
    </form>
  );
};
