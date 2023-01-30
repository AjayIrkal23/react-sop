import axios from "axios";

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import jsw from "../assets/jsw.png";
import toast, { Toaster } from "react-hot-toast";
import { AccountContext } from "../context/accountprovider";

const AddSubUser = () => {
  const [folderdata, setfolderdata] = useState([]);
  const { user } = useContext(AccountContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const getFolders = async () => {
    await axios
      .get("https://react-sop.onrender.com/getallfolders")
      .then((res) => {
        setfolderdata(res?.data);
      });
  };

  useEffect(() => {
    getFolders();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    let res = await axios.post(
      `${process.env.REACT_APP_API_URL}/subUser`,
      data
    );
    console.log(res);
    if (res.status === 203) {
      toast.error("Username Already Registered");
    }
    if (res.status === 200) {
      toast.success("User Added Successfully");
    }
    reset();
  }; // your form submit function which will invoke after successful validation

  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-[60px] bg-[white]">
      <img src={jsw} width="300" alt="" className="my-5" />
      <div className="max-w-[700px] bg-[#f5f3f3]  px-12  py-6 shadow-md border-[1px] duration-300 ease-in-out transition-all">
        <div className="py-3 text-center">
          <p className="text-xl font-semibold">New Sub User Signup Page</p>
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
                {...register("department", { required: true })}
                id=""
              >
                <option value={user?.department}>{user?.department}</option>
              </select>
            </div>
          </div>

          {/* include validation with required or other standard HTML validation rules */}
          <div className=" gap-6 mb-4 flex">
            {" "}
            <div>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Password"
                className="border-[1px] py-2  w-[250px] text-center outline-none shadow-sm rounded-md"
              />
              {/* errors will return when field validation fails  */}
              {errors.password && (
                <p className="py-1 text-center text-red-500">
                  This field is required
                </p>
              )}
            </div>
            <div>
              {" "}
              <select
                className="border-[1px] py-2  w-[250px] text-center outline-none shadow-sm rounded-md"
                name=""
                {...register("folder", { required: true })}
                id=""
              >
                {folderdata.map((item) => (
                  <>
                    {item?.department === user?.department && (
                      <option value={item.name}>{item.name}</option>
                    )}
                  </>
                ))}
              </select>
            </div>
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

export default AddSubUser;
