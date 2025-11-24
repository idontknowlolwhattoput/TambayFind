import { connection } from "../../config/db.js";

export const EmployerSigninController = (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required."
    });
  }

  // Correct SQL query
  const query = `
    SELECT * 
    FROM employer_credential 
    WHERE username = ? AND password = ?
  `;

  connection.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error.",
        error: err
      });
    }

    // No matching account
    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password."
      });
    }

    // Successfully found user
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      applicant: results[0]
    });
  });
};
