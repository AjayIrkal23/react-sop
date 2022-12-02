import React from "react";
import { AiOutlineFilePdf, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import folder from "../";

const Departments = ({ name }) => {
  return (
    <>
      <Link to={`/${name}`}>
        <div className="z-0 px-8 py-8 bg-gray-100 rounded-full shadow-xl">
          <div className="h-[100px] text-white w-[200px] relative flex flex-col items-center justify-center pdf bg-[url('/src/assets/folder.png')] bg-no-repeat group bg-center bg-contain hover:scale-110 transition-all duration-300 ease-in-out">
            <p className="absolute font-semibold text-black -bottom-5">
              {name}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Departments;
