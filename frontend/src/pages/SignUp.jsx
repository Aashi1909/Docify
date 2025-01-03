import logo from '../images/logo.png'
import { FaUser } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";
import { Link , useNavigate} from "react-router-dom";
import rightIMG from '../images/signUpRight.png'
import { useState } from "react";
import { api_base_url } from '../Helper';




const Signup = () => {
  const navigate = useNavigate()
  const[username, setUsername] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[phone, setPhone] = useState("")
  const[error, setError] = useState("")

  const createUser = (e) =>{
    e.preventDefault()
    fetch(api_base_url + "/signUp", {
      mode:"cors",
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username:username,
        email:email,
        password:password,        
        phone:phone
      })
    }).then((res) => res.json())
    .then((data) => {
      if(data.success == false)
      {
        setError(data.message)
      }
      else{
        navigate("/login")
      }
    })

  }
  return (
    <>
    <div className='flex overflow-hidden items-center w-screen justify-center flex-col h-screen bg-[#F0F0F0]'>
        <div className='flex w-full items-center '>
        <div className='left w-[30%] flex flex-col ml-[100px] '>
            <img className='w-[250px]' src={logo} alt="" />
            <form className=" pl-3 mt-5 "action='' onSubmit={createUser}>
                <div className='inputContainer'>
                    <p className='text-[15px] text-black'>Username</p>
                    <div className='inputBox w-[100%]'>
                      <i><FaUser/></i>
                      <input type='text' placeholder='Username' id='username' name='username' onChange={(e)=>{setUsername(e.target.value)}} value={username} required />

                    </div>
                </div>
                
                <div className='inputContainer'>
                    <p className='text-[15px] text-black'>Email</p>
                    <div className='inputBox w-[100%]'>
                      <i><MdEmail/></i>
                      <input type='email' placeholder='Email' id='Email' name='Email' onChange={(e)=>{setEmail(e.target.value)}} value={email} required />

                    </div>
                </div>
                <div className='inputContainer'>
                    <p className='text-[15px] text-black'>Password</p>
                    <div className='inputBox w-[100%]'>
                      <i><RiLockPasswordFill/></i>
                      <input type='password' placeholder='Password' id='Password' name='Password' onChange={(e)=>{setPassword(e.target.value)}} value={password} required />
                      <i className='cursor-pointer !mr-3 !text-[25px]'><FaEye/></i>

                    </div>
                </div>
                <div className='inputContainer'>
                    <p className='text-[15px] text-black'>Phone</p>
                    <div className='inputBox w-[100%]'>
                      <i><FaPhone/></i>
                      <input type='phone' placeholder='Phone' id='Phone' name='Phone' onChange={(e)=>{setPhone(e.target.value)}} value={phone} required />

                    </div>
                </div>
                <p className='text-red-500 text-[15px] my-2'>{error}</p>
                <p>Already have an Account? <Link to="/login" className='text-blue-500' >Login</Link></p>
                <button className='p-[10px] bg-green-500 transition-all hover:bg-green-700 text-white rounded-lg w-full border-0'>SignUp</button>
             

            </form>

        </div>
        <div className='right flex items-end justify-end'>
          <img src={rightIMG} alt='' className='h-full ' />

        </div>
        </div>

    </div>
    </>

  )
}

export default Signup