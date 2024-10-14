import express from "express";
import { body, validationResult } from "express-validator";
import { authController } from "../src/controller/index.js";
const router = express.Router();
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  authController.login
);
router.post("/register", authController.register);
router.post("/forgot", authController.forgot);
router.post("/reset", authController.resetPassword);
export default router;
