import React from "react";
import { useLocation } from "react-router-dom";

const Selesai = () => {
  const location = useLocation();

  return (
    <div>
      <div className="bg-white rounded-md border border-zinc-100 w-96 h-96 xl:h-96 m-auto mt-20 shadow-md shadow-zinc-300">
        <div className="flex flex-col justify-center items-center ">
          <img src="/images/done.png" width={100} alt="" className="mt-7" />
          <h1 className="text-lg text-black font-semibold py-1">
            {location.state.locations}
          </h1>
          <h1 className="text-lg text-black font-semibold">
            {location.state.noTrx}
          </h1>
          <hr className="border-[0.5px] w-full border-zinc-200" />
          <div className="flex flex-col text-center">
            <h1 className="text-sm text-black mt-1">AMOUNT PAID</h1>
            <h1 className="text-base text-zinc-500 font-semibold">
              Rp.{location.state.amount.toLocaleString("id-ID")}
            </h1>
          </div>
          <h1 className="text-base text-emerald-500 font-semibold mt-2">
            Payment
          </h1>
          <h1 className="text-xl text-emerald-500 font-semibold ">
            Successful
          </h1>
          <h1 className="text-sm text-emerald-500 w-56 text-center mt-5">
            Silahkan keluar area parkir sebelum 30 menit
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Selesai;
