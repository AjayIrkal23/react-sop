import axios from "axios";
import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineFilePdf, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AccountContext } from "../context/accountprovider";

const Folder = ({ name, id, deleteId, getFiles }) => {
  const { user, admin } = useContext(AccountContext);
  const HandleDelete = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/filedelete", { name });
    toast.success("File Deleted Successfully");
    getFiles();
  };

  console.log(deleteId);
  return (
    <div className="z-0 px-8 py-8 bg-gray-100 rounded-full shadow-xl">
      <Toaster position="top-center" reverseOrder={false} />;
      <div className="h-[200px] text-white w-[200px] relative flex flex-col items-center justify-center bg-[url('/src/assets/pdf.png')] group bg-center bg-contain  transition-all duration-300 ease-in-out">
        {" "}
        <p className="absolute top-[40%] left-6 font-semibold text-sm">
          {name.split(" ")[0]}
        </p>
        <p className="absolute top-[48%] left-6 font-semibold text-sm">
          Department
        </p>
        <p className="absolute top-[56%] left-6 font-semibold text-sm">
          {name.split(" ")[1]}
        </p>
        <p className="absolute top-[67%] left-6 font-semibold text-xs">
          Uploaded By
        </p>
        <p className="absolute top-[75%] left-6 font-semibold text-xs">Ajay</p>
        <p className="absolute top-[18%] left-[20px] font-semibold text-[10px]">
          Created At{" "}
        </p>
        <p className="absolute top-[23%] left-[20px] font-semibold text-[10px]">
          22 Nov{" "}
        </p>
        {user && (
          <button
            onClick={HandleDelete}
            className="absolute top-0 right-0 px-1 py-1 font-bold text-white bg-red-500 rounded-md md:hidden group-hover:inline-block "
          >
            <AiOutlineClose />
          </button>
        )}
        <Link to={`/file/${name}`} className="absolute  -bottom-10">
          <p className="px-8 py-1 transition-all duration-200 ease-in-out bg-green-500 rounded-full shadow-lg hover:scale-110 ">
            Open
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Folder;
