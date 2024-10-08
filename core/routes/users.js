import express from "express";
import { userController } from "../src/controller/index.js";
const router = express.Router();
router.get("/:id", userController.getById);
router.get("/", userController.list);
router.put("/update/:id", userController.update);
router.delete("/delete/:id", userController.deleteUser);
export default router;
