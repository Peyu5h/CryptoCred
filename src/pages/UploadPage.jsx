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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [templateSelected, setTemplateSelected] = useState(false);

  const handleUpload = (files) => {
    try {
      setIsUploading(true);
      setUploadedFiles(uploadedFiles.concat(files));
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragEnter = () => {
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    handleUpload(files);
  };

  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  return (
    <div>
      <div className="flex gap-x-8 font-int">
        <NavBar templateSelected={templateSelected} />
        <div className="right flex flex-col justify-between">
          <div className="upperNav flex items-center justify-end h-[10vh] w-[74vw] bg-dark rounded-xl px-8">
            {isWalletConnected ? (
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
                      0x123abcdefghijk
                    </div>
                  </div>
                  <div
                    className="dropdown cursor-pointer mx-4 text-xl"
                    onClick={() => setDropDown(!dropDown)}
                  >
                    {dropDown == false ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </div>
                  {dropDown && (
                    <div className="dropdown absolute w-full bg-overlay rounded-b-xl top-12 ">
                      <div className="items mt-3">
                        <div className="splitter h-[0.5px] w-full bg-overlayLight"></div>
                        <div className="changeWallet px-3 py-3 hover:bg-grn hover:text-dark cursor-pointer duration-300 ">
                          Change account
                        </div>
                        <div className="splitter h-[0.5px] w-full bg-overlayLight"></div>
                        <div
                          onClick={() => setIsWalletConnected(false)}
                          className="Logout px-3 py-3  hover:bg-grn hover:text-dark cursor-pointer rounded-b-xl duration-300"
                        >
                          Logout
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div onClick={() => setIsWalletConnected(true)} className="">
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
                      className={`flex justify-center items-center w-full h-64 border-2 border-dashed rounded-lg p-5
                    ${
                      isDragActive
                        ? "bg-sky-50 border-sky-400"
                        : "border-gray-300"
                    }`}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                    >
                      <p
                        className={`text-sm ${
                          isDragActive ? "text-sky-800" : "text-gray-400"
                        }  `}
                      >
                        {isDragActive ? (
                          "Leave Your File Here"
                        ) : (
                          <div className="flex flex-col gap-y-2">
                            <SlCloudUpload className="text-6xl text-gray-400 mx-auto" />
                            <span className="text-xl">
                              Drag and drop or&nbsp;
                              <span className="text-grn hover:underline cursor-pointer">
                                Browse
                              </span>
                            </span>
                            <span className="text-[10px] font-thin text-center text-overlay  text-gray-600">
                              Supported format: jpg/png/pdf
                            </span>
                          </div>
                        )}
                      </p>
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
            <CanvasPage />
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
