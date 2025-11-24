import express from "express";
import helmet from "helmet";
import cors from "cors"

// ROUTES
import applicantroutes from "./routes/applicant/applicantSigninRoutes.js";
import registerapplicantroutes from "./routes/applicant/registerApplicantRoutes.js"
import fetchapplicants from "./routes/applicant/fetchApplicantController.js"
import registeremployerroute from "./routes/employer/registeremployerroute.js"

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


app.use("/api", applicantroutes);
app.use("/applicant", registerapplicantroutes)
app.use("/applicant", fetchapplicants )
app.use("/employer", registeremployerroute)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
