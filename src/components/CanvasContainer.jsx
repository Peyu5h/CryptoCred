import React, { useState } from "react";
import CanvasPage from "../pages/CanvasPage";
import TextDrawer from "./Drawer/TextDrawer";

const CanvasContainer = () => {
  const [selectedShape, setSelectedShape] = useState(null);
  const [inputText, setInputText] = useState("");
  const [openTextDrawer, setOpenTextDrawer] = useState(false);

  const handleTextChange = (e) => {
    if (selectedShape && selectedShape.getClassName() === "Text") {
      selectedShape.text(e.target.value);
      setInputText(e.target.value);
    }
  };

  const handleTextDrawer = () => {
    setInputText("Text");
    setOpenTextDrawer(!openTextDrawer);
  };

  return (
    <div>
      <CanvasPage
        selectedShape={selectedShape}
        setSelectedShape={setSelectedShape}
        inputText={inputText}
        setInputText={setInputText}
        onTextChange={handleTextChange}
        handleTextDrawer={handleTextDrawer}
      />
      <TextDrawer
        openText={openTextDrawer}
        setOpenText={setOpenTextDrawer}
        inputText={inputText}
        setInputText={setInputText}
      />
    </div>
  );
};

export default CanvasContainer;
