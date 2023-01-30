import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../context/accountprovider";

const NotAuth = ({ user, admin }) => {
  const { subUser } = useContext(AccountContext);
  return (
    <div className="text-center">
      <p className="mt-[150px] text-md text-center font-semibold">
        You Are Not Authorised To this Page
      </p>
      <Link
        to={`/`}
        className="text-sm text-gray-500 underline text-center w-full"
      >
        Click here to Your Authorized Page
      </Link>
    </div>
  );
};

export default NotAuth;
