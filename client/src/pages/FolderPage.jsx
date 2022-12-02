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
import robot from "../assets/robot.png";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Table from "../components/Table";
import ReactToPrint from "react-to-print";

const FolderPage = () => {
  let componentRef = useRef();
  const [filedata, setfiledata] = useState(null);
  console.log(filedata);
  const [firstdata, setfirstdata] = useState(null);
  const getFiles = async () => {
    let res = await axios.get("http://localhost:8000/allfiles");

    let filtered = res?.data?.filter((item) => {
      if (item.filename.includes(id)) {
        return item;
      }
    });
    setfirstdata(filtered);

    if (filtered.length > 0) {
      setfiledata(filtered);
    }
  };

  const HandleChange = (e) => {
    let filtered = firstdata.filter((item) => {
      if (item.filename.includes(e.target.value)) {
        return item;
      }
    });

    setfiledata(filtered);
  };

  useEffect(() => {
    getFiles();
  }, []);
  const [url, setUrl] = useState("");
  const [open, setopen] = useState(false);
  const [open1, setopen1] = useState(false);
  const [file, setfile] = useState(null);
  const [sendingdata, setsendingdata] = useState({});

  const qrRef = useRef();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

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
    setUrl("");
  };

  const { user, admin } = useContext(AccountContext);

  const onFileUpload = (e) => {
    setfile(e.target.files[0], id);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (resp) => {
    if (file) {
      let filesend = file;
      filesend.department = id;

      console.log(filesend);
      const data = new FormData();
      data.append("name", resp.docref);
      data.append("department", id);
      data.append("file", file);

      let res = await axios.post("http://localhost:8000/file/upload", data);
      toast.success("Data Uploaded Successfully");
      reset();
      setfile(null);
      getFiles();
    }
  }; // your form submit function which will invoke after successful validation

  const handleClose = () => {
    setopen(false);
  };

  const handleClose1 = () => {
    setopen1(false);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />;
      <div className="z-50">
        <Navbar />
      </div>
      <div className="z-0 mt-28">
        <p className="px-6 font-semibold text-center capitalize text-xm">
          Documents Uploaded in this department
        </p>
        <p className="text-center capitalize text-md">Current Folder : {id}</p>
        <button
          onClick={() => setopen1(!open1)}
          className=" flex w-56 mx-auto py-1.5 my-2 bg-green-500  items-center justify-center font-semibold text-white rounded-md"
        >
          Show Qr Code
        </button>
        <input
          type="text"
          placeholder="Enter Your DocNum"
          onChange={HandleChange}
          className="flex w-56 mx-auto placeholder:text-center outline-none py-1.5 my-2 border border-black/50  items-center justify-center font-semibold text-center text-black rounded-md"
        />
        <div className="w-[120px] mx-auto my-12 md:w-auto md:mx-0 md:my-0">
          {" "}
          <div>
            <div
              className={`md:absolute  md:right-12 ${
                user ? "inline-block" : "hidden"
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
            className=" h-[600px] md:h-auto bg-white absolute top-[50%] left-[50%] w-[80%] md:w-[600px] -translate-y-[50%] -translate-x-[50%] overflow-scroll"
          >
            <img src={jsw} width="200px" className="py-2 mx-auto" alt="" />
            <p className="px-2 my-2 text-xl font-semibold text-center capitalize">
              {id} Folder QR CODE
            </p>
            <div className="flex justify-center p-8">
              {" "}
              <div ref={qrRef}>{qrcode}</div>
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
              Enter The Following information to add a new File
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col px-6 "
            >
              <div className="flex flex-col mt-8 md:gap-6 md:flex-row">
                <div className="flex flex-col mx-auto mb-4 ">
                  {" "}
                  <input
                    type="text"
                    {...register("Name", { required: true })}
                    placeholder="Your Name"
                    value={user?.name}
                    className="border-[1px] py-2 bg-gray-300  w-[250px] text-center outline-none shadow-sm rounded-md"
                  />
                </div>
                <div className="flex flex-col mx-auto mb-4">
                  {" "}
                  <select
                    className="border-[1px] py-2 bg-gray-300  w-[250px] text-center outline-none shadow-sm rounded-md"
                    name=""
                    disabled
                    {...register("department")}
                    id=""
                  >
                    <option selected value={id}>
                      {id}
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col md:gap-6 md:flex-row ">
                <div className="flex flex-col mx-auto mb-4">
                  {" "}
                  <input
                    type="text"
                    {...register("docref", { required: true })}
                    placeholder="Doc Ref Num"
                    className="border-[1px] py-2  w-[250px] text-center outline-none shadow-sm rounded-md"
                  />
                </div>
              </div>

              <div className="flex flex-col md:gap-6 md:flex-row">
                <div className="flex flex-col mx-auto mb-4">
                  {" "}
                  <input
                    type="text"
                    {...register("Document Name", { required: true })}
                    placeholder="Document Name"
                    className="border-[1px] py-2  w-[250px] text-center outline-none shadow-sm rounded-md"
                  />
                </div>
              </div>
              {errors.docref && (
                <p className="py-1 text-center text-red-500">
                  Please Fill in All The Fields
                </p>
              )}
              <div className="flex flex-col items-center md:flex-row md:gap-6 ">
                {" "}
                <label
                  htmlFor="file"
                  className="flex items-center gap-1 text-white bg-green-500 w-[180px]  justify-center rounded-md shadow-md  outline-none py-1.5 my-2 md:my-5 curosr-pointer "
                >
                  Select Your File <FiUpload className="text-xl" />{" "}
                </label>
                <input
                  className="hidden"
                  type="file"
                  name="file"
                  id="file"
                  onChange={onFileUpload}
                />
                <p>Selected File : {file?.name} </p>
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
            {filedata.length > 0 ? (
              <>
                {" "}
                <Table filedata={filedata} getfiles={getFiles} />
              </>
            ) : (
              <div>
                <img
                  src={robot}
                  height="100px"
                  width="300px"
                  className="mx-auto"
                  alt=""
                />
                <p className="mt-4 font-bold text-center text-gray-500">
                  No File Found With the given DockNum{" "}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center ">
            <img src={nondata} height="200px" width="300px" alt="" />

            <p className="flex justify-center font-semibold text-center text-gray-600 ">
              No Data Present Here
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default FolderPage;
