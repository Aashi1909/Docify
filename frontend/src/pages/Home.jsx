import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { IoMdAdd } from "react-icons/io";
import Docs from "../components/Docs";
import { MdOutlineTitle } from "react-icons/md";
import { useEffect, useState } from "react";
import { api_base_url } from '../Helper';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const[title, setTitle] = useState(" ");
  const[error, setError] = useState(" ");

  const[data, setData] = useState(null)

  const navigate = useNavigate("")

  const createDoc = () => {
    if(title === "") {
      setError("Please enter title");
    }
    else{
      fetch(api_base_url + "/createDoc",{
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          docName: title,
          userId: localStorage.getItem("userId")
        })
      }).then(res=>res.json()).then(data => {
        if(data.success) {
          setIsCreateModelShow(false);
          navigate(`/createDocs/${data.docId}`)
        }
        else{
          setError(data.message);
        }
      })
    }
  }

  const getData =()=>{
    fetch(api_base_url +"/getAllDocs",{
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res=>res.json()).then(data => {
      setData(data.docs)

    })
  }
  useEffect(() =>{
    getData()
  }, [])

  
  return (
    <>
     <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <div className=" bg-gray-100">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-full p-6 overflow-y-auto">
      <div className="flex items-center justify-between w-[full] px-[80px]">
        <h3 className="mt-7 mb-3 text-3xl">All Documents</h3>
        <button className="btnBlue" onClick={() => {
          setIsCreateModelShow(true)
          document.getElementById("title").focus()
        }}>
          <i>
            <IoMdAdd />
          </i>
          Create New Document
        </button>
      </div>

      <div className="allDocs px-[80px] mt-4">
        {
          data ? data.map((el,index)=>{
            return (
              <>
                <Docs docs={el} docID={`doc -${index+1}`} />
              </>
            )
          }) :""
        }
      </div>

      {isCreateModelShow ? (
        <>
          <div className="docsModelContainer fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,0.3)] w-screen h-[screen] flex flex-col items-center justify-center">
            <div className="docsModel bg-[#fff] p-[15px] rounded-lg w-[35vw] h-[30vh]">
              <h3 className="text-[20px] font-semibold">Create New Document</h3>

              <div className="inputContainer mt-3">
                <p className="text-[20px] text-black">Title</p>
                <div className="inputBox w-[100%]">
                  <i>
                    <MdOutlineTitle />
                  </i>
                  <input
                    type="text"
                    placeholder="Title"
                    id="title"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 justify-between w-full ">
                <button className="btnBlue ! min-w-[48%]" onClick={createDoc}>
                  Create New Document
                </button>
                <button
                  className="p-[10px] bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer min-w-[40%]"
                  onClick={() => setIsCreateModelShow(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

    </div>
    </div>
    </div>
     
      
    </>
  );
};

export default Home;
