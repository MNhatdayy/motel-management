import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "nhat23891@gmail.com",
    pass: "dico nvwl jaog cnrk",
  },
});
