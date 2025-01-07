import { useState } from "react";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { api_base_url } from '../Helper';
import uploadImg from "../images/upload.jpg"



const FileConverter = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if(uploadedFile){
      if(uploadedFile.endsWith(".doc")){
        setFile(uploadedFile);
      }else{
        Swal.fire({
          icon: "error",
          title: "Unsupported File Format",
          text: "Please upload a .doc file only!",
          confirmButtonText: "OK",
        });
        e.target.value = null; 
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleConvert = async(type) => {
    if (!file) {
      alert("Please upload a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
        const response = await fetch(api_base_url + "/convert", {
        method: "POST",
        body: formData,
        });

        if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${file.name.split(".")[0]}.${type.toLowerCase()}`;
        link.click();
        alert(`File successfully converted to ${type}!`);
        } else {
        const error = await response.json();
        alert(error.error);
        }
    } catch (error) {
        console.error("Conversion Error:", error);
        alert("Failed to convert the file.");
    }
    };


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
            <div className="flex items-center justify-between w-[full] ">
              <h3 className="mt-7 mb-3 text-3xl">Export Documents</h3>
            </div>

            {/* Drag and Drop Area */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              style={{ height: "400px" }}
              className="flex items-center mt-3 justify-center border-2 border-dashed border-blue-600 rounded-lg p-6 mb-4 text-gray-700 font-semibold "
            >
             <div className="flex flex-col items-center">
              <img
                src={uploadImg}
                alt=""
                className="w-70 h-48 object-contain mb-4"
              />
              <p className="text-center" style={{ fontSize: "25px" }}>
                Drag and drop a file here, or{" "}
                <label
                  htmlFor="file-upload"
                  className="text-blue-500 font-medium cursor-pointer"
                >
                  browse
                </label>
              </p>
              <p className="text-gray-600" style={{ fontSize: "18px" }}>
                (Upload only doc file)
              </p>
            </div>

              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* File Name Display */}
            {file && (
              <div className="mb-4 text-center text-gray-700">
                <p className="text-sm">
                  Selected File:{" "}
                  <span className="font-medium">{file.name}</span>
                </p>
              </div>
            )}

            <div className="flex justify-center items-center ">
              <div className="mt-4">
                <button
                  onClick={() => handleConvert("PDF")}
                  className="flex items-center justify-center w-60 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition"
                >
                  <FaFilePdf className="mr-2" style={{fontSize: "25px"}} />
                  Convert to PDF
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
export default FileConverter;
