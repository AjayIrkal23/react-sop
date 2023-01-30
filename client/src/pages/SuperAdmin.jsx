import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import jsw from "../assets/jsw.png";

import { AccountContext } from "../context/accountprovider";

const Admin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { admin, setAdmin } = useContext(AccountContext);

  const onSubmit = async (data) => {
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API_URL}/getadmin`,
        data
      );
      console.log(res.data);
      setAdmin(res.data.user);
      toast.success(`Welcome ${data.name}`);
    } catch {
      toast.error("Invalid Username or Password");
    }
  }; // your form submit function which will invoke after successful validation

  return (
    <div className="flex relative flex-col items-center justify-center h-screen -mt-[60px] bg-[white] ">
      <img src={jsw} width="300" alt="" className="my-5" />
      <div className="max-w-[600px] bg-[#f5f3f3] md:px-28 px-12 h-[300px] shadow-md border-[1px] duration-300 ease-in-out transition-all">
        <div className="py-3 text-center">
          <p className="text-xl font-semibold">Admin Login Page</p>
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
              placeholder="Name"
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
        </form>
      </div>
    </div>
  );
};

export default Admin;
