import { useState } from "react";
import NavBar from "../components/NavBar";
import { SlCloudUpload } from "react-icons/sl";
import { MoonLoader, RingLoader, ScaleLoader } from "react-spinners";

const VerifyPage = () => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isVerified, setIsVerified] = useState(true);

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
  return (
    <div>
      <div className="flex gap-x-8">
        <NavBar templateSelected={false} />
        <div className="right flex justify-between gap-x-[2vw]">
          <div className="body h-[88vh] w-[30vw] bg-dark rounded-xl p-8">
            <div className="title text-xl font-medium mb-12 mt-4 text-center">
              Upload your certificate to verify
            </div>
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
            <button
              onClick={() => setIsVerified(false)}
              className="text-sm font-bold mt-8 w-full bg-grn text-white py-4 rounded-lg hover:bg-green-600"
            >
              Verify
            </button>
          </div>

          {/* ================================================================= */}

          <div className="body h-[88vh] w-[42vw] bg-dark rounded-xl px-8">
            {selectedFile == null && (
              <div className="notConnected flex flex-col w-full h-[88vh] items-center justify-center ">
                <span className="text-3xl">Upload Required to Proceed</span>
                <RingLoader color="#52D858" className="mt-6" />
              </div>
            )}

            {/* ===== loader ====== */}
            {/* <div className="loading flex items-center justify-center h-full">
              <MoonLoader color="#52D858" className=" " />
            </div> */}
            {/* ================== */}
            {selectedFile && (
              <div className="mainScreen">
                <div className="heading text-3xl font-semibold py-8 ">
                  Verification Status
                </div>

                {/* ======================== Valid certificate =========================== */}
                {isVerified ? (
                  <div className="status flex  flex-col">
                    <div className="text text-2xl font-semibold mt-8 mx-auto">
                      Certificate validation{" "}
                      <span className="text-grn">successful</span>
                    </div>
                    <img
                      className="mt-4 w-[75%] mx-auto"
                      src="https://www.slideegg.com/image/catalog/477793-certificate%20of%20training%20template%20ppt.png"
                      alt=""
                    />
                    <div className="userDetails text-xl my-12 mx-4 flex flex-col gap-y-4">
                      <div className="name">
                        Name:{" "}
                        <span className="text-lg font-normal ">
                          FirstName LastName
                        </span>
                      </div>
                      <div className="name">
                        Details:&nbsp;
                        <span className="text-lg font-normal ">
                          Atharva College of Engineering
                        </span>
                      </div>
                      <div className="name">
                        more:&nbsp;
                        <span className="text-lg font-normal ">
                          ....................................
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ======================== Invalid certificate =========================== */
                  <div className="unVerified">
                    <div className="text text-2xl font-semibold mt-8 text-center">
                      Certificate validation{" "}
                      <span className="text-red-500 text-center">failed</span>
                    </div>
                    <img
                      className="mt-8 w-[75%] mx-auto rounded-md"
                      src="https://odishabytes.com/wp-content/uploads/2022/06/Odisha-Fake-Certificate.jpeg"
                      alt=""
                    />
                    <div className="userDetails text-xl my-12 mx-4 flex flex-col gap-y-4">
                      <div className="status mx-auto">
                        The certificate seems to be unverified or edited
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
