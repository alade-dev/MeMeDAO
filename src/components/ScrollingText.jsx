import './scrollingText.css'; 

const ScrollingText = () => {
    return (
      <div className="relative h-[358px] w-full hidden lg:flex justify-center items-center bg-gray-900 overflow-hidden">
        <div className="h-[207px] w-[873px]  font-semibold  overflow-hidden">
          <div className="animate-scrollUpDown whitespace-nowrap">
            <span className=" text-3xl bg-gradient-to-b text-center from-black to-white bg-clip-text text-transparent">
              Our site uses a fair-launch system without presales or
            </span>
            <p className=" text-3xl bg-gradient-to-b text-center from-black to-white bg-clip-text text-transparent">
            team allocations .
            </p>
            <p className=" text-2xl bg-gradient-to-b text-center from-black to-white bg-clip-text text-transparent ">
              Users buy tokens on the bonding curve and can sell anytime.
            </p>
            <p className=" text-3xl bg-gradient-to-b text-center from-black to-white bg-clip-text text-transparent ">
              Once the token reaches a $69,000 market cap,
            </p>
            <p className=" text-2xl bg-gradient-to-b text-center from-black to-white bg-clip-text text-transparent ">
              $12,000 of liquidity is locked in Raydium and burned to ensure stability.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default ScrollingText;