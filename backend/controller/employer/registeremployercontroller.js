import { connection } from "../../config/db.js";

export const RegisterEmployerController = (req, res) => {
  const { 
    username,
    password,
    first_name,
    middle_name, 
    last_name,
    company_name,
    company_email,
    company_phone,
    country,
    city
  } = req.body;

  // Input validation
  if (!username || !password || !first_name || !last_name || !company_name || !company_email || !company_phone) {
    return res.status(400).json({ 
      success: false, 
      message: "Required fields: username, password, first_name, last_name, company_name, company_email, company_phone" 
    });
  }

  // Start MySQL transaction
  connection.beginTransaction(err => {
    if (err) {
      return res.status(500).json({ success: false, error: err });
    }

    // 1. Insert into employer_credential
    const insertCredentialQuery = `
      INSERT INTO employer_credential (username, password)
      VALUES (?, ?)
    `;
    
    const credentialValues = [username, password];

    connection.query(insertCredentialQuery, credentialValues, (err, result1) => {
      if (err) {
        return connection.rollback(() => {
          res.status(500).json({ success: false, step: "credentials", error: err });
        });
      }

      // Get newly created employer_id
      const employer_id = result1.insertId;

      // 2. Insert into employer_details
      const insertDetailsQuery = `
        INSERT INTO employer_details 
        (employer_id, first_name, middle_name, last_name, company_name, company_email, company_phone, country, city)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const detailValues = [
        employer_id,
        first_name,
        middle_name || null,
        last_name,
        company_name,
        company_email,
        company_phone,
        country || null,
        city || null
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

          res.status(200).json({
            success: true,
            message: "Employer registered successfully.",
            employer_id,
            insert_details: result2
          });
        });
      });
    });
  });
};