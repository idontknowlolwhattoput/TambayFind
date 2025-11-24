import express from "express"

import { ApplicantSignup } from "../../controller/applicant/applicantsignupController.js"

const router = express.Router()

router.post('/send-otp', ApplicantSignup)

export default router;