import React, { useEffect, useState, useCallback } from "react";

const CountdownTimer = ({ onExpired }) => {
  const [timeRemaining, setTimeRemaining] = useState(30);

  const decrementTime = useCallback(() => {
    if (timeRemaining > 0) {
      setTimeRemaining((prevTime) => prevTime - 1);
    } else {
      onExpired && onExpired();
    }
  }, [timeRemaining, onExpired]);

  useEffect(() => {
    const interval = setInterval(decrementTime, 1000);

    return () => clearInterval(interval);
  }, [decrementTime]);

  // Format waktu dalam bentuk hh:mm:ss
  const formatTime = () => {
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <p className="text-[24px] text-red-500 font-semibold">{formatTime()}</p>
  );
};

export default CountdownTimer;
