import NavBar from "../components/NavBar";

const HomePage = () => {
  return (
    <div>
      <div className="flex gap-x-8">
        <NavBar />
        <div className="body h-[88vh] w-[74vw] bg-dark rounded-xl px-8"></div>
      </div>
    </div>
  );
};

export default HomePage;
