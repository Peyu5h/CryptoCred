import { GoHomeFill } from "react-icons/go";
import { FiUpload } from "react-icons/fi";
import { GrDocumentVerified } from "react-icons/gr";
import { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const [active, setActive] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    setActive(path === "/" ? "home" : path.substring(1));
  }, [location.pathname]);

  return (
    <div>
      <div className="nav h-[88vh] w-[18vw] bg-dark rounded-xl px-8 py-5">
        <div className="logo p-2 bg-grn rounded-full text-black text-center font-int *:font-bold">
          LOGO
        </div>
        <div className="splitter h-[0.5px] bg-overlay w-full my-8"></div>

        <div className="options flex flex-col gap-y-2 text-lg uppercase">
          <NavLink to="/" onClick={() => setActive("home")}>
            <div
              className={` flex justify-between items-center rounded-full px-6  cursor-pointer ${
                active === "home" ? "bg-activeNav " : ""
              }`}
            >
              <div className="div flex items-center gap-x-2  pt-4 pb-3 rounded-full ">
                <GoHomeFill className="mb-1" />
                <div className="option">Home</div>
              </div>
              {active === "home" ? <FaAngleRight /> : ""}
            </div>
          </NavLink>

          <NavLink to="/upload" onClick={() => setActive("upload")}>
            <div
              className={` flex justify-between items-center rounded-full px-6  cursor-pointer ${
                active === "upload" ? "bg-activeNav " : ""
              }`}
            >
              <div className="div flex items-center gap-x-2  pt-4 pb-3 rounded-full">
                <FiUpload className="mb-1" />
                <div className="option">Upload</div>
              </div>
              {active === "upload" ? <FaAngleRight /> : ""}
            </div>
          </NavLink>

          <NavLink to="/verify" onClick={() => setActive("verify")}>
            <div
              className={`flex justify-between items-center rounded-full px-6  cursor-pointer  ${
                active === "verify" ? "bg-activeNav " : ""
              }`}
            >
              <div className="div flex items-center gap-x-2  pt-4 pb-3 rounded-full">
                <GrDocumentVerified className="mb-1" />
                <div className="option">Verify</div>
              </div>
              {active === "verify" ? <FaAngleRight /> : ""}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
