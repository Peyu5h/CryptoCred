import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Text, Rect, Transformer, Image } from "react-konva";
import { LuUndo2, LuRedo2 } from "react-icons/lu";
import jsPDF from "jspdf";
import medal from "../../public/assets/medal.png";
import { Button, Drawer, Radio, Space } from "antd";
import { BiBold } from "react-icons/bi";
import { FaItalic } from "react-icons/fa";
import { MdOutlineFormatUnderlined } from "react-icons/md";
import { BsFonts } from "react-icons/bs";
import { MdOutlineFormatStrikethrough } from "react-icons/md";
import Konva from "konva";

// ========================
import template1 from "../../public/assets/template1.png";

const CanvasPage = ({ download, setDownload }) => {
  const [contentState, setContentState] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [contentHistory, setContentHistory] = useState([]);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [isDoubleClick, setIsDoubleClick] = useState(false);
  const [updateNewText, setUpdateNewText] = useState(false);

  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontWeight, setFontWeight] = useState("300");
  const [textDecoration, setTextDecoration] = useState("none");
  const [isItalic, setIsItalic] = useState(false);
  const [color, setColor] = useState("black");
  const red = "#F44336";
  const blue = "#2196F3";
  const green = "#4CAF50";
  const yellow = "#FFEB3B";
  const grey = "#9E9E9E";

  const contentLayerRef = useRef();
  const transformerRef = useRef();
  const textRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    if (download) {
      handleExportPDF();
      setDownload(false);
    }
  }, [download]);

  const backgroundImage = new window.Image();
  backgroundImage.crossOrigin = "Anonymous";
  backgroundImage.src = template1;
  // "https://plus.unsplash.com/premium_photo-1675695700239-44153e6bf430?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  useEffect(() => {
    backgroundImage.onload = () => {
      contentLayerRef.current.batchDraw();
    };
  }, []);

  useEffect(() => {
    if (selectedShape && selectedShape.getClassName() === "Text") {
      if (selectedShape instanceof Konva.Text) {
        selectedShape.setAttrs({
          fill: color,
          fontFamily: fontFamily,
          fontStyle: isItalic ? `${fontWeight} italic` : "normal",
          textDecoration: textDecoration,
        });

        contentLayerRef.current && contentLayerRef.current.batchDraw();
      }
    }
  }, [color, fontFamily, fontWeight, isItalic, selectedShape, textDecoration]);

  useEffect(() => {
    const initialImage = new window.Image();
    initialImage.crossOrigin = "Anonymous";
    initialImage.onload = () => {
      setContentState([
        ...textElements.map((textElement) => (
          <Text
            key={textElement.id}
            x={textElement.x}
            y={textElement.y}
            text={textElement.text}
            fontSize={textElement.fontSize}
            fill={textElement.color}
            fontFamily={textElement.fontFamily}
            fontStyle={`${
              textElement.isItalic
                ? `italic ${textElement.fontWeight}`
                : `${textElement.fontWeight}`
            } `}
            textDecoration={textElement.textDecoration}
            draggable
            onClick={handleShapeClick}
            onTap={handleDoubleTap}
            onDblTap={handleDoubleTap}
            editable
          />
        )),
        // <Image
        //   key={1}
        //   image={initialImage}
        //   x={300}
        //   y={100}
        //   width={150}
        //   height={250}
        //   draggable
        //   onClick={handleShapeClick}
        //   onTap={handleDoubleTap}
        // />,
      ]);
    };

    initialImage.src = medal;
    imageRef.current = initialImage;

    if (selectedShape && transformerRef.current) {
      if (
        selectedShape &&
        (selectedShape.getClassName() === "Text" ||
          selectedShape.getClassName() === "Image")
      ) {
        transformerRef.current.nodes([selectedShape]);
        transformerRef.current.getLayer().batchDraw();
      }
    }
  }, [
    selectedShape,
    color,
    fontWeight,
    setColor,
    isItalic,
    textDecoration,
    fontFamily,
    updateNewText,
  ]);

  const handleUndo = () => {
    if (contentHistory.length > 1) {
      const newHistory = [...contentHistory];
      newHistory.pop();
      setContentHistory(newHistory);
      setContentState(newHistory[newHistory.length - 1]);
    }
  };

  const handleRedo = () => {
    if (contentHistory.length < contentState.length) {
      const newHistory = [
        ...contentHistory,
        contentState[contentHistory.length],
      ];
      setContentHistory(newHistory);
      setContentState(newHistory[newHistory.length - 1]);
    }
  };

  const handleZoomChange = (e) => {
    setZoomLevel(e.target.value);
  };

  const handleStageMouseDown = (e) => {
    if (e.target === e.target.getStage()) {
      if (transformerRef.current) {
        setTimeout(() => {
          transformerRef.current.nodes([]);
          transformerRef.current.getLayer().batchDraw();
        });
      }
      setSelectedShape(null);
    }
  };

  const handleShapeClick = (e) => {
    const clickedOnBackgroundImage =
      e.target.getClassName() === "Rect" && e.target.fillPatternImage();

    if (clickedOnBackgroundImage) {
      setSelectedShape(null);
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
    } else {
      setSelectedShape(e.target);

      // Check for double-click
      const timeThreshold = 300; // Set your preferred time threshold for double-click
      const currentTime = new Date();
      const clickTimeDifference = currentTime - lastClickTime;

      if (clickTimeDifference < timeThreshold) {
        handleDoubleTap(e);
      }

      setLastClickTime(currentTime);
    }
  };

  const handleDoubleTap = (e) => {
    setIsDoubleClick(true);
    const shape = e.target;

    if (shape.getClassName() === "Text" || shape.getClassName() === "Image") {
      setSelectedShape(shape);

      if (transformerRef.current) {
        transformerRef.current.nodes([shape]);
        transformerRef.current.getLayer().batchDraw();
      }

      setOpen(true);
    }

    // Reset double-click state after a short delay
    setTimeout(() => {
      setIsDoubleClick(false);
    }, 500); // Adjust the timeout as needed
  };

  const handleExportPDF = () => {
    const stage = contentLayerRef.current.getStage();

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [stage.width(), stage.height()],
    });

    const dataURL = stage.toDataURL({ pixelRatio: 2 });

    pdf.addImage(dataURL, "JPEG", 0, 0, stage.width(), stage.height());

    pdf.save("certificate.pdf");
  };

  const handleTextChange = (e) => {
    e.preventDefault();
    if (selectedShape && selectedShape.getClassName() === "Text") {
      selectedShape.text(e.target.value);
      setContentState([...contentState]);
    }
  };

  // =======================  DRAWER ==========================
  const [open, setOpen] = useState(false);

  // ADD text
  const [textElements, setTextElements] = useState([
    {
      id: 0,
      text: "Name",
      fontFamily: "Lucida Calligraphy",
      fontWeight: "",
      textDecoration: "none",
      color: "black",
      x: 195,
      y: 145,
      fontSize: 32,
    },
    {
      id: 1,
      text: "Surname",
      fontFamily: "Lucida Calligraphy",
      fontWeight: "",
      textDecoration: "none",
      color: "black",
      x: 330,
      y: 145,
      fontSize: 32,
    },
    {
      id: 2,
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ",
      fontFamily: "Arial",
      fontWeight: "",
      textDecoration: "none",
      color: "black",
      x: 145,
      y: 212,
      fontSize: 16,
      width: 200,
      wrap: "char",
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit.",
      fontFamily: "Arial",
      fontWeight: "",
      textDecoration: "none",
      color: "black",
      x: 260,
      y: 240,
      fontSize: 16,
      width: 200,
      wrap: "char",
    },
    {
      id: 4,
      text: "DATE",
      fontFamily: "Arial",
      fontWeight: "400",
      textDecoration: "none",
      color: "black",
      x: 170,
      y: 320,
      fontSize: 16,
      width: 200,
      wrap: "char",
    },
    {
      id: 4,
      text: "SIGN",
      fontFamily: "Arial",
      fontWeight: "400",
      textDecoration: "none",
      color: "black",
      x: 424,
      y: 320,
      fontSize: 16,
      width: 200,
      wrap: "char",
    },
  ]);

  const handleAddText = () => {
    const newTextElement = {
      id: textElements.length,
      text: "New Text",
      fontFamily: "Arial",
      fontWeight: "",
      textDecoration: "none",
      color: "black",
      x: 20 * (textElements.length + 1),
      y: 20 * (textElements.length + 1),
      fontSize: 20,
    };
    setTextElements([...textElements, newTextElement]);
    setUpdateNewText(true);
  };

  const removeAllStyles = () => {
    setFontWeight("300");
    setTextDecoration("none");
    setColor("black");
    setIsItalic(false);
  };

  return (
    <div className="relative body h-[74vh] w-[74vw] bg-dark rounded-xl px-8 flex gap-x-2  text-3xl gap-y-2 scrollbar items-center justify-center">
      <Stage
        width={678}
        height={396}
        ref={contentLayerRef}
        onMouseDown={handleStageMouseDown}
      >
        <Layer>
          <Rect
            width={678}
            height={408}
            fillPatternImage={backgroundImage}
            fillPatternScale={{
              x: 678 / backgroundImage.width,
              y: 396 / backgroundImage.height,
            }}
            fillPatternRepeat="no-repeat"
            shadowBlur={0}
            onClick={handleShapeClick}
            onTap={handleDoubleTap}
          />
        </Layer>
        <Layer scaleX={zoomLevel} scaleY={zoomLevel}>
          {contentState.map((shape, index) => (
            <React.Fragment key={index}>
              {React.cloneElement(shape, {
                ref: textRef,
                onDblTap: handleDoubleTap,
                onTap: handleDoubleTap,
                onClick: handleShapeClick,
              })}
            </React.Fragment>
          ))}
          {selectedShape && (
            <Transformer
              ref={transformerRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
              draggable
            />
          )}
        </Layer>
      </Stage>

      <div className="zommAndUndo text-light bg-overlayLight/40 w-[28%] h-[6%] absolute bottom-0 right-0 mr-12 mb-6 rounded-full flex items-center">
        <div className="undoRedo flex text-xl gap-x-6 ml-4">
          <LuUndo2
            className="cursor-pointer rounded-full hover:bg-gray-500/15 p-1 text-[27px]"
            // onClick={handleUndo}
          />
          <LuRedo2
            className="cursor-pointer rounded-full hover:bg-gray-500/15 p-1 text-[27px]"
            // onClick={handleRedo}
          />
        </div>
        <div className="splitter mx-4 h-[75%] w-[0.5px] bg-gray-600"></div>
        <div className="zoomSlider mx-auto flex text-xs gap-x-2">
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.01"
            value={zoomLevel}
            onChange={handleZoomChange}
            className="cursor-pointer"
          />
          <div className="percent mr-4 cursor-default">{`${Math.round(
            zoomLevel * 100
          )}%`}</div>
        </div>
      </div>
      <div className="btn text-xs flex flex-col gap-y-8">
        {/* <button onClick={handleExportPDF}>Export as PDF</button> */}
        {/* <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button> */}
        <div className="btn text-xs flex flex-col gap-y-8">
          {selectedShape && selectedShape.getClassName() === "Text" && (
            <>
              <Drawer
                title="Edit Text"
                placement="right"
                closable={false}
                onClose={() => setOpen(false)}
                visible={open}
                width={275}
                style={{ backgroundColor: "#F9FCFB" }}
              >
                <button
                  onClick={handleAddText}
                  className="mb-4 bg-dark text-white text-center w-full py-3 rounded-lg"
                >
                  Add Text
                </button>
                <input
                  type="text"
                  placeholder="First Name"
                  value={selectedShape.text()}
                  onChange={handleTextChange}
                  className="border w-full px-3 py-4 rounded-lg outline-none text-dark"
                />
                <div className="fontWeight text-[14px]   font-medium flex gap-x-4 my-4 mt-6 items-center justify-between ">
                  <h1 className="text-xs ">Font:</h1>
                  <select
                    id="font"
                    className="border w-[70%] rounded-lg px-2 py-3 outline-none  "
                    name="font"
                    onChange={(e) => setFontFamily(e.target.value)}
                  >
                    <option value="arial">Arial</option>
                    <option value="poppins">Poppins</option>
                    <option value="inter">Inter</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Calibri">Calibri</option>
                    <option value="Lucida Calligraphy">Calligraphy</option>
                    <option value="oswald">oswald</option>
                    <option value="Times New Roman">Times New Roman</option>
                  </select>
                </div>
                <div className="fontWeight text-[14px]   font-medium flex gap-x-4 my-4 items-center justify-between">
                  <h1 className="text-xs "> Weight:</h1>
                  <select
                    id="cars"
                    className="border w-[70%] rounded-lg px-2 py-3 outline-none "
                    name="cars"
                    onChange={(e) => setFontWeight(e.target.value)}
                  >
                    <option value="400">Regular</option>
                    <option value="500">Medium</option>
                    <option value="200">Light</option>
                    <option value="600">Bold</option>
                    <option value="100">ExtraLight</option>
                    <option value="800">Extra Bold</option>
                  </select>
                </div>

                <div className="decoration flex  justify-around text-lg my-8 border w-full py-3 rounded-lg">
                  <button
                    onClick={() => setIsItalic(!isItalic)}
                    className="italic px-4 py-2 hover:bg-blue-gray-50 rounded-md"
                  >
                    <FaItalic />
                  </button>
                  <button
                    onClick={() => setTextDecoration("underline")}
                    className=" px-4 py-2 hover:bg-blue-gray-50 rounded-md"
                  >
                    <MdOutlineFormatUnderlined />
                  </button>
                  <button
                    onClick={() => setTextDecoration("line-through")}
                    className=" px-4 py-2 hover:bg-blue-gray-50 rounded-md"
                  >
                    <MdOutlineFormatStrikethrough />
                  </button>
                </div>

                <div className="colors">
                  <div className="basicColors">
                    <div className="flex gap-x-4">
                      <div
                        onClick={() => setColor(red)}
                        className="colorBox bg-red-500 rounded-lg cursor-pointer h-8 w-8"
                      ></div>
                      <div
                        onClick={() => setColor(blue)}
                        className="colorBox bg-blue-500 rounded-lg cursor-pointer h-8 w-8"
                      ></div>
                      <div
                        onClick={() => setColor(green)}
                        className="colorBox bg-green-500 rounded-lg cursor-pointer h-8 w-8"
                      ></div>
                      <div
                        onClick={() => setColor(yellow)}
                        className="colorBox bg-yellow-500 rounded-lg cursor-pointer h-8 w-8"
                      ></div>
                      <div
                        onClick={() => setColor(grey)}
                        className="colorBox bg-gray-500 rounded-lg cursor-pointer h-8 w-8"
                      ></div>
                    </div>
                    <button
                      onClick={removeAllStyles}
                      className="text-md hover:bg-red-600 duration-300 bg-gray-400 text-white text-center w-full py-3 rounded-lg my-6"
                    >
                      Remove all Styles
                    </button>
                  </div>
                </div>
              </Drawer>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CanvasPage;
