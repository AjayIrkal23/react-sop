import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export let collection;

const Connection = async () => {
  try {
    await mongoose.connect(process.env.URL, { useUnifiedTopology: true });
    console.log("Db Connected Sucessfully");
    mongoose.connection.db.listCollections().toArray(function (err, names) {
      collection = names;
    });
  } catch (err) {
    console.log(err.message);
  }
};

export default Connection;
