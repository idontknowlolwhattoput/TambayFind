import "../../index.css"
import logo from "../../assets/svg/logo.svg"
import { useState } from "react"
import { useNavigate } from "react-router"

export default function ApplicantLogin() {
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

        console.log("Login attempt:", formData)
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
                            <p className="text-green-600">Find</p>
                        </div>
                    </div>
                    
                    {/* LOGIN PROMPT */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back</h1>
                        <p className="text-gray-500 text-sm">Sign in to continue to your account</p>
                    </div>

                    {/* LOGIN FORM */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors"
                                placeholder="your@email.com"
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
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        
                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-xs">
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500 w-3 h-3" />
                                <span className="ml-2 text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                                Forgot password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 px-4 rounded font-medium text-sm hover:bg-green-700 transition-colors mt-4"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="text-center mt-6 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-600" onClick={() => navigate("/applicant/signup")}>
                            Don't have an account?{" "}
                            <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                                Create account
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right Side - Professional Info */}
                <div className="bg-[#363635] w-[50%]">
                   
                </div>
            </div>
        </div>
    )
}   