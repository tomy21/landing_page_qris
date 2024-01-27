// QRCodeGenerator.js
import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { useNavigate, useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";
import { MD5 } from "crypto-js";
// import io from "socket.io-client";
import CountdownTimer from "../components/countDownt";
import NumberFormatComponent from "../components/numberFormater";
import Pusher from "pusher-js";
import axios from "axios";

// const socket = io("https://82qvhws5-3005.asse.devtunnels.ms");

const Generate = () => {
  const [countdownStatus, setCountdownStatus] = useState("active");
  const [currentQRCode, setCurrentQRCode] = useState(null);
  const [pageDone, setPageDone] = useState(0);
  const location = useLocation();
  const [apiResponse, setApiResponse] = useState(null);
  const [p1, setP1] = useState(null);
  const [p2, setP2] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Mengambil nilai parameter dari query string
    const params = new URLSearchParams(location.search);
    const paramP1 = params.get("p1");
    const paramP2 = params.get("p2");
    const login = "nobuepay";
    const password = "nobuepay";
    const secret = "nobuepay";

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const date = `${year}${month}${day}PARTNER_KEY`;
    const apiUrl = "https://api-testing-murex.vercel.app/api/inquiry";
    const key = date;
    const hash = MD5(login + password + paramP1 + paramP2 + secret).toString();

    const data = {
      login: login,
      password: password,
      storeID: paramP1,
      transactionNo: paramP2,
      signature: hash,
    };
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      key
    ).toString();

    console.log("data :", encryptedData);
    const fetchData = async () => {
      try {
        const pusher = new Pusher("548ff46dda83b623f146", {
          cluster: "ap1",
        });

        const channel = pusher.subscribe("Issues");

        channel.bind("PopUp", (data) => {
          setPageDone(data.data.code);
          console.log("Received data:", data.data.code);
        });
        const response = await axios.post(
          apiUrl,
          {
            data: encryptedData,
          },
          {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          }
        );
        const responseData = response.data.data;
        const apiResponse = CryptoJS.AES.decrypt(responseData, key);
        const decryptedData = JSON.parse(
          apiResponse.toString(CryptoJS.enc.Utf8)
        );
        console.log("repsones : ", decryptedData);
        setApiResponse(decryptedData);
        setCurrentQRCode(responseData);
        console.log(decryptedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    setP1(paramP1);
    setP2(paramP2);
    fetchData();
  }, [location.search]);

  console.log({ dataSaya: pageDone.code });

  if (pageDone === 200) {
    const data = {
      noTrx: p2,
      locations: apiResponse.data.location,
      amount: apiResponse.data.tariff,
    };

    navigate("/done", {
      state: data,
    });
  }

  const handleCountdownExpired = () => {
    setCountdownStatus("expired");
    // setCurrentQRCode(generateLink);
  };

  const handleDownload = () => {
    const canvas = document.getElementById("qrcode-canvas");
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  console.log(currentQRCode);
  return (
    <div className="p-5">
      {apiResponse && (
        <div className="h-full">
          <div className="w-full h-[100vh] xl:h-[93vh] xl:w-96 flex flex-col justify-center items-center m-auto bg-white rounded-md shadow-md shadow-white">
            <div
              className={`h-[40%] w-full bg-blue-400 rounded-t-md border-gray-900 text-black ${
                countdownStatus === "active" ? " " : "hidden"
              } `}
            >
              <h1
                className={`p-1 ${
                  countdownStatus === "active"
                    ? "bg-white"
                    : "bg-red-700 text-white"
                } w-[60%] m-auto justify-center flex items-center mt-8 rounded-lg`}
              >
                {countdownStatus === "active" ? (
                  <CountdownTimer onExpired={handleCountdownExpired} />
                ) : (
                  <h1>Expired</h1>
                )}
              </h1>
              <h1
                className={`text-xs w-[70%] m-auto mt-4 text-center ${
                  countdownStatus === "active" ? " " : "hidden"
                }`}
              >
                Lakukan pembayaran sebelum{" "}
                <span className="font-bold">30 Detik</span>
              </h1>
            </div>
            <div className="relative h-full flex flex-col justify-center gap-2 items-center w-[50%] text-center">
              {countdownStatus === "active" ? (
                <div className="mt-5">
                  <QRCode
                    id="qrcode-canvas"
                    value={currentQRCode}
                    size={170}
                    onClick={handleDownload}
                  />
                </div>
              ) : (
                <img src="/images/expired.png" width={250} alt="" />
              )}

              <img
                src="/images/qrisLogo.png"
                width={250}
                className={`absolute bottom-0 xl:bottom-[-10px] ${
                  countdownStatus === "active" ? " " : "hidden"
                }`}
                alt=""
              />
              {countdownStatus === "active" ? (
                <h1 className="text-xs w-80">
                  Silahkan click untuk download atau scan dengan E-wallet Anda
                </h1>
              ) : (
                <h1 className={`text-sm w-80 `}>
                  Waktu sudah habis, lakukan scan dengan camera kembali
                </h1>
              )}
            </div>

            <div
              className={`fixed border border-slate-200 w-72 h-32 top-[8.5rem] rounded-md bg-white shadow-md ${
                countdownStatus === "active" ? " " : "hidden"
              } `}
            >
              <div className="flex flex-row px-4 py-2 gap-3 justify-start items-center">
                <img src="/images/logo.png" width={50} className="" alt="" />
                <div className="flex flex-col">
                  <h1 className="text-xs font-semibold">Transaction No</h1>
                  <h1 className="text-xs text-gray-400 font-medium mb-1">
                    {apiResponse.data.transactionNo}
                  </h1>
                  <h1 className="text-xs">{apiResponse.data.location}</h1>
                </div>
              </div>
              <hr />
              <div className="flex justify-between items-start px-5 py-2 m-auto">
                <div className="flex flex-col">
                  <h1 className="text-xs font-semibold">Tariff</h1>
                  <h1 className="text-sm">
                    <NumberFormatComponent amount={apiResponse.data.tariff} />
                  </h1>
                  {/* <h1 className="text-xs">{apiResponse.data.tariff}</h1> */}
                </div>
                <div className="flex flex-col w-[20%]">
                  <h1 className="text-xs font-semibold">Vehicle</h1>
                  <h1 className="text-sm">{apiResponse.data.vehicleType}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Generate;
