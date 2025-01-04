import logo from "../images/logo.png"
import { FaSearch } from "react-icons/fa";
import Avatar from 'react-avatar';
import { api_base_url } from "../Helper";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";



const Navbar = () => {
  const [data, setData] = useState("")
  const[error, setError] = useState(null)
  const [dropdownVisible, setDropdownVisible] = useState(false);


  const navigate = useNavigate();

  const getUser = () => {
    fetch(api_base_url  + "/getUser", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json().then((data) => {
      console.log(data,"inside thissss")
      if(data.success == false)
      {
        setError(data.message)
      }else{
        setData(data.user)
      }
    })
  )}

  const logout =() =>{
    console.log("logout")
    fetch(api_base_url + "/logout", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then((data) => {
      console.log(data,"inside thissss")
      if(data.success == false)
      {
        setError(data.message)
      }else{
        localStorage.removeItem("userId")
        localStorage.removeItem("token")
        localStorage.removeItem("isLoggedIn")
        navigate("/login")
      }
      
    })
  }

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <>
      <div className="navbar flex items-center px-[100px] h-[70px] justify-between bg-[#F4F4F4]">
        <img src={logo} alt="Logo" />
        <div className="right flex items-end justify-end gap-4">
          <div className="inputBox w-[25vw] relative">
            <i>
              <FaSearch />
            </i>
            <input type="text" placeholder="Search Here...." />
          </div>

          <div className="relative">
            {/* Avatar */}
            <Avatar
              name={data ? data.username : ""}
              src={data ? data.profilePic : " "}
              className="cursor-pointer"
              size="50"
              round="50%"
              onClick={toggleDropdown}
            />

            {dropdownVisible && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-50">
                <ul className="py-2 w-40">
                <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"onClick={logout}>
                    <i><IoMdLogOut /></i>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};


export default Navbar
