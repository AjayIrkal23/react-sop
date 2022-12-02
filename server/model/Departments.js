import mongoose from "mongoose";

const departmentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const departments = mongoose.model("departments", departmentsSchema);

export default departments;
