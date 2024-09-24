import { Link } from "react-router-dom";
// import logo from "../../assets/logos/logo.png";
import { motion } from "framer-motion";
import { useState } from "react";
import search from "../../assets/icons/search.png";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const handleConnect = () => {
  //   if (!wallet) {
  //     connect();
  //   }
  // };

  // const handleDisconnect = () => {
  //   if (wallet) {
  //     disconnect(wallet);
  //   }
  // };

  // const account = wallet?.accounts.find((account) => account.address);

  // const slicedAddress = account?.address
  //   ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}`
  //   : "";

  // const handleCopyAddress = () => {
  //   if (account?.address) {
  //     navigator.clipboard.writeText(account.address);
  //     alert("Wallet address copied to clipboard!");
  //   }
  // };

  return (
    <>
    <nav className=" flex justify-between lg:relative mx-auto items-center bg-[#2A2A2A] px-8 py-4">
      {/* Logo and Brand Name */}
      <Link to="/">
        <motion.div
          whileHover={{
            scale: 1.1,
          }}
          className="flex items-center space-x-2"
        >
          {/* <img src={logo} alt="BlockPass Logo" className="h-8 mr-2" /> */}
          {/* <span className="text-white font-semibold text-lg">BlockPass</span> */}
          <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
        </motion.div>
      </Link>
      {/* Hamburger Button */}
      <button
        className="md:hidden text-white hover:text-[#F5167E] focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
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

      {/* Navigation Links */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-black/30 md:bg-transparent p-4 md:p-0 z-10`}
      >
        <div className="block md:hidden items-center space-x-2 bg-[#2d2d35] px-4 py-2 mb-3 w-[300px] hover:border-gray-500 focus-within:border-gray-500 transition-colors rounded-md">
          <input
            type="text"
            placeholder="Search"
            className="bg-[#2d2d35] text-white px-4 py-1 rounded-l-md focus:outline-none w-full"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-[#4782E0] transition-colors duration-200  text-white px-4 py-3 text-md rounded-md hover:bg-[#5892f0] "
          // onClick={handleConnect}
        >
          Connect Wallet
        </motion.button>
      </div>
      
    </nav>

    </>
  );
};

export default NavBar;
