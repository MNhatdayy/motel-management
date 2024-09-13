import express from "express";
import { body, validationResult } from 'express-validator'
import { userController } from "../src/controller/index.js";
const router = express.Router()
router.get('/',(req, res) =>{
    res.send('GET user')
})
export default router