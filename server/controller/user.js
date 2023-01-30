import { collection } from "../db/db.js";
import admin from "../model/admin.js";
import departments from "../model/Departments.js";
import folder from "../model/folder.js";
import SubUser from "../model/slaves.js";

import user from "../model/user.js";

export const addUser = async (request, response) => {
  try {
    let exist = await user.findOne({ name: request.body.name });

    if (exist) {
      response.status(203).json("user already exists");
      return;
    }

    const newUser = new user(request.body);
    await newUser.save();
    response.status(200).json(newUser);
    console.log(newUser);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const subUser = async (request, response) => {
  console.log("gello");
  try {
    let exist = await SubUser.findOne({ name: request.body.name });

    if (exist) {
      response.status(203).json("user already exists");
      return;
    }

    const newUser = new SubUser(request.body);
    await newUser.save();
    response.status(200).json(newUser);
    console.log(newUser);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const GetAll = async (req, res) => {
  try {
    let data = await user.find({});
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};

export const getAllFolders = async (req, res) => {
  try {
    let data = await folder.find({});
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};

export const Getdep = async (req, res) => {
  try {
    let data = await departments.find({});
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};

export const GetCollections = async (req, res) => {
  try {
    res.status(200).json(collection);
  } catch (e) {
    console.log(e);
  }
};

export const Deleteuser = async (req, res) => {
  try {
    await user.findOneAndDelete({ name: req.body.row.firstName });
    console.log(req.body.row.firstName);
    res.json("User has been deleted");
  } catch (err) {
    res.json(err);
  }
};

export const getAdmin = async (req, res) => {
  try {
    const user = await admin.findOne({ name: req.body.name });
    !user && res.status(401).json("wrong Username");
    const pass = user?.password;
    pass !== req.body.password && res.status(401).json("Wrong Password");

    res.status(200).json({ user });
  } catch (error) {
    // res.status(500).json(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await user.findOne({ name: req.body.name });
    !users && res.status(401).json("wrong Username");
    const pass = users?.password;
    pass !== req.body.password && res.status(401).json("Wrong Password");

    res.status(200).json({ users });
  } catch (error) {
    // res.status(500).json(error);
  }
};

export const getSubUser = async (req, res) => {
  try {
    const users = await SubUser.findOne({ name: req.body.name });
    !users && res.status(401).json("wrong Username");
    const pass = users?.password;
    pass !== req.body.password && res.status(401).json("Wrong Password");

    res.status(200).json({ users });
  } catch (error) {
    // res.status(500).json(error);
  }
};

export const DepartmentAdd = async (request, response) => {
  try {
    let exist = await departments.findOne({ name: request.body.name });

    if (exist) {
      response.status(200).json("Department already exists");
      return;
    }

    const newDep = new departments(request.body);
    await newDep.save();
    response.status(200).json(newDep);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const folderAdd = async (request, response) => {
  console.log(request.body);
  try {
    let exist = await folder.findOne({ name: request.body.name });

    if (exist) {
      response.status(200).json("Folder already exists");
      return;
    }

    const newDep = new folder(request.body);
    await newDep.save();
    response.status(200).json(newDep);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const deleteDep = async (req, res) => {
  try {
    await departments.findOneAndDelete({ name: req.body.name });
    console.log(req.body.row.firstName);
    res.json("Department has been deleted");
  } catch (err) {
    res.json(err);
  }
};
