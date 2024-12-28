import logo from '../images/logo.png'
import { FaUser } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


const Signup = () => {
  return (
    <>
    <div className='flex items-center w-screen justify-center flex-col h-screen bg-[#F0F0F0]'>
        <div className='flex w-full items-center '>
        <div className='left w-[35%] flex flex-col ml-[100px] '>
            <img className='w-[250px]' src={logo} alt="" />
            <form className=" pl-3 mt-5 "action=''>
                <div className='inputContainer'>
                    <p className='text-[15px] text-black'>Username</p>
                    <div className='inputBox w-[100%]'>
                      <i><FaUser/></i>
                      <input type='text' placeholder='Username' id='username' name='username' required />

                    </div>
                </div>
                <div className='inputContainer'>
                    <p className='text-[15px] text-black'>Name</p>
                    <div className='inputBox w-[100%]'>
                      <i><FaUser/></i>
                      <input type='text' placeholder='Name' id='Name' name='Name' required />

                    </div>
                </div>
                <div className='inputContainer'>
                    <p className='text-[15px] text-black'>Email</p>
                    <div className='inputBox w-[100%]'>
                      <i><FaUser/></i>
                      <input type='email' placeholder='Email' id='Email' name='Email' required />

                    </div>
                </div>
                <div className='inputContainer'>
                    <p className='text-[15px] text-black'>Password</p>
                    <div className='inputBox w-[100%]'>
                      <i><FaUser/></i>
                      <input type='password' placeholder='Password' id='Password' name='Password' required />
                      <i className='cursor-pointer !mr-3 !text-[25px]'><FaEye/></i>

                    </div>
                </div>
                <div className='inputContainer'>
                    <p className='text-[15px] text-black'>Phone</p>
                    <div className='inputBox w-[100%]'>
                      <i><FaUser/></i>
                      <input type='phone' placeholder='Phone' id='Phone' name='Phone' required />

                    </div>
                </div>
             

            </form>

        </div>
        <div className='right'>

        </div>
        </div>

    </div>
    </>

  )
}

export default Signup