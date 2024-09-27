import { useState } from "react";
import tokens from "../../data";
import { bag } from "../../assets/icons";
import { Link } from "react-router-dom";

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
    <div className="p-4 sm:p-6 bg-[#2A2A2A] text-white min-h-screen mx-auto max-w-screen-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
        Features
      </h2>

      {/* Category and Duration Filters */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex flex-wrap bg-[#D9D9D9]/10 rounded-md p-1 border justify-evenly w-full sm:w-auto border-[#D9D9D9]/30">
          {["Hot", "New Listing", "Gainers", "Favourites"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-2 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base flex-grow sm:flex-grow-0 m-1 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-transparent text-gray-400 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap bg-[#D9D9D9]/10 rounded-md p-1 border justify-evenly w-full sm:w-auto border-[#D9D9D9]/30">
          {["1h", "6h", "24h", "7d"].map((duration) => (
            <button
              key={duration}
              onClick={() => setSelectedDuration(duration)}
              className={`px-2 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base flex-grow sm:flex-grow-0 m-1 ${
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

      <div className="w-full">
        <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-4 mb-4 text-sm text-[#D9D9D9] font-bold">
          <p>Collection</p>
          <p>Created By</p>
          <p>Market Cap</p>
          <p>Status</p>
          <p></p> {/* Empty cell for Buy Project button alignment */}
        </div>
        <div className="max-h-[660px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300/10">
          {filteredTokens.map((project, index) => (
            <div
              key={index}
              className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-4 items-center bg-gray-800/30 rounded-lg p-4 mb-4"
            >
              <Link
                to={`/token/${project.name}`}
                className="flex items-center space-x-4"
              >
                <div className="relative w-full sm:w-auto">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full sm:w-[180px] h-[170px] object-cover rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 text-center">
                    <h3 className="text-lg font-bold">{project.name}</h3>
                  </div>
                </div>
              </Link>
              <p className="text-sm text-[#D9D9D9]">{project.createdBy}</p>
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
              <Link
                to={`/token/${project.name}`}
                className="flex items-center space-x-4"
              >
                <button className="bg-blue-500 text-white py-4 px-4 rounded-md font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
                  <span>Buy Project</span>
                  <img src={bag} alt="bag" className="w-5 h-5 object-contain" />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feature;
