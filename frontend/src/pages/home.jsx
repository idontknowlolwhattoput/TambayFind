import bgsearch from "../assets/svg/banner.svg"
import logo from "../assets/svg/logo.svg"
import { useNavigate } from "react-router"
import Navbar from "../modals/navbar"
export default function Home() {
    const navigate = useNavigate()
    return (
      <div className="w-screen h-screen ">
       <Navbar/>
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