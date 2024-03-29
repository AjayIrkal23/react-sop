import { QRCodeCanvas } from "qrcode.react";

import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import jsw from "../assets/jsw.png";
import { AiFillFileAdd, AiOutlineClose } from "react-icons/ai";
import nondata from "../assets/no-data-concept-illustration_114360-695.webp";
import { AccountContext, Accountprovider } from "../context/accountprovider";
import Departments from "../components/Departments";
import Navbar from "../components/Navbar";
import Folder from "../components/Folder";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import UserDepartments from "../components/UserFolder";
import ReactToPrint from "react-to-print";
const OuterFolderPage = () => {
  let componentRef = useRef();
  const [filedata, setfiledata] = useState(null);
  const [firstdata, setfirstdata] = useState(null);

  const HandleChange = (e) => {
    let filtered = firstdata.filter((item) => {
      if (item.name.toLowerCase().includes(e.target.value)) {
        return item;
      }
    });

    setfiledata(filtered);
  };

  const getFiles = async () => {
    let res = await axios.get(`${process.env.REACT_APP_API_URL}/getallfolders`);
    let filtered = res?.data?.filter((item) => {
      if (item.department.includes(id)) {
        return item;
      }
    });
    setfirstdata(filtered);

    if (filtered.length > 0) {
      setfiledata(filtered);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);
  const [url, setUrl] = useState("");
  const [open, setopen] = useState(false);
  const [open1, setopen1] = useState(false);

  const qrRef = useRef();
  const location = useLocation();
  const id = location.pathname.split("/")[1];

  useEffect(() => {
    // 👇️ WITHOUT React router
    setUrl(window.location.href);
  }, [open1]);

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={300}
      bgColor={"white"}
      level={"H"}
    />
  );

  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const { user, admin } = useContext(AccountContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    toast.loading("Uploading");
    if (data?.name?.includes(" ")) {
      toast.dismiss();
      toast.error("Folder Name cannot Contain Spaces");
    } else {
      if (data.name.length > 7) {
        toast.dismiss();
        toast.error("Folder Name  Should Be 7 or less");
      } else {
        toast.dismiss();
        let res = await axios
          .post(`${process.env.REACT_APP_API_URL}/addfolder`, data)
          .then((res) => toast.success("Folder Added Successfully"));
      }
    }

    reset();

    getFiles();
  };

  const handleClose = () => {
    setopen(false);
  };

  const handleClose1 = () => {
    setopen1(false);
  };
  return (
    <>
      <div className="z-50">
        <Navbar />
      </div>
      <div className="z-0 mt-28">
        <p className="px-6 font-semibold text-center capitalize text-xm">
          Documents Uploaded in this department
        </p>
        <p className="text-center capitalize text-md">Current Dep : {id}</p>
        <button
          onClick={() => setopen1(!open1)}
          className=" flex w-56 mx-auto py-1.5 my-2 bg-green-500  items-center justify-center font-semibold text-white rounded-md"
        >
          Show Qr Code
        </button>

        {user?.name && (
          <Link to="/addSubUser">
            <p className=" flex w-56 mx-auto py-1.5 my-2 bg-green-500   justify-center font-semibold text-white rounded-md items-center gap-1 ">
              Add Folder User
              <AiFillFileAdd className="text-xl text-black" />{" "}
            </p>
          </Link>
        )}
        <input
          type="text"
          placeholder="Search for Folder"
          onChange={HandleChange}
          className="flex w-56 mx-auto placeholder:text-center outline-none py-1.5 my-2 border border-black/50  items-center justify-center font-semibold text-center text-black rounded-md"
        />
        <div className="w-[120px] mx-auto my-12 md:w-auto md:mx-0 md:my-0">
          {" "}
          <div>
            <div
              className={`md:absolute  md:right-12 ${
                user?.name || admin?.name ? "inline-block" : "hidden"
              }   md:top-[120px] bg-green-500 py-1.5 px-3 text-white shadow-xl shadow-gray-200 rounded-md hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer`}
            >
              <p
                className="flex items-center gap-1 "
                onClick={() => setopen(!open)}
              >
                Add New
                <AiFillFileAdd className="text-xl text-black" />{" "}
              </p>
            </div>
          </div>
        </div>
        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            ref={(el) => (componentRef = el)}
            className=" h-[600px] md:h-auto bg-white absolute w-[90%] top-[50%] left-[50%]  md:w-[600px] -translate-y-[50%] -translate-x-[50%] overflow-scroll"
          >
            <img src={jsw} width="200px" className="py-2 mx-auto" alt="" />
            <p className="px-2 my-2 text-xl font-semibold text-center capitalize">
              {id} Department QR CODE
            </p>
            <div className="flex justify-center p-8">
              {" "}
              <div className="" ref={qrRef}>
                {qrcode}
              </div>
            </div>
            <div className="flex gap-3 mb-0.5 px-0.5">
              {" "}
              <button
                onClick={downloadQRCode}
                className="px-4 py-2 font-semibold text-white bg-green-500 rounded-md basis-1/2 "
              >
                Download
              </button>
              <ReactToPrint
                trigger={() => (
                  <button className="px-4 py-2 font-semibold text-center text-white bg-blue-500 rounded-md basis-1/2 ">
                    Print this out!
                  </button>
                )}
                content={() => componentRef}
              />
            </div>
          </div>
        </Modal>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className=" h-[600px] md:h-auto bg-white absolute top-[50%] left-[50%] w-[80%] md:w-[600px] -translate-y-[50%] -translate-x-[50%] overflow-scroll">
            <img
              src="../assets/jsw.png"
              width="200px"
              className="py-2 mx-auto"
              alt=""
            />
            <p className="px-2 my-2 text-xl font-semibold text-center capitalize">
              Enter The Following information to add a new Folder
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col px-6 "
            >
              <div className="flex flex-col mt-8 md:gap-6 md:flex-row">
                <div className="flex flex-col mx-auto mb-4">
                  <input
                    className="border-[1px] py-2  w-[250px] bg-gray-30 text-center outline-none shadow-sm rounded-md"
                    type="text"
                    {...register("department", { required: true })}
                    value={id}
                    id=""
                  />
                </div>
              </div>

              <div className="flex flex-col md:gap-6 md:flex-row">
                <div className="flex flex-col mx-auto mb-4">
                  {" "}
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Folder Name"
                    className="border-[1px] py-2  w-[250px] text-center outline-none shadow-sm rounded-md"
                  />
                </div>
              </div>
              {errors.name && (
                <p className="py-1 text-center text-red-500">
                  Please Fill in All The Fields
                </p>
              )}
              <div className="flex flex-col items-center md:flex-row md:gap-6 ">
                {" "}
              </div>
              <button
                type="submit"
                className="bg-[#16469d] text-white py-2 my-2 rounded-md font-semibold"
              >
                Submit
              </button>
            </form>
          </div>
        </Modal>

        {filedata ? (
          <div className="flex flex-wrap items-center justify-center gap-12 px-12 mt-12">
            {filedata?.map((item) => (
              <UserDepartments name={item.name} id={id} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <img src={nondata} height="200px" width="300px" alt="" />

            <p className="font-semibold text-gray-600 ">No Data Present Here</p>
          </div>
        )}
      </div>
    </>
  );
};

export default OuterFolderPage;
