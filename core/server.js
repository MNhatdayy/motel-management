import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import {
  usersRouter,
  roomsRouter,
  authRouter,
  bookingRouter,
  messageRouter,
  reviewRouter,
} from "../core/routes/index.js";
import path from "path";
import { dirname } from "path";
dotenv.config();
import connect from "../core/src/config/database/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT ?? 3000;

app.use("/users", usersRouter);
app.use("/rooms", roomsRouter);
app.use("/bookings", bookingRouter);
app.use("/messages", messageRouter);
app.use("/reviews", reviewRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.send("response from root router");
});

app.listen(port, async () => {
  console.log(`listening on port : ${port}`);
  try {
    await connect();
  } catch (error) {
    console.error("Database connection failed", error);
  }
});
