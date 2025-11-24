import BlankCard from "../../components/blankcard";
import showpass from "../../assets/svg/login/showpass.svg"
import hidepass from "../../assets/svg/login/hidepass.svg"
import axios from "axios"

import { useState } from "react";
import { useNavigate } from "react-router";
import Waiting from "../../modals/waiting";
    
export default function ApplicantSignup() {
    const [isLoading, setLoading] = useState()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSendOTP = (email) => {
        setLoading(true)
        axios.post('http://localhost:5000/api/send-otp', {
            email: email
        })
        .then(function (response) {
          setLoading(false)
          sessionStorage.setItem("otp", response.data);
          navigate("/applicant/verify-otp")
        })
         .catch(function (error) {
          console.log(error);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Signup data:", formData);
    };

    const handleGoogleSignup = () => {
        console.log("Google signup clicked");
    };

    return (
        <div className="w-screen min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
            <div className="max-w-md w-full">
                {/* Signup Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign Up</h1>
                        <p className="text-gray-600">Let's get started on your job application journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                placeholder="Enter your email"
                                required
                            />
                            
                        </div>

                        {/* Terms and Conditions */}
                        <div className="text-center">
                            <p className="text-xs text-gray-600">
                                By signing up to create an account I accept{" "}
                                <a href="#" className="text-green-600 hover:text-green-800 font-medium">
                                    Company's Terms of Use and Privacy Policy
                                </a>
                            </p>
                        </div>

                        {/* Send Email Button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium"
                            onClick={() => handleSendOTP(formData.email)}
                       >
                            Send email
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <a href="/applicant/signin" className="text-green-600 hover:text-green-800 font-medium">
                                Log in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
         {isLoading && (
           <div className="bg-white w-screen h-screen absolute inset-0">
             <Waiting />
           </div>
             )}
        </div>
    );
}