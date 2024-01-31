import { useState } from "react";
import NavBar from "../components/NavBar";
import { FaUser } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ScaleLoader } from "react-spinners";

const UploadPage = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  return (
    <div>
      <div className="flex gap-x-8 font-int">
        <NavBar />
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
          <div className="body h-[74vh] w-[74vw] bg-dark rounded-xl px-8 flex flex-col items-center justify-center text-3xl gap-y-2">
            <span>Connect your wallet</span>
            <span className="text-xl">To upload the certificate</span>
            <ScaleLoader color="#52D858" className="mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
