import { useContext, useState } from "react";
import { Outlet } from "react-router";
import { AuthContext } from "../context/AuthProvider";

import ApplicantLogin from "./applicant/applicantlogin";

export default function RouteProtection() {
   const [user, setUser] = useContext(AuthContext)
   return (
       user ?  <Outlet /> : <ApplicantLogin/>
   )
}