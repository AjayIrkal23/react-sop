import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { QRCodeCanvas } from "qrcode.react";

import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import jsw from "../assets/jsw.png";
import { AiFillFileAdd, AiOutlineClose } from "react-icons/ai";

import { AccountContext, Accountprovider } from "../context/accountprovider";
import Departments from "../components/Departments";
import Navbar from "../components/Navbar";
import Folder from "../components/Folder";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

const File = () => {
  const [url, setUrl] = useState("");
  const [open, setopen] = useState(false);
  const [open1, setopen1] = useState(false);
  const [file, setfile] = useState(null);

  const qrRef = useRef();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  console.log(id);

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

  const handleClose1 = () => {
    setopen1(false);
  };

  const docs = [{ uri: require("../assets/test.pdf") }];

  return (
    <>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className=" h-[600px] md:h-auto bg-white absolute top-[50%] left-[50%] w-[80%] md:w-[600px] -translate-y-[50%] -translate-x-[50%] overflow-scroll">
          <img src={jsw} width="200px" className="py-2 mx-auto" alt="" />
          <p className="px-2 my-2 text-xl font-semibold text-center capitalize">
            {id.split("%")[0]} QR CODE
          </p>
          <div className="flex justify-center p-8">
            {" "}
            <div ref={qrRef}>{qrcode}</div>
          </div>
          <button
            onClick={downloadQRCode}
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 "
          >
            Download
          </button>
        </div>
      </Modal>
      <button
        onClick={() => setopen1(!open1)}
        className=" flex w-56 mx-auto py-1.5 my-2 bg-green-500  items-center justify-center font-semibold text-white rounded-md"
      >
        Show Qr Code
      </button>
      <DocViewer
        pluginRenderers={DocViewerRenderers}
        documents={docs}
        config={{
          header: {
            disableHeader: false,
            disableFileName: false,
            retainURLParams: false,
          },
        }}
        style={{ height: 1000 }}
      />
    </>
  );
};

export default File;
