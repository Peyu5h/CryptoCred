import { LuUndo2 } from "react-icons/lu";
import { LuRedo2 } from "react-icons/lu";

const CanvasPage = () => {
  return (
    <div
      style={{ zIndex: 1 }}
      className="relative body h-[74vh] w-[74vw] bg-dark rounded-xl px-8 flex gap-x-2  text-3xl gap-y-2 scrollbar items-center justify-center"
    >
      <div className="text-dark text-lg bg-white w-[678px] h-[408px] rounded-sm"></div>

      {/* ============================== */}
      <div className="zommAndUndo text-light bg-overlayLight/40 w-[28%] h-[6%] absolute bottom-0 right-0 mr-12 mb-6 rounded-full flex items-center">
        <div className="undoRedo flex text-xl gap-x-6 ml-4">
          <LuUndo2 className="cursor-pointer rounded-full hover:bg-gray-500/15 p-1 text-[27px]" />
          <LuRedo2 className="cursor-pointer rounded-full hover:bg-gray-500/15 p-1 text-[27px]" />
        </div>
        <div className="splitter mx-4 h-[75%] w-[0.5px] bg-gray-600"></div>
        <div className="zoomSlider mx-auto flex text-xs gap-x-2">
          <input type="range" className="cursor-pointer" />
          <div className="percent mr-4 cursor-default">80%</div>
        </div>
      </div>
    </div>
  );
};

export default CanvasPage;
