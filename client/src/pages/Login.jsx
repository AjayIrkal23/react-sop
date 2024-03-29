import axios from "axios";

import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";

import toast, { Toaster } from "react-hot-toast";
import { AccountContext } from "../context/accountprovider";
import jsw from "../assets/jsw.png";
import { useNavigate } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { user, setUser } = useContext(AccountContext);

  const Navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API_URL}/getUser`,
        data
      );
      toast.success(`Welcome ${data.name}`);
      setUser(res.data.users);
      Navigate(`/${res.data.users.department}`);
      localStorage.setItem("user", JSON.stringify(res.data.users));
    } catch {
      toast.error("Invalid Username or Password");
      reset();
    }
  }; // your form submit function which will invoke after successful validation

  return (
    <div className="flex flex-col relative items-center justify-center h-screen -mt-[60px] bg-[white] ">
      <img src={jsw} width="300" alt="" className="my-5" />

      <div className="max-w-[600px] bg-[#f5f3f3] md:px-28 px-12 h-[300px] shadow-md border-[1px] duration-300 ease-in-out transition-all">
        <div className="pt-3 text-center pb-1 ">
          <p className="text-xl font-semibold">Department Login Page</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
          {/* register your input into the hook by invoking the "register" function */}

          <div className="mx-auto mb-4">
            {" "}
            <p className="pb-1 mt-3 mb-2 font-semibold text-center ">
              Enter Your Login Details
            </p>
            <input
              type="text"
              {...register("name")}
              placeholder="UserName"
              className="border-[1px] py-2  w-[300px] text-center outline-none shadow-sm rounded-md"
            />
          </div>

          {/* include validation with required or other standard HTML validation rules */}
          <div className="mx-auto mb-4">
            {" "}
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className="border-[1px] py-2  w-[300px] text-center outline-none shadow-sm rounded-md"
            />
            {/* errors will return when field validation fails  */}
            {errors.password && (
              <p className="py-1 text-center text-red-500">
                This field is required
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#16469d] text-white py-2 rounded-md font-semibold"
          >
            Login
          </button>
          <p className="pt-1 font-semibold text-center">
            Folder User ?{" "}
            <span
              className="text-gray-600 text-sm italic font-normal underline cursor-pointer"
              onClick={() => Navigate("/subUserLogin")}
            >
              Click Here
            </span>{" "}
            To Login
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
