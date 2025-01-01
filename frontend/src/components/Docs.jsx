import docsIcon from "../images/docsIcon.png"
import { MdDelete } from "react-icons/md";
import deleteImg from "../images/delete.png";
import { useState } from "react";



const Docs = ({docs}) => {
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);

  return (
    <>
    <div className="docs cursor-pointer rounded-lg flex items-center mt-3 justify-between p-[10px] bg-[#F0F0F0] transition-all hover:bg-[#DCDCDC]">
        <div className="docsleft flex items-center gap-3">
            <img src={docsIcon} alt="" />
            <div>
                <h3 className="text-[25px]">Tips and Tricks</h3>
                <p className="text-[15px] text-[#808080]">Created in : 3July </p>
            </div>
        </div>
        <div className="docsright">
            <i className = "delete text-[40px] text-red-500 cursor-pointer transition-all hover:text-red-600" onClick={() => setIsDeleteModelShow(true)}><MdDelete /></i>
        </div>
    </div>

    {
        isDeleteModelShow ? (
        <>
        <div className="deleteDocsModelContainer fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,0.3)] w-screen h-[screen] flex flex-col items-center justify-center">
        <div className="deleteModel bg-[#fff] p-[15px] rounded-lg w-[35vw] h-[33vh] flex flex-col justify-center">
        <h3 className="text-[20px] font-semibold">Delete Document</h3>
          <div className="flex items-center gap-3">
            <img src={deleteImg} alt="" />
            <div>
              <h3 className="text-[20px] font-semibold">
                {" "}
                Do You Want To Delete This Document
              </h3>
              <p className="text-[14px] text-[#808080]">Delete / Cancel</p>
            </div>
          </div>
          <div className="flex mt-4 px-[40px] items-center gap-2 justify-between w-full ">
            <button className="p-[10px] bg-red-500 text-white rounded-lg border-0 cursor-pointer min-w-[40%]">
              Delete Document
            </button>
            <button
              className="p-[10px] bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer min-w-[40%]"
              onClick={() => setIsDeleteModelShow(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
        </>
        ):""
      }
    </>
  )
}

export default Docs