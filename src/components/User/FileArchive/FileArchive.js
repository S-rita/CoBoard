import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const FileArchive = ({
  isDropdownVisible,
  toggleDropdown,
  handleSortSelection,
}) => {
  const { sid } = useParams(); // Assuming `sid` is passed in the route params
  const [selectedFileType, setSelectedFileType] = useState(null); // State to track selected file type
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fileTypes = [
    "docx",
    "pptx",
    "xlsx",
    "mp4",
    "mp3",
    "py",
    "txt",
    "c",
    "cpp",
    "h",
    "js",
    "java",
    "html",
    "jsx",
    "css",
    "rs",
    "cargo",
    "asm",
  ];

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/${sid}`);
        setFiles(response.data.files || []); // Assuming files are returned in `response.data.files`
      } catch (err) {
        setError(err.response ? err.response.data.detail : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [sid]);

  const handleFileTypeClick = (type) => {
    setSelectedFileType(type); // Set selected file type
    toggleDropdown(); // Close the dropdown
  };

  const resetSelection = () => {
    setSelectedFileType(null); // Reset selected file type
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="mt-6 ml-4">
        <div className="flex flex-row items-center mt-12 ml-10 gap-6">
          <div className="text-black text-4xl font-bold whitespace-nowrap">
            File Archive
          </div>
          <div className="bg-gray-400 h-[3px] w-[940px] flex-shrink-0" />
        </div>

        <div
          className="w-[150%] rounded-lg bg-white max-w-4xl mx-auto mt-10 ml-10 h-[100vh]" // Sets height to extend beyond viewport
          style={{
            boxShadow:
              "inset 0 1px 8px rgba(0, 0, 0, 0.2), inset 0 -4px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="ml-[50px] flex gap-2 relative mt-8">
            {selectedFileType ? (
              <>
                <div className="-ml-3 mt-8 flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-tl-lg rounded-bl-lg hover:bg-[#B3D7EE]">
                  <span className="text-lg font-semibold">
                    {selectedFileType}
                  </span>
                  <button
                    onClick={toggleDropdown}
                    className="text-black font-semibold px-1 rounded transition-colors"
                  >
                    <img
                      src="/asset/triangle.svg"
                      alt="Dropdown"
                      className="w-[15px] h-[15px] ml-[10px]"
                    />
                  </button>
                </div>
                <button
                  onClick={resetSelection}
                  className=" mt-8 text-black font-bold px-4 bg-blue-100 rounded transition-colors -ml-1 rounded-br-lg rounded-tr-lg hover:bg-[#B3D7EE]"
                >
                  X
                </button>
              </>
            ) : (
              <div
                onClick={toggleDropdown}
                className="-ml-3 mt-8 flex items-center bg-white px-4 py-2 rounded-lg cursor-pointer w-[120px] border-[1px] border-[#434746] hover:bg-[#F0F0F0] transition-colors"
              >
                <span className="text-black font-semibold ml-2">Type</span>
                <img
                  src="/asset/triangle.svg"
                  alt="Dropdown"
                  className="w-[15px] h-[15px] ml-auto"
                />
              </div>
            )}
            <div
              className={`-ml-3 top-[25px] absolute bg-white border border-gray-300 rounded-lg shadow-lg mt-[50px] z-10 transition-all duration-100 ${
                isDropdownVisible
                  ? "max-h-80 opacity-100 overflow-auto"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <ul className="p-4 text-left w-[180px]">
                {fileTypes.map((type) => (
                  <li
                    key={type}
                    onClick={() => handleFileTypeClick(type)}
                    className="flex items-center whitespace-nowrap py-2 px-2 cursor-pointer hover:bg-gray-200 transition-colors w-full"
                  >
                    <img
                      src={`/asset/${type}.png`}
                      alt={`${type} icon`}
                      className="w-8 h-8 mr-4"
                    />
                    <span className="text-left">{type}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 ml-4">
            {files.length > 0 ? (
              files.map((file) => (
                <div
                  key={file.file_id}
                  className="flex items-center p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={`/asset/${file.extension || 'default'}.png`}
                    alt={`${file.extension || 'File'} Icon`}
                    className="w-8 h-8 mr-3"
                  />
                  <div>
                    <p className="text-lg font-semibold">{file.filename}</p>
                    <p className="text-gray-600 text-sm">
                      {file.description || 'No description available'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No files available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileArchive;
