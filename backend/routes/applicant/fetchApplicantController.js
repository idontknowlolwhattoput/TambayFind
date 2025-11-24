import express from "express";
import { fetchApplicantController } from "../../controller/applicant/fetchApplicantController.js";

const router = express.Router();

// GET /applicant/:applicant_id
router.get("/fetch-applicant/:applicant_id", fetchApplicantController);

export default router;
