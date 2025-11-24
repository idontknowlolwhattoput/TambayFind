import "../../index.css"
import logo from "../../assets/svg/logo.svg"
import { useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"

export default function EmployerSignin() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/employer/signin-employer", {
            username: formData.email, 
            password: formData.password
        })
        .then(response => {
            console.log("Success")
            sessionStorage.setItem("employer_id", response.data.employer.employer_id)
            navigate("/employer/dashboard")
        })
        .catch(error => {
             console.log("Error")
        })
    }

    return (
        <div className="w-screen h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="flex w-full max-w-3xl h-auto max-h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
                {/* Left Side - Login Form */}
                <div className="w-full md:w-1/2 bg-white flex flex-col p-8">
                    {/* LOGO AND NAME */}
                    <div className="flex items-center mb-6">
                        <img src={logo} className="w-8 h-8" alt="TambayFind Logo" />
                        <div className="flex text-xl font-bold ml-2">
                            <p className="text-gray-800">Tambay</p>
                            <p className="text-blue-600">Find</p>
                        </div>
                    </div>
                    
                    {/* LOGIN PROMPT */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back, Employer</h1>
                        <p className="text-gray-500 text-sm">Sign in to manage your job postings and candidates</p>
                    </div>

                    {/* LOGIN FORM */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
                                Business Email
                            </label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="company@email.com"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        
                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-xs">
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3 h-3" />
                                <span className="ml-2 text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                                Forgot password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded font-medium text-sm hover:bg-blue-700 transition-colors mt-4"
                        >
                            Sign In as Employer
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="text-center mt-6 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-600">
                            Don't have an employer account?{" "}
                            <a 
                                href="#" 
                                className="text-blue-600 hover:text-blue-700 font-medium"
                                onClick={() => navigate("/employer/signup")}
                            >
                                Create employer account
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right Side - Professional Info */}
                <div className="hidden md:block w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white">
                    <div className="h-full flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-4">Hire Top Talent</h2>
                        <p className="text-blue-100 mb-6">
                            Access your employer dashboard to:
                        </p>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center">
                                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                                Post new job opportunities
                            </li>
                            <li className="flex items-center">
                                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                                Manage applications
                            </li>
                            <li className="flex items-center">
                                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                                Connect with qualified candidates
                            </li>
                            <li className="flex items-center">
                                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                                Track hiring analytics
                            </li>
                        </ul>
                        <div className="mt-8 p-4 bg-blue-500 rounded-lg">
                            <p className="text-xs italic">
                                "TambayFind helped us find amazing talent in half the time!"
                            </p>
                            <p className="text-xs mt-2 font-medium">- Sarah Chen, Tech Recruiter</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}