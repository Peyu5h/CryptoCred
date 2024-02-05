import NavBar from "../components/NavBar";
import hero from "../assets/output-onlinegiftools.gif";

const HomePage = () => {
  return (
    <div>
      <div className="flex gap-x-8">
        <NavBar templateSelected={false} />
        <div className="body h-[88vh] w-[74vw] bg-dark rounded-xl px-8">
          <img src={hero} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
