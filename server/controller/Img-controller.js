import grid from "gridfs-stream";
import mongoose from "mongoose";

const url = "https://react-sop.onrender.com";

const conn = mongoose.connection;
let gfs, gb;
conn.once("open", () => {
  gb = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "files",
  });

  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("files");
});
export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(404).json("file not foud");
  }

  const imgurl = `${url}/file/${req.file.filename}`;

  return res.status(200).json(imgurl);
};

export const getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readstream = gb.openDownloadStream(file._id);
    readstream.pipe(res);
  } catch (e) {
    console.log(e.message);
  }
};

export const getAllImage = (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }

    // Files exist
    return res.json(files);
  });
};

export const FileDelete = async (req, res) => {
  try {
    console.log(req.body);
    const file = await gfs.files.findOneAndDelete({ filename: req.body.name });
    console.log(file);

    res.json("File has been deleted");
  } catch (err) {
    res.json(err);
  }
};
