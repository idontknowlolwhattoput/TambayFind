import { connection } from "../../config/db.js";

export const fetchApplicantController = (req, res) => {
  const { applicant_id } = req.params; // Get applicant_id from URL

  if (!applicant_id) {
    return res.status(400).json({ success: false, message: "applicant_id is required" });
  }

  const query = "SELECT * FROM applicant_details WHERE applicant_id = ?";
  connection.query(query, [applicant_id], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: err });
    }

    res.status(200).json({ success: true, result: results });
  });
};
