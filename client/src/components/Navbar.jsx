import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import jsw from "../assets/jsw.png";
import { AccountContext } from "../context/accountprovider";

const Navbar = () => {
  const { user, subUser, admin, setUser, setAdmin, setSubUser } =
    useContext(AccountContext);
  const Navigate = useNavigate();

  return (
    <div className="fixed top-0 z-40 flex w-full shadow-md shadow-black/20">
      <div className="flex items-center px-12 py-3 bg-white md:basis-3/5 basis-1/2 ">
        <Link to="/">
          <img src={jsw} height="120" width="120" alt="" />
        </Link>
      </div>

      <div className="md:flex justify-end pr-16 gap-8 items-center bg-[#16469d] hidden  md:basis-2/5">
        {user?.name || admin?.name || subUser?.name ? (
          <>
            <div className="font-semibold text-white capitalize ">
              <p>Welcome : {user?.name || admin?.name || subUser?.name}</p>
            </div>

            <div
              onClick={() => {
                setAdmin(null);
                setSubUser(null);
                setUser(null);
                localStorage.removeItem("user");
                localStorage.removeItem("admin");
                localStorage.removeItem("subUser");
                Navigate("/");
              }}
              className="font-semibold text-white bg-red-600 rounded-md text-sm italic border px-4 py-2 capitalize hover:bg-transparent cursor-pointer transition-all duration-200 ease-in-out "
            >
              <p>Logout</p>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="flex flex-row  ">
              <p className="font-semibold text-white capitalize"></p>
            </div>
            <Link to="/login">
              <div className="px-6 py-2 font-semibold bg-white rounded-md">
                <button>Login</button>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
