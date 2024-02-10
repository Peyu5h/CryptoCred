import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";

import template from "../../../public/assets/template2.png";
import { useAtom } from "jotai";
import { logoItems } from "../../Atom/atom";

const LogoDrawer = ({ openLogo, setOpenLogo }) => {
  const [localOpenText, setLocalOpenText] = useState(openLogo);
  const [items, setItems] = useAtom(logoItems);

  useEffect(() => {
    setLocalOpenText(openLogo);
  }, [openLogo]);

  const handleClose = () => {
    setLocalOpenText(false);

    setTimeout(() => {
      setOpenLogo(false);
    }, 300);
  };

  const handleLogoUpload = (url) => () => {
    setItems([...items, url]);
    handleClose();
  };

  return (
    <div className="scrollbar">
      <Drawer
        className="overflow-scroll "
        placement="right"
        open={localOpenText}
        onClose={handleClose}
      >
        <div className="flex items-center justify-between px-4 pb-2">
          <Typography variant="h5" color="blue-gray">
            Select element
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="px-3 flex flex-col gap-y-4 mx-auto">
          <img
            onClick={handleLogoUpload(
              "https://w7.pngwing.com/pngs/96/271/png-transparent-online-chat-computer-icons-internet-business-unlimited-communication-online-chat-business-internet-thumbnail.png"
            )}
            className="rounded-md cursor-pointer"
            src="https://w7.pngwing.com/pngs/96/271/png-transparent-online-chat-computer-icons-internet-business-unlimited-communication-online-chat-business-internet-thumbnail.png"
            alt=""
          />
          <img
            onClick={handleLogoUpload(template)}
            className="rounded-md cursor-pointer"
            src={template}
            alt=""
          />
          <img
            onClick={handleLogoUpload(
              "https://plus.unsplash.com/premium_photo-1661876402729-09f3b7e87640?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            )}
            className="rounded-md cursor-pointer"
            src="https://plus.unsplash.com/premium_photo-1661876402729-09f3b7e87640?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <img
            onClick={handleLogoUpload(template)}
            className="rounded-md cursor-pointer"
            src={template}
            alt=""
          />
        </div>
      </Drawer>
    </div>
  );
};

export default LogoDrawer;
