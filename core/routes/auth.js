import express from "express";
import { body, validationResult } from "express-validator";
import { authController } from "../src/controller/index.js";
const router = express.Router()
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  authController.login
)
router.post("/register", authController.register)

export default router