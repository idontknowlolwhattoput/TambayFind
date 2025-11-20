import bgsearch from "../assets/svg/banner.svg"
import logo from "../assets/svg/logo.svg"
import { useNavigate } from "react-router"
export default function Home() {
    const navigate = useNavigate()
    return (
      <div className="w-screen h-screen ">
        {/* NAVBAR */}
        <nav className="intertracking-tight h-[10vh]  flex items-center ">
          {/* NAVBAR LOGO & NAME LEFT SIDE */}
          <div className="font-bold text-2xl flex items-center pt-7 pl-30  h-full   w-[30%]">
            <img src={logo} className="w-10 h-10"/>
            <p className="">Tambay</p>
            <p className="text-green-600">Find</p>
          </div>
          {/* NAV LINKS */}
          <div className="text-xs w-[30%] poppins  h-full flex items-center justify-center gap-4  pt-7 transition ">
            <p className="sel-bar">Job Search</p>
            <p className="sel-bar" p>Company Search</p>
            <p className="sel-bar"p>Community</p>
            <p className="sel-bar">About Us</p>
          </div>
          {/* SIGN IN BUTTONS */}
          <div className="ml-5 poppins w-[40%]  h-full flex items-center justify-center gap-7 pt-7 transition ">
            <button className="w-30 h-8 border-3 border-green-700 rounded-sm text-green-700"
            onClick={() => navigate("/applicant/signin")}>Sign in</button>
            <p className="text-green-700">Employers Site</p>
          </div>
        </nav>

        {/* SEARCH BAR SECTION*/}
        <div className="searchbar mt-5 h-30 bg-black w-full flex items-center justify-center gap-4"> 
          <div className="flex flex-col">
            <p className="text-white font-bold">What</p>
            <input type="text" className="pl-3 text-sm  w-50 h-8 bg-white rounded-sm" placeholder="Enter job keyword"/>
          </div>
          <div className="flex flex-col">
            <p className="text-[#363635] font-bold">Class</p>
            <input type="text" className="pl-3 text-sm w-50 h-8 bg-white rounded-sm" placeholder="Enter job classification"/>
          </div>
          <div className="flex flex-col">
            <p className="text-white font-bold">Location</p>
            <input type="text" className="pl-3 w-50 h-8 text-sm  bg-white rounded-sm" placeholder="Enter job location"/>
          </div>
          <button className="mt-6 w-50 h-9 bg-green-600 rounded-md text-white font-bold">Search Job</button>
        </div>
      </div>
    )
}