import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()

export const connection = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "12345",
    database: "tambayfindlocal"
})

connection.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database!");
  }
});