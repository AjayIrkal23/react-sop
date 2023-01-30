import axios from "axios";
import Folder from "../components/Folder";
import Navbar from "../components/Navbar";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useContext, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import jsw from "../assets/jsw.png";
import { AiFillFileAdd, AiOutlineClose } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { AccountContext, Accountprovider } from "../context/accountprovider";
import Departments from "../components/Departments";
import { useEffect } from "react";
import robot from "../assets/robot.png";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [open1, setOpen1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [depdata, setDepdata] = useState([]);

  const handleClose1 = () => {
    setOpen1(!open1);
  };

  const [list, setlist] = useState([]);
  console.log(list);

  const getAllusers = async () => {
    let res = await axios.get("https://react-sop.onrender.com/getall");
    setlist(res.data);
    setOpen1(true);
  };

  const getAllDep = async () => {
    let res = await axios.get("https://react-sop.onrender.com/getdepartments");
    setDepdata(res.data);
  };

  useEffect(() => {
    getAllDep();
  }, []);

  const [open, setopen] = useState(false);
  const [file, setfile] = useState(null);

  const { user, admin } = useContext(AccountContext);

  const onFileUpload = (e) => {
    setfile(e.target.files);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }; // your form submit function which will invoke after successful validation

  const handleClose = () => {
    setopen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "Department",
      headerName: "Department",
      width: 130,
    },
    {
      field: "username",
      headerName: "username",
      width: 90,
    },
    {
      field: "remove",
      headerName: "Remove",
      width: 90,
    },

    // {
    //   field: "Delete",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    // },
  ];

  const rows = list.map((item) => {
    return {
      id: item?._id,
      lastName: item?.lastname,
      firstName: item?.name,
      Department: item?.department,
      username: item?.username,
      remove: "Remove",
    };
  });

  const DeleteUser = async (data) => {
    let res = await axios.post(
      `${process.env.REACT_APP_API_URL}/delteuser`,
      data
    );
    console.log(res);

    getAllusers();
  };

  const selectref = useRef();

  const HandleDeleteDep = async () => {
    let name = selectref?.current.value;
    let res = await axios.post("https://react-sop.onrender.com/deletedep", {
      name,
    });
    getAllDep();
  };

  const data = (data) => {
    toast.promise(HandleDeleteDep(), {
      loading: "Loading",
      success: "Department Deleted Successfully",
      error: "Error when fetching",
    });
  };

  return (
    <div className="">
      <div className="z-[800]">
        {" "}
        <Navbar />
      </div>
      {admin ? (
        <div className="px-6 mt-28 ">
          {" "}
          <p className="text-3xl font-semibold text-center uppercase">
            Admin DashBoard{" "}
          </p>
          <p className="my-4 text-xl text-center uppercase">
            Admin Interaction
          </p>
          <div className="flex  flex-col md:flex-row justify-center border-b-[1px] pb-4 gap-6">
            <Link to="/addnew">
              <button className="px-3 w-full bg-green-500 py-1.5 font-bold text-white shadow-xl">
                Add User
              </button>
            </Link>
            <Link to="/adddepartment">
              <button className="px-3 w-full bg-green-500 py-1.5 font-bold text-white shadow-xl">
                Add Department
              </button>
            </Link>
            <button
              onClick={getAllusers}
              className="px-3 bg-blue-500 py-1.5 font-bold text-white shadow-xl"
            >
              List User
            </button>
            <select
              className="px-3 py-2 bg-transparent border border-black rounded-md"
              name=""
              ref={selectref}
              id=""
            >
              {depdata?.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
            <button
              className="px-3 bg-red-500 py-1.5 font-bold text-white shadow-xl"
              onClick={data}
            >
              Delete The Selected Department
            </button>
          </div>
          <Modal
            open={open1}
            onClose={handleClose1}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className=" h-[600px] md:h-auto bg-white absolute top-[50%] left-[50%] w-[80%] md:w-[700px] -translate-y-[50%] -translate-x-[50%] overflow-scroll">
              {" "}
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  onCellClick={(data) => {
                    if (data.field === "remove") {
                      toast.promise(DeleteUser(data), {
                        loading: "Loading",
                        success: "User Deleted Successfully",
                        error: "Error when fetching",
                      });
                    }
                  }}
                />
              </div>
            </div>
          </Modal>
          <p className="mt-4 text-xl font-semibold text-center ">
            All Departments
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 px-12 mt-12">
            {depdata?.map((item) => (
              <Departments getAllDep={getAllDep} name={item.name} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="max-w-[1200px] mx-auto mt-[120px]">
            <img
              src={robot}
              height="100%"
              width="50%"
              className="mx-auto"
              alt=""
            />
            <h1 className="my-2 text-2xl font-semibold text-center">
              Please Login To See Data
            </h1>
            <Link to="/login">
              <h1 className="my-2 text-xs font-semibold text-center text-gray-500 underline">
                Login
              </h1>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
