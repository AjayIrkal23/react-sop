import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AiFillFolderOpen, AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AccountContext } from "../context/accountprovider";
import { BiLogIn } from "react-icons/bi";
const Table = ({ filedata, getfiles }) => {
  console.log(filedata);
  const { user, admin } = useContext(AccountContext);
  const HandleDelete = async (e, name) => {
    e.preventDefault();
    const res = await axios.post("https://react-sop.onrender.com/filedelete", {
      name,
    });
    toast.success("File Deleted Successfully");
    getfiles();
  };
  return (
    <div className="">
      <div className="md:w-[800px] w-[98vw] flex-col min-h-auto border max-h-[600px] overflow-scroll text-center border-black/50 shadow-lg">
        <div className=" text-center border-b-[1px] border-black/50 bg-gray-300 ">
          <div className="flex">
            {" "}
            <p className="basis-1/4 py-2.5 border-r-[1px] border-black/30 ">
              DocNum
            </p>
            <p className="basis-1/4 py-2.5 border-r-[1px] border-black/30 ">
              Department
            </p>
            <p className="basis-1/4 py-2.5 border-r-[1px] border-black/30 ">
              Open
            </p>
            <p className="basis-1/4 py-2.5 border-r-[1px] border-black/30 ">
              Remove
            </p>
          </div>
        </div>
        {filedata?.map((item) => (
          <div className=" text-center border-b-[1px] border-black/50  ">
            <div className="flex">
              {" "}
              <p className="basis-1/4 py-2.5 border-r-[1px] border-black/30 ">
                {item.filename.split(" ")[0]}
              </p>
              <p className="basis-1/4 py-2.5 border-r-[1px] border-black/30 ">
                {item.filename.split(" ")[1]}
              </p>
              <p className="basis-1/4 py-2.5 border-r-[1px]   border-black/30 ">
                <Link to={`/file/${item.filename}`}>
                  <span className="flex flex-col sm:flex-row items-center space-x-1 justify-center md:w-[120px]  w-[90%] text-white py-1 rounded-md shadow-lg hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer mx-auto sm:gap-2 text-sm bg-green-500 ">
                    Click Here <AiFillFolderOpen className="text-xl" />
                  </span>
                </Link>
              </p>
              <p
                className={`basis-1/4 py-2.5 border-r-[1px] ${
                  user ? "inline-block" : "hidden"
                }   border-black/30 `}
              >
                <span
                  className="flex flex-col sm:flex-row  items-center justify-center  md:w-[120px] w-[90%] space-x-1 text-white py-1 rounded-md shadow-lg hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer mx-auto sm:gap-2 text-sm bg-red-500 "
                  onClick={(e) => HandleDelete(e, item.filename)}
                >
                  Click Here <AiFillCloseCircle className="text-xl" />
                </span>
              </p>
              <p
                className={`basis-1/4 py-2.5 border-r-[1px] ${
                  user && "hidden"
                }   border-black/30 `}
              >
                <Link to="/login">
                  <span className="flex flex-col sm:flex-row items-center justify-center space-x-1  md:w-[120px] w-[90%] text-white py-1 rounded-md shadow-lg hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer mx-auto sm:gap-2 text-sm bg-blue-500 ">
                    Login <BiLogIn className="text-xl" />
                  </span>
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
