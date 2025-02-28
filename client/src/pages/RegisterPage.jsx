import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, checkIsAuth } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isAuth = useSelector(checkIsAuth);
  const { status, user } = useSelector((state) => state.auth); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      toast(status);
    }
    if (isAuth) {
      navigate("/"); 
    }
  }, [status, isAuth, navigate]);

  // form submission
  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(registerUser({ username, password })).unwrap();
      
      if (resultAction.user) {
        toast.success("Registration successful!", {
          position: "bottom-right",
        });
        navigate("/add-recipe"); 
      }

      setPassword("");
      setUsername("");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed", { position: "bottom-right" });
    }
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
          className="mt-1 mb-3 text-white w-full h-10 rounded-lg bg-chestnut-rose-600 border py-1 px-2 outline-none placeholder:text-white"
        />
      </label>

      <label className="text-xs text-gray-400">
        Password:
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 mb-3 text-white w-full h-10 rounded-lg bg-chestnut-rose-600 border py-1 px-2 outline-none placeholder:text-white"
        />
      </label>

      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          className="flex justify-center items-center text-xs text-white rounded-sm py-2 px-4 bg-chestnut-rose-900"
        >
          Sign up
        </button>
        <Link
          to="/login"
          className="flex justify-center items-center text-xs text-chestnut-rose-900"
        >
          I already have an account
        </Link>
      </div>
    </form>
  );
};
