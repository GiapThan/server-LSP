import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import router from "./routes";
import connectMongooseDB from "./config/mongoosedb";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

connectMongooseDB();
router(app);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Start server on ${process.env.PORT || 8000}`);
});
