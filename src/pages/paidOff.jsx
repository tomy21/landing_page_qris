import React from "react";

const PaidOff = () => {
  return (
    <div className="p-5">
      <div className="w-full h-[88vh] xl:h-[93vh] xl:w-96 flex flex-col justify-center items-center m-auto bg-white rounded-md shadow-md shadow-white">
        <img src="/images/success.png" alt="GIF" className="w-[60%]" />
        <h1 className="w-[70%] text-center">
          Ticket anda sudah dibayar silahkan scan ticket di pintu keluar
        </h1>
      </div>
    </div>
  );
};

export default PaidOff;
