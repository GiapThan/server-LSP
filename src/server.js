import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import router from "./routes";
import connectMongooseDB from "./config/mongoosedb";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
connectMongooseDB();
router(app);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Start server on ${process.env.PORT || 8000}`);
});
