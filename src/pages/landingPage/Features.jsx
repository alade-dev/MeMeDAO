import { useState } from "react";
import tokens from "../../data";
import { bag } from "../../assets/icons";

const Feature = () => {
  const [selectedCategory, setSelectedCategory] = useState("Hot");
  const [selectedDuration, setSelectedDuration] = useState("1h");

  // Filter tokens by selected category and duration
  const filteredTokens = tokens
    .filter(
      (token) =>
        token.category === selectedCategory &&
        token.duration === selectedDuration
    )
    .flatMap((token) => token.projects);

  return (
    <div className="p-6 bg-[#2A2A2A] text-white min-h-screen mx-auto max-w-screen-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Features</h2>

      {/* Category and Duration Filters */}
      <div className="flex justify-between mb-6">
        <div className="flex  bg-[#D9D9D9]/10 rounded-md p-1  border justify-evenly  lg:h-[60px] lg:w-[700px] border-[#D9D9D9]/30  space-x-1">
          {["Hot", "New Listing", "Gainers", "Favourites"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-12 py-4 rounded-lg font-medium ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-transparent text-gray-400 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex bg-[#D9D9D9]/10 rounded-md p-1  border justify-evenly  lg:h-[60px] lg:w-[450px] border-[#D9D9D9]/30  space-x-1">
          {["1h", "6h", "24h", "7d"].map((duration) => (
            <button
              key={duration}
              onClick={() => setSelectedDuration(duration)}
              className={`px-10 py-2 rounded-lg font-medium ${
                selectedDuration === duration
                  ? "bg-blue-600 text-white"
                  : "bg-transparent text-gray-400 hover:bg-gray-700"
              }`}
            >
              {duration}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center  mb-6">
        <p className="text-sm pl-3 text-[#D9D9D9] font-bold">Collection</p>

        <div className="flex lg:ml-[380px] gap-40">
          <p className="text-sm text-[#D9D9D9] pl-3 ">Created By</p>
          <p className="text-sm text-[#D9D9D9] pl-12">Market Cap</p>

          <p className="text-sm font-bold text-[#D9D9D9] pl-8 ">Status</p>
        </div>
      </div>

      {/* Token List with Scrollbar */}
      <div className="max-h-[660px] overflow-y-scroll scrollbar-thin scrollbar-corner-white scrollbar-thumb-blue-500 scrollbar-track-gray-300">
        {filteredTokens.map((project, index) => (
          <div
            key={index}
            className="flex h-[170px] items-center justify-between p-4 bg-gray-800 rounded-lg shadow-lg mb-4"
          >
            <div className="relative">
              <img
                src={project.image}
                alt={project.name}
                className="w-[180px] h-[170px] object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 text-center">
                <h3 className="text-lg font-bold">{project.name}</h3>
              </div>
            </div>

          
            <div className="flex flex-row items-start lg:ml-7 gap-56 text-start">
              <p className="text-sm text-left text-[#D9D9D9]">
                {project.createdBy}
              </p>
              <p className="text-sm text-[#D9D9D9]">{project.marketCap}</p>
              <p
                className={`text-sm font-bold ${
                  project.status === "Live"
                    ? "text-green-500"
                    : "text-[#D9D9D9]"
                }`}
              >
                {project.status}
              </p>
            </div>

            <div>
              <button className="bg-blue-500 text-white py-3 px-5   flex items-center   rounded-md space-x-2  font-semibold hover:bg-blue-600 transition-colors">
                <span>Buy Project </span>
                <img src={bag} alt="bag" className="w-5 h-5 object-contain" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
