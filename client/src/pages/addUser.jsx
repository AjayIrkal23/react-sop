import axios from "axios";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import jsw from "../assets/jsw.png";
import toast, { Toaster } from "react-hot-toast";

const AddUser = () => {
  const [depdata, setDepdata] = useState([]);
  console.log(depdata);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let res = await axios.post(`${process.env.REACT_APP_API_URL}/add`, data);
    console.log(res);
    if (res.status === 203) {
      toast.error("Username Already Registered");
    }
    if (res.status === 200) {
      toast.success("User Added Successfully");
    }
    reset();
  }; // your form submit function which will invoke after successful validation

  const getAllDep = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_API_URL}/getdepartments`
    );

    setDepdata(res.data);
  };

  useEffect(() => {
    getAllDep();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-[60px] bg-[white]">
      <img src={jsw} width="300" alt="" className="my-5" />
      <div className="max-w-[700px] bg-[#f5f3f3]  px-12  py-6 shadow-md border-[1px] duration-300 ease-in-out transition-all">
        <div className="py-3 text-center">
          <p className="text-xl font-semibold">New User Signup Page</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
          {/* register your input into the hook by invoking the "register" function */}
          <div className="flex gap-6">
            <div className="flex flex-col mx-auto mb-4">
              {" "}
              <input
                type="text"
                {...register("name")}
                placeholder="Name"
                className="border-[1px] py-2  w-[250px] text-center outline-none shadow-sm rounded-md"
              />
            </div>
            <div className="flex flex-col mx-auto mb-4">
              {" "}
              <input
                type="text"
                {...register("lastname")}
                placeholder="LastName"
                className="border-[1px] py-2  w-[250px] text-center outline-none shadow-sm rounded-md"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col mx-auto mb-4">
              {" "}
              <input
                type="text"
                {...register("username")}
                placeholder="UserName"
                className="border-[1px] py-2  w-[250px] text-center outline-none shadow-sm rounded-md"
              />
            </div>
            <div className="flex flex-col mx-auto mb-4">
              {" "}
              <select
                className="border-[1px] py-2  w-[250px] text-center outline-none shadow-sm rounded-md"
                name=""
                {...register("department")}
                id=""
              >
                {depdata.map((item) => (
                  <option value={item.name}>{item.name}</option>
                ))}
              </select>
            </div>
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
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
