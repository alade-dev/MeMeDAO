import { TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { backarrow, fuel } from "../../assets/icons";
// import { giphy2 } from "../../assets/gif";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProposalsSection from "./Proposals";
import CreateProposalModal from "./CreateProposalModal";

const data = [
  { time: "10:00", price: 1.256 },
  { time: "10:30", price: 1.258 },
  { time: "11:00", price: 1.26 },
  { time: "11:30", price: 1.257 },
];

const Token = () => {
  const [comments, setComments] = useState([
    // {
    //   user: "John123",
    //   date: "29/05/2019",
    //   text: "I knew this was a lucky shot, here comes the lambo",
    //   upvotes: 5,
    //   downvotes: 5,
    // },
    // {
    //   user: "Jane456",
    //   date: "01/06/2019",
    //   text: "The market seems volatile today.",
    //   upvotes: 3,
    //   downvotes: 2,
    // },
  ]);
  const [newComment, setNewComment] = useState("");
  const location = useLocation();
  const { tokenData } = location.state || {};
  const [tokenDetails, setTokenDetails] = useState(null);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentData = {
        user: "Anonymous", // You can set the current user's name here
        date: new Date().toLocaleDateString(),
        text: newComment,
        upvotes: 0,
        downvotes: 0,
      };
      setComments([newCommentData, ...comments]); // Prepend the new comment
      setNewComment(""); // Clear the input after submission
    }
  };

  useEffect(() => {
    if (tokenData) {
      setTokenDetails(tokenData);
    }
  }, [tokenData]);

  if (!tokenDetails) {
    return <div className="text-white text-center">Loading...</div>;
  }

  const handleProposalSubmit = (proposalData) => {
    // you can handle the proposal submission here and send it to your backend
    console.log("New proposal:", proposalData);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-10 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex mb-4 justify-between align-middle items-center">
          <Link to="/">
            <button className="px-6 h-12 bg-[#4782E0] text-white rounded-lg hover:bg-blue-700">
              <img
                src={backarrow}
                alt="back"
                className="w-4 h-4 object-contain"
              />
            </button>
          </Link>
          <h2 className="text-3xl md:text-5xl font-medium text-center flex-grow">
            <span className="bg-gradient-to-r from-[#4782E0] to-white bg-clip-text text-transparent">
              Token Chart{" "}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 pt-10 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="h-64 md:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:hidden">
              <BuySellSection />
            </div>

            <div className="mx-auto ">
              <div className=" bg-gradient-to-r from-gray-300/20  to-gray-500/20  bg-transparent border  border-fuchsia-300/20 px-16 rounded-lg pt-16 p-4 max-h-[660px] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300/10">
                <h2 className="text-2xl font-bold text-[#D9D9D9] mb-7">
                  Trends
                </h2>
                <div className="space-y-4 ">
                  {comments.map((comment, index) => (
                    <div key={index} className="bg-[#2A2A2A] p-3 rounded-md">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-400">{comment.user}</span>
                        <span className="text-sm text-gray-400">
                          {comment.date}
                        </span>
                      </div>
                      <p className="mt-2">{comment.text}</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp
                          size={16}
                          className="text-blue-400 cursor-pointer mr-2"
                        />
                        <span>{comment.upvotes}</span>
                        <TrendingDown
                          size={16}
                          className="text-blue-400 cursor-pointer ml-2 mr-2"
                        />
                        <span>{comment.downvotes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#2A2A2A] rounded-lg p-4 mt-6">
                <ProposalsSection />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6 ">
            <div className="hidden lg:block">
              <BuySellSection />
            </div>
            <div className="bg-[#2E2E35] rounded-lg p-3">
              <div className="bg-[#2A2A2A] rounded-lg p-4">
                <h2 className="text-2xl font-bold mb-4">
                  Project {tokenDetails.name}{" "}
                </h2>
                <div className="bg-transparent  p-4  w-full max-w-lg text-center lg:text-left ">
                  <div className="flex items-center space-x-4">
                    {/* Meme image */}
                    <img
                      src={tokenDetails.image}
                      alt="Meme"
                      className="h-[140px] w-[160px] rounded-xl object-cover"
                    />

                    {/* Meme details */}
                    <div className="text-left   text-sm leading-6 ">
                      <p className="text-[12px]">
                        Created by:{" "}
                        <span className="bg-gradient-to-r from-[#4782E0] to-fuchsia-300 bg-clip-text text-transparent">
                          {tokenDetails.createdBy}
                        </span>
                      </p>
                      <p>less than minutes ago</p>
                      <p>Progress (0%)</p>

                      <p className="mt-3">0k/32k matcap</p>
                      <div className="bg-white rounded-full h-2 w-full mt-1">
                        <div
                          className="bg-[#4782E0] h-2 rounded-full"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm font-semibold mb-4">
                  When the market cap reaches $0 all the liquidity from the
                  bonding curve will be deposited into DAO and burned,
                  progression increases as the price goes up.
                </p>
                <p className="text-sm">
                  There are 0 tokens still available for sale in the bonding
                  curve and there is 0 Fuel in the bonding curve.
                </p>
                <button
                  onClick={() => setIsProposalModalOpen(true)}
                  className="bg-[#4782E0] text-lg px-6 py-3  text-white active:bg-blue-700 hover:bg-blue-600  transition-colors rounded-lg mt-6"
                >
                  Create Proposal
                </button>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Leave a Comment</h3>
                <form onSubmit={handleCommentSubmit}>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Leave a comment here..."
                    className="w-full bg-gray-800/50 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
                    rows="5"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#4782E0] hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    Submit Comment
                  </button>
                </form>
              </div>
              <div className="bg-[#2A2A2A] rounded-lg mt-5 p-4">
                <h2 className="text-xl font-semibold mb-4">
                  Holder Distributions
                </h2>
                {/* <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{index + 1}. John1234</span>
                      <span>34.28%</span>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateProposalModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
        onSubmit={handleProposalSubmit}
      />
    </div>
  );
};

const BuySellSection = () => {
  const [selectedTrade, setSelectedTrade] = useState("Buy");
  const location = useLocation();
  const { tokenData } = location.state || {};
  const [tokenDetails, setTokenDetails] = useState(null);

  useEffect(() => {
    if (tokenData) {
      setTokenDetails(tokenData);
    }
  }, [tokenData]);

  const handleTrade = async (e) => {
    e.preventDefault();
    try {
      // you can use the tokenDetails.contractId or other data here my oga

      console.log("Trading token:", tokenDetails);
    } catch (error) {
      console.error("Trading error:", error);
    }
  };
  if (!tokenDetails) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <>
      <p className="text-2xl font-semibold mb-4">
        Trade {tokenDetails.name} via Meme...
      </p>

      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="flex ml-auto bg-[#D9D9D9]/10 rounded-md p-1 border mb-5 justify-evenly h-[50px] w-[180px] border-[#D9D9D9]/30 space-x-1">
          {["Buy", "Sell"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedTrade(category)}
              className={`px-7 py-3 rounded-sm flex items-center space-x-2 font-medium ${
                selectedTrade === category
                  ? "bg-[#4782E0] text-white"
                  : "bg-transparent text-gray-400 hover:bg-gray-700"
              }`}
            >
              <span>{category}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <form onSubmit={handleTrade} className="w-full">
            <div className="relative w-full md:inline-block bg-[#2d2d35] rounded-md px-4 py-2 border border-transparent hover:border-gray-500 focus-within:border-gray-500 transition-colors">
              <input
                type="float"
                min={0}
                required
                placeholder="0.0"
                className="bg-transparent text-2xl text-white placeholder-gray-400 pr-10 my-2 focus:outline-none w-full"
              />
              <div className="absolute flex justify-center items-center right-4 top-0 bottom-0">
                <img src={fuel} className="w-[25px] h-[25px]" alt="" />
                <span className="ml-2 text-white">FUEL</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className={`lg:w-[40%] w-full h-full mb-10 px-1 py-3 rounded-md mt-4 text-white ${
                  selectedTrade === "Buy"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Place {selectedTrade} Trade
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Token;
