import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { backarrow, mark } from "../../assets/icons";
import { giphy2, giphy3, giphy4 } from "../../assets/gif/index";
import "./CreateToken.css";

const CreateToken = () => {
  const memeImages = [giphy2, giphy3, giphy4];
  const positions = [
    { top: "0", left: "50%", transform: "translate(-50%, 0)" },
    { top: "58%", left: "0", transform: "translate(0, -50%)" },
    { top: "100%", left: "100%", transform: "translate(-100%, -100%)" },
  ];

  const [currentRotation, setCurrentRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRotation((prevRotation) => (prevRotation + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen   mx-auto flex justify-center lg:pt-25 px-10 pt-20  bg-gray-900">
      <div className="container lg:max-w-7xl max-w-1xl mx-auto lg:px-4">
        <div className="flex mb-4 justify-between items-center">
          <Link to="/">
            <button className="px-4 h-10 bg-[#4782E0] text-white rounded-lg hover:bg-blue-700">
              <img
                src={backarrow}
                alt="back"
                className="w-4 h-4 object-contain"
              />
            </button>
          </Link>
          <h2 className="text-3xl md:text-5xl font-medium text-center flex-grow">
            <span className="bg-gradient-to-r from-[#4782E0] to-white bg-clip-text text-transparent">
              Create your dream Token
            </span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-start pt-12 lg:space-x-12">
          <div className="bg-gradient-to-r from-gray-300/20 to-gray-800/30 border border-fuchsia-300/20 p-8 rounded-lg shadow-lg w-full lg:w-1/2 mb-6 lg:mb-0">
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300">
                  Name<span className="text-red-700">*</span>
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] text-white border border-gray-600"
                  placeholder="Enter token name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">
                  Ticker<span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] text-white border border-gray-600"
                  placeholder="Enter ticker"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">
                  Description<span className="text-red-700">*</span>
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] text-white border border-gray-600"
                  rows="4"
                  required
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">
                  Created By<span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] text-white border border-gray-600"
                  placeholder="Creator name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">
                  Image<span className="text-red-700">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*.GIF,.gif"
                  className="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] text-white border border-gray-600"
                />
              </div>
              <div className="flex justify-end">
                <button className="bg-[#4782E0] text-white text-md px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-600">
                  <span>Create Now</span>
                  <img
                    src={mark}
                    alt="mark"
                    className="w-4 h-4 object-contain"
                  />
                </button>
              </div>
            </form>
          </div>

          <div className="hidden lg:flex lg:w-1/2 justify-center pr-16 pt-10 items-center">
            <div className="relative w-[410px] h-[560px]">
              {memeImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Meme ${index + 1}`}
                  className={`absolute w-[200px] h-[200px] rounded-full transition-all duration-500  `}
                  style={{
                    ...positions[(index + currentRotation) % 3],
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateToken;
