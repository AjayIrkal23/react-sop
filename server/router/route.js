import express from "express";
import {
  FileDelete,
  getAllImage,
  getImage,
  uploadFile,
} from "../controller/Img-controller.js";
import {
  addUser,
  deleteDep,
  Deleteuser,
  DepartmentAdd,
  folderAdd,
  getAdmin,
  GetAll,
  getAllFolders,
  GetCollections,
  Getdep,
  getUser,
} from "../controller/user.js";
import upload from "../upload.js";

const route = express.Router();

route.post("/add", addUser);
route.post("/adddep", DepartmentAdd);
route.post("/addfolder", folderAdd);
route.post("/getadmin", getAdmin);
route.post("/getuser", getUser);
route.get("/getall", GetAll);
route.get("/getallfolders", getAllFolders);
route.get("/getcollections", GetCollections);
route.get("/getdepartments", Getdep);
route.post("/delteuser", Deleteuser);
route.post("/filedelete", FileDelete);
route.post("/deletedep", deleteDep);

route.post("/file/upload", upload.single("file"), uploadFile);
route.get("/file/:filename", getImage);
route.get("/", async (req, res) => {
  res.send("hello vai").json();
});
route.get("/allfiles", getAllImage);

export default route;
