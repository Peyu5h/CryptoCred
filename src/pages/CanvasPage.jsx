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

const CanvasPage = ({ download, setDownload }) => {
  const [contentState, setContentState] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [contentHistory, setContentHistory] = useState([]);

  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontWeight, setFontWeight] = useState("");
  const [textDecoration, setTextDecoration] = useState("none");
  const [color, setColor] = useState("black");

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
  backgroundImage.src =
    "https://plus.unsplash.com/premium_photo-1675695700239-44153e6bf430?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  useEffect(() => {
    backgroundImage.onload = () => {
      contentLayerRef.current.batchDraw();
    };
  }, []);

  useEffect(() => {
    if (selectedShape && selectedShape.getClassName() === "Text") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [selectedShape]);

  useEffect(() => {
    const initialImage = new window.Image();
    initialImage.crossOrigin = "Anonymous";
    initialImage.onload = () => {
      setContentState([
        <Text
          key={0}
          x={10}
          y={10}
          text="Hello"
          fontSize={20}
          fill={color}
          fontFamily="inter"
          fontStyle={fontWeight}
          textDecoration="underline"
          draggable
          onClick={handleShapeClick}
          onTap={handleDoubleTap}
          onDblTap={handleDoubleTap}
          editable
        />,
        <Image
          key={1}
          image={initialImage}
          x={300}
          y={100}
          width={150}
          height={250}
          draggable
          onClick={handleShapeClick}
          onTap={handleDoubleTap}
        />,
        <Image
          key={1}
          image={initialImage}
          x={300}
          y={100}
          width={150}
          height={250}
          draggable
          onClick={handleShapeClick}
          onTap={handleDoubleTap}
        />,
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
  }, [selectedShape, color, fontWeight]);

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
    }
  };
  const handleDoubleTap = (e) => {
    const shape = e.target;

    if (shape.getClassName() === "Text" || shape.getClassName() === "Image") {
      setSelectedShape(shape);

      if (transformerRef.current) {
        transformerRef.current.nodes([shape]);
        transformerRef.current.getLayer().batchDraw();
      }
    }
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
      text: "Hello",
      fontFamily: "Arial",
      fontWeight: "",
      textDecoration: "none",
      color: "black",
      x: 10,
      y: 10,
      fontSize: 20,
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
                <button className="mb-4 bg-dark text-white text-center w-full py-3 rounded-lg">
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
                    id="cars"
                    className="border w-[70%] rounded-lg px-2 py-3 outline-none  "
                    name="cars"
                  >
                    <option value="volvo">Arial</option>
                    <option value="saab">Poppins</option>
                    <option value="fiat">Inter</option>
                    <option value="audi">Serif</option>
                  </select>
                </div>
                <div className="fontWeight text-[14px]   font-medium flex gap-x-4 my-4 items-center justify-between">
                  <h1 className="text-xs "> Weight:</h1>
                  <select
                    id="cars"
                    className="border w-[70%] rounded-lg px-2 py-3 outline-none "
                    name="cars"
                  >
                    <option value="volvo">Regular</option>
                    <option onSelect={() => setFontWeight("bold")} value="saab">
                      Bold
                    </option>
                    <option value="fiat">Light</option>
                    <option value="audi">Medium</option>
                  </select>
                </div>

                <div className="decoration flex  justify-around text-lg my-8 border w-full py-3 rounded-lg">
                  <button className="italic px-4 py-2 hover:bg-blue-gray-50 rounded-md">
                    <FaItalic />
                  </button>
                  <button className=" px-4 py-2 hover:bg-blue-gray-50 rounded-md">
                    <MdOutlineFormatUnderlined />
                  </button>
                  <button className=" px-4 py-2 hover:bg-blue-gray-50 rounded-md">
                    <MdOutlineFormatStrikethrough />
                  </button>
                </div>

                <div className="colors">
                  <div className="basicColors">
                    <div className="flex gap-x-4">
                      <div
                        onChange={() => setColor("blue")}
                        className="colorBox bg-red-500 rounded-lg cursor-pointer h-8 w-8"
                      ></div>
                      <div className="colorBox bg-blue-500 rounded-lg cursor-pointer h-8 w-8"></div>
                      <div className="colorBox bg-green-500 rounded-lg cursor-pointer h-8 w-8"></div>
                      <div className="colorBox bg-yellow-500 rounded-lg cursor-pointer h-8 w-8"></div>
                      <div className="colorBox bg-gray-500 rounded-lg cursor-pointer h-8 w-8"></div>
                    </div>
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
