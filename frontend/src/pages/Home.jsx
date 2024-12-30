import Navbar from '../components/Navbar'
import { IoMdAdd } from "react-icons/io";
import Docs from '../components/Docs'

const Home = () => {
  return (
    <>
     <Navbar /> 
     <div className="flex items-center justify-between px-[100px]">
      <h3 className='mt-7 mb-3 text-3xl'>All Documents</h3>
      <button className='btnBlue'><i><IoMdAdd /></i>Create New Document</button>
     </div>

     <div className="allDocs px-[100px] mt-4"></div>
     <Docs />
    </>
  )
}

export default Home


