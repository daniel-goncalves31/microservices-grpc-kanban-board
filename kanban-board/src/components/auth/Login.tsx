import React from "react";
import { Link } from "react-router-dom";
import AuthIcon from "../../assets/auth_icon.png";
import Input from "../shared/Input";

interface Props {}

const Login: React.FC<Props> = () => {
  return (
    <div className="w-4/6 p-4">
      <div className="flex flex-col items-center">
        <img src={AuthIcon} alt="icon" className="w-24 h-24" />
        <div className="mb-4 font-semibold text-3xl">
          <span className="text-purple-400">Welcome </span>
          <span>Back</span>
        </div>
      </div>
      <form>
        <Input
          label="Email"
          name="email"
          type="email"
          value=""
          onBlur={() => {}}
          onChange={() => {}}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value=""
          onBlur={() => {}}
          onChange={() => {}}
        />
        <button
          type="submit"
          className="py-2 mt-8 w-1/2 block mx-auto bg-indigo-600 rounded-lg block text-white font-bold hover:bg-indigo-500"
        >
          Login
        </button>
      </form>
      <hr className="mt-4" />
      <Link to="/auth/signup" className="mt-4 block text-center text-sm">
        Don't have a account?
        <span className="font-medium text-indigo-600"> Sign Up</span>
      </Link>
    </div>
  );
};

export default Login;
