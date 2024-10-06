import { Link, useNavigate } from "react-router-dom";
import {
  giphy2,
  giphy3,
  giphy4,
  giphy5,
  giphy6,
  giphy8,
} from "../../assets/gif/index";
import { wallet as wallet1, arrow } from "../../assets/icons/index";
import RotatingMemes from "../../components/RotatingMemes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useConnectUI, useIsConnected, useWallet } from "@fuels/react";
import { getTokens } from "../../contractAPI";

const Hero = () => {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState({
    data: [],
    loading: true,
    error: null
  });
  
  const { connect, isConnecting } = useConnectUI();
  const { isConnected } = useIsConnected();
  const { wallet } = useWallet();

  useEffect(() => {
    let mounted = true;

    const fetchTokens = async () => {
      if (!wallet) return;

      try {
        const fetchedToken = await getTokens(wallet);
        if (!mounted) return;

        const newTokens = fetchedToken.map((token, index) => ({
          name: token.name,
          ticker: token.ticker,
          assertID: token.assertID,
          contractId: token.contractId,
          image: [giphy2, giphy3, giphy4, giphy5, giphy6, giphy8][index] || giphy2,
          category: "Hot", // You can modify these default values
          duration: "1h",
          createdBy: "Joshj",
          marketCap: "calculating...",
          status: "Live",
        }));

        setTokens({
          data: newTokens,
          loading: false,
          error: null
        });
      } catch (error) {
        if (!mounted) return;
        setTokens(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    };

    fetchTokens();
    return () => { mounted = false; };
  }, [wallet]);

  const handleConnect = () => {
    if (!isConnected) {
      connect();
    }
  };

  const handleTrendClick = (token) => {
    navigate(`/token/${token.name}`, { state: { tokenData: token } });
  };

  const renderTrendsContent = () => {
    if (!isConnected) {
      return (
        <div className="flex flex-col items-center justify-center h-[200px] w-full">
          <div className="text-lg text-gray-400 mb-4">Connect your wallet to view trending tokens</div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-[#4782E0] transition-colors duration-200 text-white px-7 py-3 rounded-md hover:bg-[#5892f0] flex items-center space-x-2"
            onClick={handleConnect}
          >
            <span>Connect Wallet</span>
            <img src={wallet1} alt="wallet" className="w-5 h-5 object-contain" />
          </motion.button>
        </div>
      );
    }

    if (tokens.loading) {
      return (
        <div className="flex items-center justify-center h-[200px] w-full">
          <div className="animate-pulse text-lg text-blue-400">Loading trending tokens...</div>
        </div>
      );
    }

    if (tokens.error) {
      return (
        <div className="flex items-center justify-center h-[200px] w-full">
          <div className="text-red-400">Error loading tokens. Please try again later.</div>
        </div>
      );
    }

    const firstToken = tokens.data[0] || {
      name: "No Token Available",
      image: giphy2,
      createdBy: "Joshj"
    };

    return (
      <div 
        className="flex items-center space-x-4 cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => handleTrendClick(firstToken)}
      >
        <img
          src={firstToken.image}
          alt="Meme"
          className="h-44 w-[250px] rounded-xl object-cover"
        />
        <div className="text-left text-md leading-6">
          <p>
            Name:{" "}
            <span className="bg-gradient-to-r from-[#4782E0] to-fuchsia-300 bg-clip-text text-transparent">
              {firstToken.name}
            </span>
          </p>
          <p>
            Created by:{" "}
            <span className="bg-gradient-to-r from-[#4782E0] to-fuchsia-300 bg-clip-text text-transparent">
              {firstToken.createdBy}
            </span>
          </p>
          <p>2hrs ago</p>
          <p>Progress (20%)</p>
          <br />
          <p>12k/32k matcap</p>
          <div className="bg-white rounded-full h-2 w-full mt-1">
            <div
              className="bg-[#4782E0] h-2 rounded-full"
              style={{ width: "20%" }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative bg-gradient-to-r from-[#2A2A2A] to-[#15315f] py-16 px-6 text-white">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 flex flex-col items-start justify-center lg:items-start text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            Join the <span className="text-blue-500">meme</span> revolution and
            <br /> maximize the profit
          </h1>

          <div className="flex space-x-4 mb-12 justify-center lg:justify-start">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-[#4782E0] transition-colors duration-200 text-white px-7 w-fit flex gap-x-3 items-center py-3 text-md rounded-md hover:bg-[#5892f0]"
              onClick={handleConnect}
            >
              {isConnecting ? "Connecting..." : 
               isConnected ?  `${wallet?.address.toAddress().slice(0, 8) || "loading" }...${wallet?.address.toAddress().slice(-5) || "loading" }` : 
               "Connect Wallet"}
              <img src={wallet1} alt="wallet" className="w-5 h-5 object-contain" />
            </motion.button>

            <Link to="/create">
              <button className="bg-transparent border border-gray-400 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-600">
                <span>Create your Token</span>
                <img src={arrow} alt="Arrow" className="w-5 h-5 object-contain" />
              </button>
            </Link>
          </div>

          <div className="bg-transparent border cursor-pointer border-fuchsia-300/20 border-r-0 p-6 rounded-xl shadow-md w-full max-w-lg text-center lg:text-left mb-16">
            <h2 className="text-3xl font-bold mb-4">Explore the trends</h2>
            {renderTrendsContent()}
          </div>
        </div>

        <RotatingMemes
          giphy2={giphy2}
          giphy3={giphy3}
          giphy4={giphy4}
          giphy5={giphy5}
          giphy6={giphy6}
          giphy8={giphy8}
        />
      </div>
    </section>
  );
};

export default Hero;