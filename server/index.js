import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

import Connection from "./db/db.js";
import route from "./router/route.js";

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", route);

Connection();
app.listen(process.env.PORT || 5000, () => {
  console.log("listening on port " + process.env.PORT);
});
