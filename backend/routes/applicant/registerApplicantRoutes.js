import { applicantSigninController } from "../../controller/applicant/applicantSigninController.js";
import { RegisterApplicantController } from "../../controller/applicant/registerApplicantController.js";
import express from "express"

const router = express.Router()

router.post("/register-applicant", RegisterApplicantController)
router.post("/signin-applicant", applicantSigninController)
export default router;