import React from "react";

const FormatNumber = ({ amount }) => {
  // Ubah string menjadi angka
  const numericAmount = parseFloat(amount);

  // Cek apakah numericAmount adalah angka valid
  if (isNaN(numericAmount)) {
    return <span>Invalid Amount</span>;
  }

  // Format angka dengan toLocaleString()
  const formattedAmount = numericAmount.toLocaleString("id-ID");

  return <span>{formattedAmount}</span>;
};

export default FormatNumber;
