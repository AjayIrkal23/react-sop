import React, { useContext } from "react";
import { Link } from "react-router-dom";
import jsw from "../assets/jsw.png";
import { AccountContext } from "../context/accountprovider";

const Navbar = () => {
  const { user, subUser } = useContext(AccountContext);

  return (
    <div className="fixed top-0 z-40 flex w-full shadow-md shadow-black/20">
      <div className="flex items-center px-12 py-3 bg-white md:basis-3/5 basis-1/2 ">
        <img src={jsw} height="120" width="120" alt="" />
      </div>
      <div className="md:flex justify-end pr-16 gap-8 items-center bg-[#16469d] hidden  md:basis-2/5">
        {user?.name ? (
          <>
            <div className="font-semibold text-white capitalize ">
              <p>Welcome : {user?.name}</p>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="flex flex-row  ">
              <p className="font-semibold text-white capitalize">Admin Login</p>
            </div>
            <Link to="/login">
              <div className="px-6 py-2 font-semibold bg-white rounded-md">
                <button>Login</button>
              </div>
            </Link>
          </>
        )}
        {subUser?.name ? (
          <>
            <div className="font-semibold text-white capitalize ">
              <p>Welcome : {subUser?.name}</p>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="Member of Department ?   ">
              <p className="font-semibold text-white capitalize">User Login</p>
            </div>
            <Link to="/subUserLogin">
              <div className="px-6 py-2 font-semibold bg-white rounded-md">
                <button>Login</button>
              </div>
            </Link>
          </>
        )}
      </div>
      {user ? (
        <div className="flex items-center justify-end flex-grow pr-8 font-semibold cursor-pointer md:hidden ">
          <p className="px-4 text-black py-1.5 rounded-md text-md shadow-lg shadow-white/20">
            Welcome : {user?.name}
          </p>
        </div>
      ) : (
        <div className="flex items-center md:hidden justify-end flex-grow pr-8 font-semibold cursor-pointer bg-[#2159c2] ">
          <Link to="/login">
            <p className="px-4 text-black bg-white py-1.5 rounded-md text-md shadow-lg shadow-white/20">
              Login
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
