import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { usersRouter, roomsRouter, authRouter } from "../core/routes/index.js";
dotenv.config();
import connect from "../core/src/config/database/database.js";
import checkToken from "./src/authentication/auth.js";

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT ?? 3000;

app.use("/users",checkToken ,usersRouter);
app.use("/rooms",checkToken ,roomsRouter);
app.use("/auth", authRouter)
app.get("/", (req, res) => {
  res.send("response from root router");
});
app.listen(port, async () => {
  await connect();
  console.log(`listening on port : ${port}`);
});
