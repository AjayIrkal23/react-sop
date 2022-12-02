import mongoose from "mongoose";

const folderschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

const folder = mongoose.model("folders", folderschema);

export default folder;
