import { useEffect, useState } from "react";
import {
  giphy2,
  giphy3,
  giphy4,
  giphy5,
  giphy6,
  giphy8,
} from "../../assets/gif/index";
// import tokens from "../../data";
import { bag } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@fuels/react";
import { getTokens } from "../../contractAPI";

const Feature = () => {
  const [selectedCategory, setSelectedCategory] = useState("Hot");
  const [selectedDuration, setSelectedDuration] = useState("1h");
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const { wallet } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        if (wallet) {
          const fetchedToken = await getTokens(wallet);
          const newTokens = fetchedToken.map((token, index) => ({
            name: token.name,
            ticker: token.ticker,
            assertID: token.assertID,
            contractId: token.contractId,
            image: [giphy2, giphy3, giphy4, giphy5, giphy6, giphy8][index],
            category: "Hot", // You can modify these default values
            duration: "1h", // based on your needs
            createdBy: "Anonymous", // or fetch from your contract
            marketCap: "calculating...", // or fetch from your contract
            status: "Live", // or fetch from your contract
          }));
          setTokens(newTokens);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, [wallet]);

  // Filter tokens by selected category and duration
  const filteredTokens = tokens.filter(
    (token) =>
      token.category === selectedCategory && token.duration === selectedDuration
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[200px] w-full">
        <div className="animate-pulse text-lg text-blue-400">
          Loading tokens...
        </div>
      </div>
    );
  }

  const handleTokenClick = (token) => {
    navigate(`/token/${token.name}`, { state: { tokenData: token } });
  };

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
          <p></p>
        </div>
        <div className="max-h-[660px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300/10">
          {filteredTokens.map((token, index) => (
            <div
              key={index}
              className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-4 items-center bg-gray-800/30 rounded-lg p-4 mb-4"
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-full sm:w-auto">
                  <img
                    src={token.image}
                    alt={token.name}
                    className="w-full sm:w-[180px] h-[170px] object-cover rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 text-center">
                    <h3 className="text-lg font-bold">{token.name}</h3>
                  </div>
                </div>
              </div>
              <p className="text-sm text-[#D9D9D9]">{token.createdBy}</p>
              <p className="text-sm text-[#D9D9D9]">{token.marketCap}</p>
              <p
                className={`text-sm font-bold ${
                  token.status === "Live" ? "text-green-500" : "text-[#D9D9D9]"
                }`}
              >
                {token.status}
              </p>

              <button
                onClick={() => handleTokenClick(token)}
                className="bg-blue-500 text-white py-4 px-4 rounded-md font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Buy Project</span>
                <img src={bag} alt="bag" className="w-5 h-5 object-contain" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feature;
