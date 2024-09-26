import { Link } from "react-router-dom";
import { giphy2, giphy3, giphy4, giphy5 } from "../../assets/gif/index";
import { smile, pen } from "../../assets/icons/index";

const Cta = () => {
  return (
    <div className="relative w-full mx-auto py-16 bg-[#14141D] flex justify-center">
      <div className=" absolute text-center text-white mb-8">
        <h2 className=" text:3xl lg:text-5xl font-bold bg-gradient-to-r from-[#4782E0] to-white bg-clip-text text-transparent">
          Create your Token{" "}
        </h2>
      </div>
      <div className="w-[90%] lg:h-[700px] h-[450px] relative max-w-7xl mt-24  flex justify-center bg-gradient-to-r from-gray-300/20  to-gray-500/20  bg-transparent border  border-fuchsia-300/20  rounded-3xl shadow-lg p-8">
        {/* Main content container */}
        <div className="flex flex-col  lg:flex-row gap-8">
          {/* Button Section */}
          <div className="lg:w-1/2 flex flex-col pt-14">
            <h3 className="text-4xl lg:text-5xl font-bold text-white">
              Create your dream memefund
            </h3>
            <p className="text-[#D9D9D9] text-xl font-light mt-9 mb-7">
              Bringing the meme world to the
              <br />
              community, engagement, and
              <br />
              maximizing profit cap to the fullest
            </p>
            <div className="flex flex-wrap gap-4 lg:mt-8  justify-center lg:justify-start">
              <Link to="/create">
                <button className="bg-blue-500 text-white py-3 px-5 w-[220px]  flex items-center   rounded-lg space-x-2  font-semibold hover:bg-blue-600 transition-colors">
                  <span>Create Your Token </span>
                  <img
                    src={smile}
                    alt="wallet"
                    className="w-5 h-5 object-contain"
                  />
                </button>
              </Link>
              <Link to={"/portfolio"}>
                <button className="bg-transparent text-white py-3  border flex items-center  border-white px-14 w-[200px] space-x-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                  <span>Portfolio </span>
                  <img
                    src={pen}
                    alt="wallet"
                    className="w-5 h-5 object-contain"
                  />
                </button>
              </Link>
            </div>
          </div>

          {/* Meme Grid Section */}
          <div className="lg:w-1/2 lg:grid grid-cols-2 hidden  justify-center items-center m-10">
            <img
              src={giphy2}
              alt="Spongebob Meme"
              className="rounded-ss-3xl w-[250px] h-[250px] object-cover"
            />
            <img
              src={giphy3}
              alt="Batman Meme"
              className="rounded-tr-3xl w-[250px] h-[250px] object-cover"
            />
            <img
              src={giphy4}
              alt="Anime Girl Meme"
              className="rounded-es-3xl w-[250px] h-[250px] object-cover"
            />
            <img
              src={giphy5}
              alt="Kermit Meme"
              className="rounded-ee-3xl w-[250px] h-[250px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
