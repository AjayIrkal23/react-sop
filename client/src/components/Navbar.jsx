import React, { useContext } from "react";
import { Link } from "react-router-dom";
import jsw from "../assets/jsw.png";
import { AccountContext } from "../context/accountprovider";

const Navbar = () => {
  const { user } = useContext(AccountContext);

  return (
    <div className="fixed top-0 z-40 flex w-full shadow-md shadow-black/20">
      <div className="flex items-center px-12 py-3 bg-white basis-3/5 ">
        <img src={jsw} height="120" width="120" alt="" />
      </div>
      <div className="flex justify-end pr-16 gap-8 items-center bg-[#16469d] basis-2/5">
        {user ? (
          <>
            <div className="font-semibold text-white capitalize ">
              <p>Welcome : {user?.name}</p>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="Member of Department ?   ">
              <p className="font-semibold text-white capitalize">
                Member of Department ?
              </p>
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
