import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, loginUser } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);

  useEffect(() => {
    if (status) toast.success(status);
    if (isAuth) navigate("/");
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }));
      setPassword("");
      setUsername("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className="text-3xl text-tapestry-900 mb-4 text-center">
        Sign in to your account
      </h1>
      <label className="text-xs text-gray-400">
        Username:
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 mb-3 text-white w-full h-10 rounded-lg bg-tapestry-600 border py-1 px-2 text-s outline-none placeholder:text-white"
        />
      </label>

      <label className="text-xs text-gray-400">
        Password:
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 text-white w-full h-10 rounded-lg bg-tapestry-600 border py-1 px-2 text-s outline-none placeholder:text-white"
        />
      </label>

      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex justify-center items-center text-xs text-white rounded-sm py-2 px-4 bg-tapestry-950"
        >
          Sign in
        </button>
        <Link
          to={"/register"}
          className="flex justify-center items-center text-xs text-tapestry-950"
        >
          Create new account
        </Link>
      </div>
    </form>
  );
};
