import { GoHomeFill } from "react-icons/go";
import { FiUpload } from "react-icons/fi";
import { GrDocumentVerified } from "react-icons/gr";
import { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { NavLink, useLocation } from "react-router-dom";
import { RxText } from "react-icons/rx";
import { IoIosDocument } from "react-icons/io";
import { MdDraw } from "react-icons/md";
import TextDrawer from "./Drawer/TextDrawer";
import LogoDrawer from "./Drawer/LogoDrawer";

const NavBar = ({ templateSelected }) => {
  const [active, setActive] = useState("");
  const location = useLocation();
  console.log(templateSelected);

  useEffect(() => {
    const path = location.pathname;
    setActive(path === "/" ? "home" : path.substring(1));
  }, [location.pathname]);

  // canvas active:
  const [canvasActive, setCanvasActive] = useState();

  const [openText, setOpenText] = useState(false);
  const [openLogo, setOpenLogo] = useState(false);

  const handleTextDrawer = () => {
    setCanvasActive("text");
    setOpenText(true);
  };

  const handleLogoDrawer = () => {
    setCanvasActive("logo");
    setOpenLogo(true);
  };
  return (
    <div>
      <div className="nav h-[88vh] w-[18vw] bg-dark rounded-xl px-8 py-5">
        <div className="logo p-2 bg-grn rounded-full text-black text-center font-int font-bold">
          LOGO
        </div>

        <div className="splitter h-[0.5px] bg-overlay w-full my-8"></div>

        <div className="options flex flex-col gap-y-2 text-md uppercase font-hind">
          <NavLink to="/">
            <div
              className={` flex justify-between items-center rounded-full px-6 cursor-pointer ${
                active === "home" ? "bg-activeNav text-grn" : ""
              }`}
            >
              <div className="div flex items-center gap-x-2 pt-4 pb-3 rounded-full">
                <GoHomeFill className="mb-1" />
                <div className="option">Home</div>
              </div>
              {active === "home" ? <FaAngleRight className="text-light" /> : ""}
            </div>
          </NavLink>

          <NavLink to="/upload">
            <div
              className={` flex justify-between items-center rounded-full px-6 cursor-pointer ${
                active === "upload" ? "bg-activeNav text-grn" : ""
              }`}
            >
              <div className="div flex items-center gap-x-2 pt-4 pb-3 rounded-full">
                <FiUpload className="mb-1" />
                <div className="option">Upload</div>
              </div>
              {active === "upload" ? (
                <FaAngleRight className="text-light" />
              ) : (
                ""
              )}
            </div>
          </NavLink>

          <NavLink to="/verify">
            <div
              className={`flex justify-between items-center rounded-full px-6 cursor-pointer  ${
                active === "verify" ? "bg-activeNav text-grn" : ""
              }`}
            >
              <div className="div flex items-center gap-x-2 pt-4 pb-3 rounded-full">
                <GrDocumentVerified className="mb-1" />
                <div className="option">Verify</div>
              </div>
              {active === "verify" ? (
                <FaAngleRight className="text-light" />
              ) : (
                ""
              )}
            </div>
          </NavLink>
        </div>

        {/* =======================  Canvas navs ========================== */}

        {templateSelected ? (
          <>
            <div className="splitter h-[0.5px] bg-overlay w-full my-8"></div>
            <div className="options flex flex-col gap-y-2 text-md uppercase font-hind">
              <div
                onClick={handleTextDrawer}
                className={` flex justify-between items-center rounded-full px-6 cursor-pointer ${
                  canvasActive === "text" ? "bg-activeNav text-grn" : ""
                }`}
              >
                <div className="div flex items-center gap-x-2 pt-4 pb-3 rounded-full">
                  {/* RxText component or icon */}
                  <RxText className="mb-1" />
                  <div className="option">Text</div>
                </div>
                {canvasActive === "text" ? (
                  <FaAngleRight className="text-light" />
                ) : (
                  ""
                )}
              </div>
              {openText && (
                <TextDrawer openText={openText} setOpenText={setOpenText} />
              )}

              <div
                onClick={handleLogoDrawer}
                className={` flex justify-between items-center rounded-full px-6 cursor-pointer ${
                  canvasActive === "logo" ? "bg-activeNav text-grn" : ""
                }`}
              >
                <div className="div flex items-center gap-x-2 pt-4 pb-3 rounded-full">
                  <IoIosDocument className="mb-1" />
                  <div className="option">Logo</div>
                </div>
                {canvasActive === "logo" ? (
                  <FaAngleRight className="text-light" />
                ) : (
                  ""
                )}
              </div>
              {openLogo && (
                <LogoDrawer openLogo={openLogo} setOpenLogo={setOpenLogo} />
              )}

              <div
                onClick={() => setCanvasActive("draw")}
                className={`flex justify-between items-center rounded-full px-6 cursor-pointer  ${
                  canvasActive === "draw" ? "bg-activeNav text-grn" : ""
                }`}
              >
                <div className="div flex items-center gap-x-2 pt-4 pb-3 rounded-full">
                  <MdDraw className="mb-1" />
                  <div className="option">Draw</div>
                </div>
                {canvasActive === "draw" ? (
                  <FaAngleRight className="text-light" />
                ) : (
                  ""
                )}
              </div>

              <div
                onClick={() => setCanvasActive("browse")}
                className={` flex justify-between items-center rounded-full px-6 cursor-pointer ${
                  canvasActive === "browse" ? "bg-activeNav text-grn" : ""
                }`}
              >
                <div className="div flex items-center gap-x-2 pt-4 pb-3 rounded-full">
                  <FiUpload className="mb-1" />
                  <div className="option">Browse</div>
                </div>
                {canvasActive === "browse" ? (
                  <FaAngleRight className="text-light" />
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;
