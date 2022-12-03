import axios from "axios";

import React from "react";
import { useForm } from "react-hook-form";
import jsw from "../assets/jsw.png";
import toast, { Toaster } from "react-hot-toast";

const AddDep = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let res = axios.post("https://react-sop.onrender.com/adddep", data);
    toast.success("Successfully Added!");
    reset();
  }; // your form submit function which will invoke after successful validation

  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-[60px] bg-[white]">
      <Toaster position="top-center" reverseOrder={false} />;
      <img src={jsw} width="300" alt="" className="my-5" />
      <div className="max-w-[700px] bg-[#f5f3f3]  px-12  py-6 shadow-md border-[1px] duration-300 ease-in-out transition-all">
        <div className="py-3 text-center">
          <p className="text-xl font-semibold">New Department Page</p>
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
          </div>

          <button
            type="submit"
            className="bg-[#16469d] text-white py-2 rounded-md font-semibold"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDep;
