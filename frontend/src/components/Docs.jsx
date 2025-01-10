import React, { useState } from 'react'
import docsIcon from "../images/docsIcon.png"
import { MdDelete, MdMoreVert } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import {MdAttachEmail} from "react-icons/md"
import deleteImg from "../images/delete.png"
import { api_base_url } from '../Helper';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LinkPopup from './LinkPopup';
import EmailShare from "./EmailShare";





const Docs = ({ docs }) => {
  console.log(docs, "aashidocsss")
  const [error, setError] = useState("");
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isShareEmailModalOpen, setIsShareEmailModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null); // Holds the selected document info.


  const handleEmailClick = (docs) => {
    setSelectedDoc(docs); // Set the selected document details.
    setIsShareEmailModalOpen(true); // Open the modal.
  };



  // Generate a unique ID for each document item
  const docID = `doc-${docs._id}`;

  const navigate = useNavigate();

  const deleteDoc = (id, docID) => {
    let doc = document.getElementById(docID);
    fetch(api_base_url + "/deleteDoc", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        docId: id,
        userId: localStorage.getItem("userId")
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success === false) {
        setError(data.message);
      } else {
        setIsDeleteModelShow(false);
        setTimeout(() => {
          Swal.fire({
            title: 'Success!',
            text: 'Document deleted successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          })
        }, 100);
        doc.remove();
      }
    })
    .catch(error => {
      console.error("Error deleting document:", error);
      setError("An error occurred while deleting the document.");
    });
  };

  const generateLink = async (docId) => {
    try {
      const response = await fetch(api_base_url + "/generate-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          docId: docId,
        }),
      });
  
      const data = await response.json();
      if (response.ok && data.success) {
        setGeneratedLink(data.link);
        setIsPopupOpen(true); 
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to generate the link",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };
  

  return (
    <>
      <div id={docID} className='docs cursor-pointer rounded-lg flex items-center mt-2 justify-between p-[10px] bg-[#F0F0F0] transition-all hover:bg-[#DCDCDC]'>
        <div onClick={()=>{navigate(`/createDocs/${docs._id}`)}} className="left flex items-center gap-2">
          <img src={docsIcon} alt="" />
          <div>
            <h3 className='text-[20px]'>{docs.title}</h3>
            <p className='text-[14px] text-[#808080]'>
              <strong >Created On : </strong>{new Date(docs.date).toDateString()} | <strong>Last Updated :</strong> {new Date(docs.lastUpdate).toDateString()}
            </p>
          </div>
        </div>
        <div className="docsRight">
        <i ><MdMoreVert
            className="cursor-pointer text-lg hover:text-gray-700"
            onClick={() => setDropdownVisible(!dropdownVisible)}
          />
          </i>
          {dropdownVisible && (
            <div className="absolute right-0 bg-white shadow-lg rounded-lg w-40">
              <ul className="text-sm text-gray-700">
                <li
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer transition-all"
                  onClick={() => setIsDeleteModelShow(true)}
                >
                  <i className="text-[20px] text-red-500 transition-all hover:text-red-600">
                    <MdDelete />
                  </i>
                  <span className="text-gray-800">Delete</span>
                </li>
                <li className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer transition-all" onClick={()=>generateLink(docs._id)}>
                  <i className="text-[20px] text-blue-500 transition-all hover:text-blue-600">
                    <FaLink />
                  </i>
                  <span className="text-gray-800">Generate Link</span>
                </li>

                <LinkPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                link={generatedLink}
              />
                <li className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer transition-all" onClick={() =>handleEmailClick(docs)}>
                  <i className="text-[20px] text-green-500 transition-all hover:text-green-600">
                    <MdAttachEmail />
                  </i>
                  <span className="text-gray-800">Share via Email</span>
                </li>
                {isShareEmailModalOpen && (
                <EmailShare
                isOpen={isShareEmailModalOpen}
                onClose={() => setIsShareEmailModalOpen(false)}
                docs={selectedDoc}
              />
            )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {isDeleteModelShow && (
        <div className="deleteDocsModelCon fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,.3)] w-screen h-screen flex flex-col items-center justify-center">
          <div className="deleteModel flex flex-col justify-center p-[15px] bg-[#fff] rounded-lg w-[30vw] h-[29vh]">
            <h3 className='text-[20px]'>Delete Document</h3>
            <div className="flex items-center gap-3">
              <img src={deleteImg} alt="" />
              <div>
                <h3 className='text-[20px]'>Do You Want to Delete This Document?</h3>
                <p className='text-[14px] text-[#808080]'>Delete / Cancel</p>
              </div>
            </div>
            <div className="flex mt-2 items-center gap-2 justify-between w-full">
              <button onClick={() => { deleteDoc(docs._id, docID) }} className='p-[10px] bg-red-500 transition-all hover:bg-red-600 text-white rounded-lg border-0 cursor-pointer min-w-[49%]'>Delete</button>
              <button onClick={() => { setIsDeleteModelShow(false) }} className='p-[10px] bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer min-w-[49%]'>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Docs;