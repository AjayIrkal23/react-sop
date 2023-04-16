import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiFillFolderOpen, AiFillCloseCircle } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { AccountContext } from "../context/accountprovider";
import { BiLogIn } from "react-icons/bi";
import { QRCodeCanvas } from "qrcode.react";
import ReactToPrint from "react-to-print";
import { Modal, unstable_ClassNameGenerator } from "@mui/material";
import jsw from "../assets/jsw.png";

const Table = ({ filedata, getfiles }) => {
  let componentRef = useRef();
  const [url, setUrl] = useState("");
  const [name, setName] = useState(null);
  const [open1, setopen1] = useState(false);

  const qrRef = useRef();
  const location = useLocation();

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={300}
      bgColor={"white"}
      level={"H"}
    />
  );

  const { user, admin, subUser } = useContext(AccountContext);
  const HandleDelete = async (e, name) => {
    e.preventDefault();
    const res = await axios.post("https://react-sop.onrender.com/filedelete", {
      name,
    });
    toast.success("File Deleted Successfully");
    getfiles();
  };

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

  const handleClose1 = () => {
    setopen1(false);
  };

  const handleOpen = (data) => {
    console.log(data);
    setName(data.split(" ")[0]);
    setUrl(
      `https://react-sop.onrender.com/file/${data.split(" ")[0]}%20${
        data.split(" ")[1]
      }%20${data.split(" ")[2]}`
    );
    setopen1(true);
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
              Download/Open
            </p>
            <p className="basis-1/4 py-2.5 border-r-[1px] border-black/30 ">
              Remove
            </p>
            <p className="basis-1/4 py-2.5 border-r-[1px] border-black/30 ">
              QR Code
            </p>
          </div>
        </div>
        {filedata?.map((item) => (
          <div className=" text-center border-b-[1px] border-black/50  ">
            <div className="flex">
              {" "}
              <p className="basis-1/5 py-2.5 border-r-[1px] border-black/30 ">
                {item.filename.split(" ")[0]}
              </p>
              <p className="basis-1/5 py-2.5 border-r-[1px] border-black/30 ">
                {item.filename.split(" ")[1]}
              </p>
              <p className="basis-1/5 py-2.5 border-r-[1px]   border-black/30 ">
                <a
                  href={`https://react-sop.onrender.com/file/${item.filename}`}
                  target="_blank"
                >
                  <span className="flex flex-col sm:flex-row items-center space-x-1 justify-center md:w-[120px]  w-[90%] text-white py-1 rounded-md shadow-lg hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer mx-auto sm:gap-2 text-sm bg-green-500 ">
                    Click Here <AiFillFolderOpen className="text-xl" />
                  </span>
                </a>
              </p>
              <p
                className={`basis-1/5 py-2.5 border-r-[1px] ${
                  user?.name || admin?.name || subUser?.name
                    ? "inline-block"
                    : "hidden"
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
                className={`basis-1/5 py-2.5 border-r-[1px] ${
                  user?.name || admin?.name || subUser?.name
                    ? "hidden"
                    : "inline-block"
                }   border-black/30 `}
              >
                <Link to="/login">
                  <span className="flex flex-col sm:flex-row items-center justify-center space-x-1  md:w-[120px] w-[90%] text-white py-1 rounded-md shadow-lg hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer mx-auto sm:gap-2 text-sm bg-blue-500 ">
                    Login <BiLogIn className="text-xl" />
                  </span>
                </Link>
              </p>
              <p
                className={`basis-1/5 py-2.5 border-r-[1px]
                
                 border-black/30 `}
              >
                <span
                  onClick={() => handleOpen(item.filename)}
                  className="flex flex-col sm:flex-row items-center justify-center space-x-1  md:w-[120px] w-[90%] text-white py-1 rounded-md shadow-lg hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer mx-auto sm:gap-2 text-sm bg-blue-500 "
                >
                  QR Code
                </span>
              </p>
            </div>
          </div>
        ))}
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
            {name} file QR CODE
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
    </div>
  );
};

export default Table;
