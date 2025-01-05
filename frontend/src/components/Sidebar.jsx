import { IoDocuments } from "react-icons/io5";
import { RiFolderSharedFill } from "react-icons/ri";


const Sidebar = () => {
  return (
    <div className="w-60 h-screen bg-[#F4F4F4] shadow-xl border-r  flex flex-col">
        <nav className="flex flex-col mt-8 p-4 gap-4">
        <a
          href="#"
          className="flex items-center px-4 py-2 text-gray-600 font-semibold rounded  hover:text-blue-600"
        >
          <i className="text-2xl mx-3"><IoDocuments /></i> My Documents
        </a>
        <a
          href="#"
          className="flex items-center px-4 py-2 text-gray-600 font-semibold rounded hover:text-blue-600"
        >
          <i className="text-2xl mx-3"><RiFolderSharedFill /></i>Shared With Me
        </a>
        <a
          href="#"
          className="flex items-center px-4 py-2 text-gray-600 font-semibold rounded hover:text-blue-600"
        >
          <i className="text-2xl mx-3"><IoDocuments /></i>Settings
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
