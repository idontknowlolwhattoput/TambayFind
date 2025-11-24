import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Navbar() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [applicantData, setApplicantData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicantData = async () => {
      const applicantId = sessionStorage.getItem("applicant_id"); // Use localStorage
      if (!applicantId) {
        console.log("Not logged in");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/applicant/fetch-applicant/${applicantId}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        if (data.success && data.result.length > 0) {
          console.log("Applicant data:", data.result[0]);
          setApplicantData(data.result[0]);
          setLoggedIn(true); // ✅ Only set state inside useEffect
        } else {
          console.error("API returned error:", data.message);
        }
      } catch (error) {
        console.error("Error fetching applicant data:", error);
      }
    };

    fetchApplicantData(); // ✅ Call the function inside useEffect
  }, []); // Runs once when component mounts

  return (
    <div>
      {/* NAVBAR */}
      <nav className="intertracking-tight h-[10vh] flex items-center">
        {/* NAVBAR LOGO & NAME LEFT SIDE */}
        <div className="font-bold text-2xl flex items-center pt-7 pl-30 h-full w-[30%]">
          <p>Tambay</p>
          <p className="text-green-600">Find</p>
        </div>

        {/* NAV LINKS */}
        <div className="text-xs w-[30%] poppins h-full flex items-center justify-center gap-4 pt-7 transition">
          <p className="sel-bar">Job Search</p>
          <p className="sel-bar">Company Search</p>
          <p className="sel-bar">Community</p>
          <p className="sel-bar">About Us</p>
        </div>

        {/* SIGN IN BUTTONS */}
        <div className="ml-5 poppins w-[40%] h-full flex items-center justify-center gap-7 pt-7 transition">
          {isLoggedIn ? (
            <ButtonRenderLoggedIn applicant_name={applicantData?.first_name}/>
          ) : (
            <ButtonRenderLoggedOut navigate={navigate} />
          )}
        </div>
      </nav>
    </div>
  );
}

function ButtonRenderLoggedOut({ navigate }) {
  return (
    <div className="flex gap-8 justify-center items-center">
      <button
        className="w-30 h-8 border-3 border-green-700 rounded-sm text-green-700"
        onClick={() => navigate("/applicant/signin")}
      >
        Sign in
      </button>
      <p className="text-green-700">Employers Site</p>
    </div>
  );
}

function ButtonRenderLoggedIn({ applicant_name }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    sessionStorage.removeItem("applicant_id");
    localStorage.removeItem("applicant_id");
    navigate("/applicant/signin");
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="relative flex items-center gap-4">
      {/* User Profile Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-3 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-sm"
      >
        {/* Avatar Circle */}
        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {getInitials(applicant_name)}
        </div>
        
        {/* User Name */}
        <span className="text-sm font-medium text-gray-700">{applicant_name}</span>
        
        {/* Dropdown Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-12 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800">{applicant_name}</p>
            <p className="text-xs text-gray-500 mt-1">Welcome back!</p>
          </div>
          
          {/* Menu Items */}
          <ul className="flex flex-col">
            <li className="px-4 py-2 hover:bg-green-50 cursor-pointer transition-colors flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm text-gray-700">Profile</span>
            </li>
            
            <li className="px-4 py-2 hover:bg-green-50 cursor-pointer transition-colors flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-700">Saved searches</span>
            </li>
            
            <li className="px-4 py-2 hover:bg-green-50 cursor-pointer transition-colors flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span className="text-sm text-gray-700">Saved jobs</span>
            </li>
            
            <li className="px-4 py-2 hover:bg-green-50 cursor-pointer transition-colors flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm text-gray-700">Job applications</span>
            </li>
            
            <li className="px-4 py-2 hover:bg-green-50 cursor-pointer transition-colors flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-gray-700">Settings</span>
            </li>
            
            {/* Sign Out - Separated */}
            <div className="border-t border-gray-100 mt-1 pt-1">
              <li 
                className="px-4 py-2 hover:bg-red-50 cursor-pointer transition-colors flex items-center gap-3 text-red-600"
                onClick={handleSignOut}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm font-medium">Sign out</span>
              </li>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
}