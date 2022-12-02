import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

import dotenv from "dotenv";

dotenv.config();

const storage = new GridFsStorage({
  url: process.env.URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // In here you have access to the request and also to the body object
      const filename = `${req.body.name} ${req.body.department}`;
      const fileInfo = {
        filename: filename,
        department: req.body.department,
        bucketName: "files",
      };
      resolve(fileInfo);
    });
  },
});

export default multer({ storage });
