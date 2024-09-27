import { useState } from "react";
import tokens from "../../data";
import { Link } from "react-router-dom";

import search from "../../assets/icons/search.png";
import { backarrow, bag, buydoor, filecheck } from "../../assets/icons";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("Live project");

  // Filter tokens by selected category
  const filteredTokens = tokens
    .flatMap((token) => token.projects)
    .filter((project) => project.projectStatus === selectedCategory);

  return (
    <div className="p-6 bg-[#2A2A2A] text-white min-h-screen mx-auto lg:pt-20 max-w-screen-2xl">
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
            My Portfolio
          </span>
        </h2>
      </div>
      {/* Category Filters */}
      <div className="flex justify-between mb-6">
        <div className="flex bg-[#D9D9D9]/10 rounded-md p-1 border justify-evenly lg:h-[60px] lg:w-[400px] border-[#D9D9D9]/30 space-x-1">
          {["Live project", "My project"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-10 py-4 rounded-lg flex items-center space-x-2  font-medium ${
                selectedCategory === category
                  ? "bg-[#4782E0] text-white"
                  : "bg-transparent text-gray-400 hover:bg-gray-700"
              }`}
            >
              <span>{category}</span>
              <img
                src={selectedCategory === category ? buydoor : filecheck}
                alt="Arrow"
                className="w-4 h-4 object-contain"
              />
            </button>
          ))}
        </div>
        <div className="relative hidden md:inline-block bg-[#2d2d35] rounded-md w-[429px] px-4 py-2 border border-transparent hover:border-gray-500 focus-within:border-gray-500 transition-colors">
          {/* Input Field */}
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-white placeholder-gray-400 pr-10 my-2 focus:outline-none w-full"
          />

          {/* Search Icon */}
          <img
            src={search}
            alt="search"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
          />
        </div>
      </div>
      <div className="flex items-center mb-6">
        <p className="text-sm pl-3 text-[#D9D9D9] font-bold">Collection</p>
        <div className="flex lg:ml-[380px] gap-40">
          <p className="text-sm text-[#D9D9D9] pl-3">Created By</p>
          <p className="text-sm text-[#D9D9D9] pl-12">Market Cap</p>
          <p className="text-sm font-bold text-[#D9D9D9] pl-8">Status</p>
        </div>
      </div>
      {/* Token List */}
      <div className="max-h-[660px] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300/10">
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
                className={`text-sm font-bold ${project.status === "Live" ? "text-green-500" : "text-[#D9D9D9]"}`}
              >
                {project.status}
              </p>
            </div>
            <div>
              <button className="bg-blue-500 text-white py-3 px-5 flex items-center rounded-md space-x-2 font-semibold hover:bg-blue-600 transition-colors">
                <span>Place Trade </span>
                <img src={bag} alt="bag" className="w-5 h-5 object-contain" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
