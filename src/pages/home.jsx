import React from "react";

const Home = () => {
  return (
    <div>
      <div className="bg-white rounded-md border border-zinc-100 w-96 h-96 xl:h-96 m-auto mt-20 shadow-md shadow-zinc-300">
        <div className="flex flex-col justify-center items-center ">
          <img src="./images/logo.png" width={100} alt="" className="mt-16" />
          <h1 className="text-xl text-amber-400 font-semibold mt-5">Payment</h1>
          <h1 className="text-3xl text-amber-400 font-semibold ">
            SKY PARKING
          </h1>
          <h1 className="text-sm text-amber-500 w-56 text-center mt-10">
            Scan tiket dengan kamera anda
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
