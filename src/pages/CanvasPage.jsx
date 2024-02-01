import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Text, Rect, Transformer } from "react-konva";
import { LuUndo2, LuRedo2 } from "react-icons/lu";
import jsPDF from "jspdf";

const CanvasPage = () => {
  const [contentState, setContentState] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const contentLayerRef = useRef();
  const transformerRef = useRef();

  useEffect(() => {
    const initialContentState = [
      <Text
        key={0}
        x={10}
        y={10}
        text="Hello"
        fontSize={20}
        fill="black"
        draggable
        onClick={handleShapeClick}
        onTap={handleShapeClick}
      />,
      <Image
        key={1}
        image={imageObj}
        x={100}
        y={100}
        width={200}
        height={150}
        draggable
        onClick={handleShapeClick}
        onTap={handleShapeClick}
      />,
    ];
    setContentState(initialContentState);

    if (selectedShape) {
      if (
        selectedShape.getClassName() === "Text" ||
        selectedShape.getClassName() === "Image"
      ) {
        transformerRef.current.nodes([selectedShape]);
        transformerRef.current.getLayer().batchDraw();
      }
    } else {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedShape]);

  const imageObj = new window.Image();
  imageObj.crossOrigin = "Anonymous";
  imageObj.src =
    "https://images.pexels.com/photos/20080174/pexels-photo-20080174/free-photo-of-a-hedgehog-is-held-in-a-person-s-hand.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  const handleUndo = () => {};

  const handleRedo = () => {};

  const handleZoomChange = (e) => {
    setZoomLevel(e.target.value);
  };

  const handleStageMouseDown = (e) => {
    if (e.target === e.target.getStage()) {
      setSelectedShape(null);
    }
  };

  const handleShapeClick = (e) => {
    setSelectedShape(e.target);
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

  const handleExportPNG = async () => {
    const stage = contentLayerRef.current.getStage();
    const pngDataURL = await downloadImage(imageObj.src);
    stage.toDataURL({
      pixelRatio: 2,
      callback: (dataURL) => {
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "certificate.png";
        link.click();
      },
    });
  };

  const downloadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = "Anonymous";

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };

      img.onerror = reject;
      img.src = url;
    });
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
            fill="white"
            shadowBlur={0}
            onClick={handleShapeClick}
            onTap={handleShapeClick}
          />
        </Layer>
        <Layer scaleX={zoomLevel} scaleY={zoomLevel}>
          {contentState.map((shape, index) => (
            <React.Fragment key={index}>{shape}</React.Fragment>
          ))}
          {selectedShape && (
            <Transformer
              ref={transformerRef}
              boundBoxFunc={(oldBox, newBox) => {
                // Limit resizing to not go below 5x5 pixels
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          )}
        </Layer>
      </Stage>

      <div className="zommAndUndo text-light bg-overlayLight/40 w-[28%] h-[6%] absolute bottom-0 right-0 mr-12 mb-6 rounded-full flex items-center">
        <div className="undoRedo flex text-xl gap-x-6 ml-4">
          <LuUndo2
            className="cursor-pointer rounded-full hover:bg-gray-500/15 p-1 text-[27px]"
            onClick={handleUndo}
          />
          <LuRedo2
            className="cursor-pointer rounded-full hover:bg-gray-500/15 p-1 text-[27px]"
            onClick={handleRedo}
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
        <button onClick={handleExportPDF}>Export as PDF</button>
        <button onClick={handleExportPNG}>Export as PNG</button>
      </div>
    </div>
  );
};

export default CanvasPage;
