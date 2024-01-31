import NavBar from "../components/NavBar";

const VerifyPage = () => {
  return (
    <div>
      <div className="flex gap-x-8">
        <NavBar />
        <div className="right flex flex-col justify-between">
          <div className="body h-[10vh] w-[74vw] bg-dark rounded-xl px-8"></div>
          <div className="body h-[74vh] w-[74vw] bg-dark rounded-xl px-8"></div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
