import { createContext, useContext, useState } from "react";

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
  const [selectedText, setSelectedText] = useState("");

  return (
    <CanvasContext.Provider value={{ selectedText, setSelectedText }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasContext = () => useContext(CanvasContext);
