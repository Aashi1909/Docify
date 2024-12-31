import Navbar from '../components/Navbar'
import { IoMdAdd } from "react-icons/io";
import Docs from '../components/Docs'
import { MdOutlineTitle } from "react-icons/md";


const Home = () => {
  return (
    <>
     <Navbar /> 
     <div className="flex items-center justify-between w-[full] px-[100px]">
      <h3 className='mt-7 mb-3 text-3xl'>All Documents</h3>
      <button className='btnBlue'><i><IoMdAdd /></i>Create New Document</button>
     </div>

     <div className="allDocs px-[100px] mt-4">
     <Docs />
     </div>

     <div className="docsModelContainer fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,0.3)] w-screen h-[screen] flex flex-col items-center justify-center">
      <div className="docsModel bg-[#fff] p-[15px] rounded-lg w-[35vw] h-[30vh]">
        <h3 className='text-[20px] font-semibold'>Create New Document</h3>

        <div className='inputContainer mt-3'>
        <p className='text-[20px] text-black'>Title</p>
        <div className='inputBox w-[100%]'>
          <i><MdOutlineTitle/></i>
          <input type='text' placeholder='Title' id='title' name='title'  required />
        </div>
    </div>

    <div className="flex items-center gap-2 justify-between w-full ">
      <button className="btnBlue ! min-w-[48%]">Create New Document</button>
      <button className="p-[10px] bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer min-w-[40%]">Cancel</button>
    </div>

      </div>
     </div>
    </>
  )
}

export default Home


