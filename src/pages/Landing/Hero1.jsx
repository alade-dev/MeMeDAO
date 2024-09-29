import { Link } from "react-router-dom";
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
import {
  useConnectUI,
  useIsConnected,
  useWallet,
} from "@fuels/react";

import { getTokenContract, setToken } from "../../contractAPI";

const Hero = () => {
  const { connect, isConnecting } = useConnectUI();
  const { isConnected } = useIsConnected();
  const { wallet } = useWallet();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wallet) {
      setLoading(false);
    }
  }, [wallet]);
  const handleConnect = () => {
    if (!isConnected) {
      connect();
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-[#2A2A2A]  to-[#15315f] py-16 px-6 text-white">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        {/* Left side: Main Content */}
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
              {isConnecting
                ? "Connecting..."
                : isConnected
                  ? loading
                    ? "Loading..."
                    : `${wallet?.address.toAddress().slice(0, 8)}...${wallet?.address.toAddress().slice(-5)}`
                  : "Connect Wallet"}
              
              <img
                src={wallet1}
                alt="wallet"
                className="w-5 h-5 object-contain"
              />
            </motion.button>
            <Link to="/create">
              <button className="bg-transparent border border-gray-400 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-600">
                <span>Create your Token</span>
                <img
                  src={arrow}
                  alt="Arrow"
                  className="w-5 h-5 object-contain"
                />
              </button>
            </Link>
          </div>

          <Link to={"/token"}>
            <div className="bg-transparent border cursor-pointer border-fuchsia-300/20 border-r-0 p-6 rounded-xl shadow-md w-full max-w-lg text-center lg:text-left mb-16">
              <h2 className="text-3xl font-bold mb-4">Explore the trends</h2>
              <div className="flex items-center space-x-4">
                {/* Meme image */}
                <img
                  src={giphy5}
                  alt="Meme"
                  className="h-44 w-[250px] rounded-xl object-cover"
                />

                {/* Meme details */}
                <div className="text-left text-lg leading-6 ">
                  <p>
                    Created by:{" "}
                    <span className="bg-gradient-to-r from-[#4782E0] to-fuchsia-300 bg-clip-text text-transparent">
                      Joshj
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
            </div>
          </Link>
        </div>

        {/* Right side: Meme Images rotating around */}
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
