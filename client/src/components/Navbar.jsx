import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();

  const activeStyles = {
    color: "#7eacb5",
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast("You have successfully logged out.");
  };
  return (
    <div className="fixed top-0 w-full flex py-4 px-6 justify-between  items-center bg-glacier-700 ">
      <span
        className=" flex justify-center items-center px-3 py-2  text-m

rounded-sm text-white"
      >
        Recipe Generator
      </span>
      {isAuth && (
        <ul className=" flex gap-8">
          <li>
            <NavLink
              to={"/"}
              href="/"
              className="text-sx text-white hover:text-glacier-400"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Main
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/recipes"}
              href="/recipes"
              className="text-sx text-white hover:text-glacier-400"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              My Recipes
            </NavLink>
          </li>
        </ul>
      )}

      <div
        className="flex justify-center items-center  text-xs
 text-white rounded-full px-4 py-2 border-2  hover:text-glacier-400 hover:border-glacier-400 border-white" 
      >
        {isAuth ? (
          <button onClick={logoutHandler}>Logout</button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </div>
  );
};
