import { body, param, validationResult } from "express-validator";

import { userRepository } from "../repositories/index.js";

import HttpStatusCode from "../exceptions/HttpStatusCode.js";

import { EventEmitter } from "node:events";

import Exception from "../exceptions/Exception.js";

const myEvent = new EventEmitter();

myEvent.on("event.register.user", (params) => {
  console.log(`They talked about: ${JSON.stringify(params)}`);
});
const getById = async (req, res) => {};

export default {
  getById,
};
