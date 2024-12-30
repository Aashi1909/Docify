import logo from "../images/logo.png"
import { FaSearch } from "react-icons/fa";
import Avatar from 'react-avatar';


const Navbar = () => {
  return (
    <>
    <div className="navbar flex items-center px-[100px] h-[90px] justify-between bg-[#F4F4F4]">
    <img src={logo} alt=" " />
    <div className="right flex items-end justify-end gap-4">
      <div className="inputBox w-[25vw]">
        <i><FaSearch /></i>
        <input type="text" placeholder="Search Here...." />
      </div>
      <Avatar name="Wim Mostmans" className="cursor-pointer" size="50" round= "50%"  />
 
    </div>
    </div>
      
    </>
  )
}

export default Navbar
