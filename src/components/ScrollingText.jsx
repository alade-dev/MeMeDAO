import "./scrollingText.css";

const ScrollingText = () => {
  return (
    <div className="bg-gray-900">
      <h1 className=" text-6xl text-transparent bg-gray-900   mb-2 pt-5 text-center bg-gradient-to-r bg-clip-text from-[#4782E0] to-[#2A61E0] z-10">
        How It Works
      </h1>
      <div className="relative h-[358px] w-full hidden lg:flex justify-center items-center bg-gray-900 overflow-hidden">
        <div className="h-[207px] w-[873px]  font-semibold  overflow-hidden">
          <div className="animate-scrollUpDown whitespace-nowrap">
            <span className=" text-3xl bg-gradient-to-b text-center from-black to-white bg-clip-text text-transparent">
              Users can buy tokens at any time using our bonding curve system
            </span>
            <p className=" text-3xl bg-gradient-to-b text-center from-black/35 to-white bg-clip-text text-transparent">
              and sell whenever they choose.
            </p>
            <p className=" text-xl bg-gradient-to-b text-center from-white/10 to-white bg-clip-text text-transparent ">
              Once a meme token reaches a $32,000 market cap, the community
              takes charge.
            </p>
            <p className=" text-3xl bg-gradient-to-b text-center from-black to-white bg-clip-text text-transparent ">
              At this point, $5,000 of liquidity is locked and
            </p>
            <p className=" text-2xl bg-gradient-to-b text-center from-black to-white bg-clip-text text-transparent ">
              burned to ensure the token’s long-term stability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollingText;
