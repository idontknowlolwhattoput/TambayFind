import { connection } from "../../config/db.js";

export const RegisterApplicantController = (req, res) => {  
  // Extract fields sent by frontend
  const {
    username,
    password,
    first_name,
    middle_name,
    last_name,
    phone,        // frontend sends "phone"
    email,
    country,
    city
  } = req.body;

  // Start MySQL transaction
  connection.beginTransaction(err => {
    if (err) {
      return res.status(500).json({ success: false, error: err });
    }

    // Insert into applicant_credentials
    const insertCredentialsQuery = `
      INSERT INTO applicant_credentials (username, password)
      VALUES (?, ?)
    `;
    const credentialValues = [username, password];

    connection.query(insertCredentialsQuery, credentialValues, (err, result1) => {
      if (err) {
        return connection.rollback(() => {
          res.status(500).json({ success: false, step: "credentials", error: err });
        });
      }

      // Newly created auto-increment applicant_id
      const applicant_id = result1.insertId;

      // Insert into applicant_details
      const insertDetailsQuery = `
        INSERT INTO applicant_details 
        (applicant_id, first_name, middle_name, last_name, phone_no, email, country, city)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const detailValues = [
        applicant_id,
        first_name,
        middle_name,
        last_name,
        phone,       // maps correctly to phone_no
        email,
        country,
        city
      ];

      connection.query(insertDetailsQuery, detailValues, (err, result2) => {
        if (err) {
          return connection.rollback(() => {
            res.status(500).json({ success: false, step: "details", error: err });
          });
        }

        // Commit both inserts
        connection.commit(err => {
          if (err) {
            return connection.rollback(() => {
              res.status(500).json({ success: false, step: "commit", error: err });
            });
          }

          return res.status(200).json({
            success: true,
            message: "Applicant registered successfully.",
            applicant_id,
            insert_details: result2
          });
        });
      });
    });
  });
};
