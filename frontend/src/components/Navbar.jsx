import logo from "../images/logo.png"
import { FaSearch } from "react-icons/fa";
import Avatar from 'react-avatar';
import { api_base_url } from "../Helper";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [data, setData] = useState("")
  const[error, setError] = useState(null)

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

  useEffect(() => {
    getUser()
  }, [])
  return (
    <>
    <div className="navbar flex items-center px-[100px] h-[70px] justify-between bg-[#F4F4F4]">
    <img src={logo} alt=" " />
    <div className="right flex items-end justify-end gap-4">
      <div className="inputBox w-[25vw]">
        <i><FaSearch /></i>
        <input type="text" placeholder="Search Here...." />
      </div>

      <button className="p-[10px] min-w-[120px] bg-red-500 text-white rounded-lg border-0 transition-all hover:bg-red-600" onClick={logout}>Logout</button>
      <Avatar name={data? data.username: ""} src={data? data.profilePic: " "} className="cursor-pointer" size="50" round= "50%"  />
 
    </div>
    </div>
      
    </>
  )
}

export default Navbar
