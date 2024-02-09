import { GoHomeFill } from "react-icons/go";
import { FiUpload } from "react-icons/fi";
import { GrDocumentVerified } from "react-icons/gr";
import { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { NavLink, useLocation } from "react-router-dom";
import { RxText } from "react-icons/rx";
import { IoIosDocument } from "react-icons/io";
import { MdDraw } from "react-icons/md";
import LogoDrawer from "./Drawer/LogoDrawer";

import { useAtom } from "jotai";
import {
  CanvasNav,
  textAtom,
  logoAtom,
  drawAtom,
  browseAtom,
} from "../Atom/atom";

const NavBar = ({ templateSelected }) => {
  const [canvasNavState, setCanvasNavState] = useAtom(CanvasNav);
  const [text, setText] = useAtom(textAtom);
  const [logo, setLogo] = useAtom(logoAtom);
  const [draw, setDraw] = useAtom(drawAtom);
  const [browse, setBrowse] = useAtom(browseAtom);

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
    setText(true);
    setLogo(false);
    setDraw(false);
    setBrowse(false);
  };

  const handleLogoDrawer = () => {
    setCanvasActive("logo");
    setLogo(true);
    setText(false);
    setDraw(false);
    setBrowse(false);
  };

  const handleDraw = () => {
    setCanvasActive("draw");
    setDraw(true);
    setText(false);
    setLogo(false);
    setBrowse(false);
  };

  const handleBrowse = () => {
    setCanvasActive("browse");
    setBrowse(true);
    setText(false);
    setLogo(false);
    setDraw(false);
  };
  return (
    <div>
      <div className="nav h-[88vh] w-[18vw] bg-dark rounded-xl px-8 py-5 z-99">
        <div className="logo p-2  rounded-full text-grn text-center text-2xl font-black uppercase font-oswald ">
          CryptoCred
        </div>

        <div className="splitter h-[0.5px] bg-overlay w-full mb-8 mt-6"></div>

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
                  canvasActive === "text" || text == true
                    ? "bg-activeNav text-grn"
                    : ""
                }`}
              >
                <div className="div flex items-center gap-x-2 pt-4 pb-3 rounded-full">
                  {/* RxText component or icon */}
                  <RxText className="mb-1" />
                  <div className="option">Text</div>
                </div>
                {canvasActive === "text" || text == true ? (
                  <FaAngleRight className="text-light" />
                ) : (
                  ""
                )}
              </div>

              <div
                onClick={handleLogoDrawer}
                className={` flex justify-between items-center rounded-full px-6 cursor-pointer ${
                  canvasActive === "logo" || logo == true
                    ? "bg-activeNav text-grn"
                    : ""
                }`}
              >
                <div className="div flex items-center gap-x-2 pt-4 pb-3 rounded-full">
                  <IoIosDocument className="mb-1" />
                  <div className="option">Logo</div>
                </div>
                {canvasActive === "logo" || logo == true ? (
                  <FaAngleRight className="text-light" />
                ) : (
                  ""
                )}
              </div>
              {openLogo && (
                <LogoDrawer openLogo={openLogo} setOpenLogo={setOpenLogo} />
              )}

              <div
                onClick={handleDraw}
                className={`flex justify-between items-center rounded-full px-6 cursor-pointer  ${
                  canvasActive === "draw" || draw == true
                    ? "bg-activeNav text-grn"
                    : ""
                }`}
              >
                <div className="div flex items-center gap-x-2 pt-4 pb-3 rounded-full">
                  <MdDraw className="mb-1" />
                  <div className="option">Draw</div>
                </div>
                {canvasActive === "draw" || draw == true ? (
                  <FaAngleRight className="text-light" />
                ) : (
                  ""
                )}
              </div>

              <div
                onClick={handleBrowse}
                className={` flex justify-between items-center rounded-full px-6 cursor-pointer ${
                  canvasActive === "browse" || browse == true
                    ? "bg-activeNav text-grn"
                    : ""
                }`}
              >
                <div className="div flex items-center gap-x-2 pt-4 pb-3 rounded-full">
                  <FiUpload className="mb-1" />
                  <div className="option">Browse</div>
                </div>
                {canvasActive === "browse" || browse == true ? (
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
