import nodemailer from "nodemailer"
import { otpEmailTemplate } from "../config/otpEmailTemplate.js"

const otp = Math.floor(Math.random() * 1000000).toString();
const email = "vergarajoshuamiguel@gmail.com"


export const ApplicantSignup = async (req, res) => {

const { email } = req.body

const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vergarajoshuamiguel@gmail.com",
        pass: "ygou vurm zkjm znwd", // make sure this is set in your .env
      }
})

const info = await transporter.sendMail({
    from: '"TambayFind" <vergarajoshuamiguel@gmail.com>',
    to: email,
    subject: "TambayFind - OTP ",
    html: otpEmailTemplate(otp)   
   })
}

export const VerifyOTP = async (req, res) => {
   res.send(otp)
}


