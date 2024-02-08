import { useState } from "react";
import NavBar from "../components/NavBar";
import { FaUser } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ScaleLoader } from "react-spinners";
import { FeaturedImageGallery } from "../components/Carousel";
import { SlCloudUpload } from "react-icons/sl";
import CanvasPage from "./CanvasPage";

const UploadPage = () => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [templateSelected, setTemplateSelected] = useState(false);

  const [download, setDownload] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    handleFile(files[0]);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    handleFile(files[0]);
  };

  const handleFile = (file) => {
    if (file && file.type === "image/png") {
      setSelectedFile(file);
    } else {
      alert("Please select a valid PNG image file.");
    }
  };

  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  //========== MetaMask Connect ========== //
  const [address, setAddress] = useState("");

  const metamaskConnect = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);
        setIsWalletConnected(true);
      } else {
        alert("Please install MetaMask!");
      }
    } catch (err) {
      console.log(err);
      setIsWalletConnected(false);
    }
  };

  const metamaskDisconnect = () => {
    try {
      setIsWalletConnected(false);
      setAddress("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex gap-x-8 font-int">
        <NavBar templateSelected={templateSelected} />
        <div className="right flex flex-col justify-between">
          <div className="upperNav flex items-center justify-end h-[10vh] w-[74vw] bg-dark rounded-xl px-8">
            {isWalletConnected ? (
              <>
                {templateSelected == true && (
                  <div
                    onClick={() => setDownload(true)}
                    className="saveBtn mr-6 cursor-pointer text-grn hover:bg-grn hover:dark duration-300 hover:text-dark bg-transparent border border-grn rounded-full  px-4 py-3"
                  >
                    Save & Upload
                  </div>
                )}

                <div className="flex flex-col">
                  <div
                    className={`relative w-[12rem] flex items-center justify-between bg-overlay h-12  ${
                      dropDown == true ? "rounded-t-xl" : "rounded-full"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="profile w-10 h-10 ml-1 bg-overlayLight rounded-full flex items-center justify-center">
                        <FaUser className="text-lg" />
                      </div>

                      <div className="font-oswald ml-2 overflow-hidden whitespace-nowrap max-w-[5.5rem] truncate">
                        {address}
                      </div>
                    </div>
                    <div
                      className="dropdown cursor-pointer mx-4 text-xl"
                      onClick={() => setDropDown(!dropDown)}
                    >
                      {dropDown == false ? (
                        <IoIosArrowDown />
                      ) : (
                        <IoIosArrowUp />
                      )}
                    </div>
                    {dropDown && (
                      <div
                        style={{ zIndex: 999 }}
                        className="dropdown absolute w-full bg-overlay rounded-b-xl top-12 "
                      >
                        <div className="items mt-3">
                          <div className="splitter h-[0.5px] w-full bg-overlayLight"></div>
                          <div className="changeWallet px-3 py-3 hover:bg-grn hover:text-dark cursor-pointer duration-300 ">
                            Change account
                          </div>
                          <div className="splitter h-[0.5px] w-full bg-overlayLight"></div>
                          <div
                            onClick={metamaskDisconnect}
                            className="Logout px-3 py-3  hover:bg-grn hover:text-dark cursor-pointer rounded-b-xl duration-300"
                          >
                            Logout
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div onClick={metamaskConnect} className="">
                <button className="px-4 py-2 border border-grn hover:bg-grn hover:text-dark font-semibold  transition-all duration-300 text-grn rounded-lg">
                  Connect
                </button>
              </div>
            )}
          </div>
          {templateSelected == false ? (
            <>
              {isWalletConnected == false && (
                <div className="body h-[74vh] w-[74vw] bg-dark rounded-xl px-8 flex flex-col items-center justify-center text-3xl gap-y-2">
                  <span>Connect your wallet</span>
                  <span className="text-xl">To upload the certificate</span>
                  <ScaleLoader color="#52D858" className="mt-4" />
                </div>
              )}

              {isWalletConnected == true && (
                <div className="flex justify-between">
                  <div className="body h-[74vh] w-[42vw] bg-dark rounded-xl px-8 flex gap-x-2  text-3xl gap-y-2">
                    <div className="templateSelector flex flex-col w-full">
                      <div className="flex justify-between">
                        <div className="heading my-6 text-xl">
                          Select a template
                        </div>
                        <button
                          onClick={() => setTemplateSelected(true)}
                          className="text-sm font-bold text-grn hover:text-dark hover:bg-grn duration-300 px-4 py-1 border border-grn my-4 rounded-lg"
                        >
                          Select
                        </button>
                      </div>
                      <FeaturedImageGallery />
                    </div>
                  </div>
                  <div className="body h-[74vh] w-[30vw] bg-dark rounded-xl px-8 flex  flex-col gap-x-2  text-3xl gap-y-2">
                    <div className="heading text-lg my-6 ">
                      Else upload your certificate
                    </div>
                    {/* =========================== FILE UPLOAD  ============================= */}
                    <div
                      className={`flex justify-center items-center w-full h-64 border-2 ${
                        isDragActive ? "border" : "border-dashed"
                      }  rounded-lg p-5
                ${
                  isDragActive ? "bg-sky-50 border-sky-400" : "border-gray-300"
                }`}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                    >
                      <label
                        htmlFor="fileInput"
                        className={`text-sm ${
                          isDragActive ? "text-sky-800" : "text-gray-400"
                        }`}
                      >
                        {isDragActive
                          ? "Leave Your File Here"
                          : selectedFile == null && (
                              <div className="flex flex-col gap-y-2">
                                <SlCloudUpload className="text-6xl text-gray-400 mx-auto" />
                                <span className="text-xl">
                                  Drag and drop or&nbsp;
                                  <span className="text-grn hover:underline cursor-pointer">
                                    Browse
                                  </span>
                                </span>
                                <span className="text-[10px] font-thin text-center text-overlay  text-gray-600">
                                  Supported formats: jpg/png/pdf
                                </span>
                              </div>
                            )}
                      </label>
                      <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={handleFileInputChange}
                      />

                      {selectedFile && (
                        <div className="mt-3">
                          <img
                            src={URL.createObjectURL(selectedFile)}
                            alt={selectedFile.name}
                            className="max-h-32 mx-auto mb-2"
                          />
                          <p className=" text-gray-700 mx-auto text-center text-xs mt-4">
                            {selectedFile.name}
                          </p>
                        </div>
                      )}
                    </div>
                    {/* ======================================================== */}
                    <button className="text-sm font-bold mt-8 w-full bg-grn text-white py-4 rounded-lg hover:bg-green-600">
                      UPLOAD
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <CanvasPage download={download} setDownload={setDownload} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
