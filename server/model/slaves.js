import mongoose from "mongoose";

const subUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  folder: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const SubUser = mongoose.model("subUsers", subUserSchema);

export default SubUser;
