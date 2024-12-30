import docsIcon from "../images/docsIcon.png"
import { MdDelete } from "react-icons/md";

const Docs = ({docs}) => {
  return (
    <>
    <div className="docs cursor-pointer rounded-lg flex items-center mt-3 justify-between px-[100px] bg-[#F0F0F0] transition-all hover:bg-[#DCDCDC]">
        <div className="docsleft flex items-center gap-3">
            <img src={docsIcon} alt="" />
            <div>
                <h3 className="text-[25px]">Tips and Tricks</h3>
                <p className="text-[15px] text-[#808080]">Created in : 3July </p>
            </div>
        </div>
        <div className="docsright">
            <i className = "delete text-[35px] text-red-500 cursor-pointer transition-all hover:text-red-600"><MdDelete /></i>
        </div>

    </div>
    </>
  )
}

export default Docs