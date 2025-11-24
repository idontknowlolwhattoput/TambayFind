import { useState } from 'react'
import {Routes, Route, BrowserRouter} from "react-router"

import Home from './pages/home'
import RouteProtection from './pages/routeprotection'
import ApplicantProfile from './pages/applicant/applicantprofile'

import AuthProvider from './context/AuthProvider'
import ApplicantSignup from './pages/applicant/applicantsignup'
import ApplicantLogin from './pages/applicant/applicantlogin'
import ApplicantSignupOTP from './pages/applicant/applicantsignupotp'
import CreatePassword from './pages/applicant/createpassword'
import EmployerRegistration from './pages/employer/employerregister'

function App() {
  return (
     <AuthProvider>
       <BrowserRouter>
         <Routes> 
           <Route path="/" element={<Home />}/>
           <Route path="/employer/register" element={<EmployerRegistration/>} />
           <Route path="/applicant/signup" element={<ApplicantSignup/>} />
           <Route path="/applicant/signin" element={<ApplicantLogin/>} />
           <Route path="/applicant/verify-otp" element={<ApplicantSignupOTP/>} />
           <Route path="/applicant/create-password" element={<CreatePassword />} />
           <Route path="/applicant/profile" element={<ApplicantProfile />} />
           <Route element={<RouteProtection/>}>
             <Route path="/applicant/profile" element={<ApplicantProfile />}/>
           </Route>
         </Routes>      
       </BrowserRouter>
     </AuthProvider>
  )
}

export default App
