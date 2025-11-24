import express from "express"

import { EmployerSigninController } from "../../controller/employer/employersignincontroller.js";

const router = express.Router()

router.post('/employer-signin', EmployerSigninController)

export default router;