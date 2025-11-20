import express from "express";
import helmet from "helmet";
import applicantroutes from "./routes/applicantSigninRoutes.js";
import cors from "cors"
const app = express();
const port = 5000;

// Enable json request
app.use(express.json());
// Use cors 
app.use(cors())
// Basic Helmet protections
app.use(helmet());
// Custom CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:5000"],
      imgSrc: ["'self'", "data:"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"], // React dev needs inline styles
      fontSrc: ["'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
    },
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Correct router usage
app.use("/test", applicantroutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
