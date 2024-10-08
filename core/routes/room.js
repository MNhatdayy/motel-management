import express from "express";
import { roomController } from "../src/controller/index.js";
const router = express.Router();
router.post("/create", roomController.create);
router.get("/:id", roomController.getById);
router.put("/update/:id", roomController.update);
router.delete("/delete/:id", roomController.deleteRoom);
router.get("/", roomController.list);
export default router;
