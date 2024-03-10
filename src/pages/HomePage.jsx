import NavBar from "../components/NavBar";

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-x-8">
        <NavBar templateSelected={false} />
        <div className="body h-[88vh] md:w-[74vw] w-full bg-dark rounded-xl px-8  scrollbar overflow-hidden  flex items-center">
          <div className="flex flex-col md:flex-row justify-between m-4 ">
            <div className="mt-12 ">
              <h1 className="text-6xl  font-bebas text-white">
                Welcome to the <span className="text-grn">CryptoCred</span>
              </h1>
              <h1 className="text-[29px] mt-2 font-extralight leading-snug font-bebas text-white">
                A blockchain-based <span className="text-grn">certificate</span>{" "}
                generator and validator
              </h1>
              <p className="font-int mt-6 font-thin text-white text-md">
                In response to the prevalent issue of certificate tampering, our
                project introduces a robust solution. Leveraging blockchain and
                IPFS, we convert files into immutable hashes, fortifying the
                integrity of certificates. Experience a secure verification
                process, ensuring trust in the authenticity of every credential.
              </p>

              <div className="btns  my-12 flex gap-x-8 ">
                <Link to="/verify">
                  <div className="btn px-2 py-3 bg-grn   text-black border-2 border-grn w-36 font-semibold rounded-xl duration-300 cursor-pointer hover:border-green-500 hover:text-white hover:bg-green-500 text-center">
                    VERIFY
                  </div>
                </Link>
                <Link to="/upload">
                  <div className="btn px-2 py-3 bg-trnasparent  text-grn border-2 border-grn w-36 font-semibold rounded-xl duration-300 cursor-pointer hover:bg-grn text-center hover:text-black">
                    UPLOAD
                  </div>
                </Link>
              </div>
            </div>

            <img
              className="w-[28vw]  m-1 rounded-lg "
              src="https://res.cloudinary.com/dkysrpdi6/image/upload/v1710073925/hero_icm9rg.gif"
              alt=""
            />
          </div>
          {/* <img src={hero4} alt="" /> */}

          {/* <img src={hero} alt="" />
          <img src={hero2} alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
