import express from "express"

import { ApplicantSignup, VerifyOTP } from "../controller/applicantsignupController.js"

const router = express.Router()

router.post('/testing', ApplicantSignup)
router.get('/getotp', VerifyOTP)

export default router;