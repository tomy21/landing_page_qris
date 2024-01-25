import axios from "axios";

export const getPaymentConfirmasions = async () => {
  try {
    const response = await axios.get(
      "http://8.215.31.248:9004/ccc/public/api/payment"
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Melemparkan error agar dapat ditangkap oleh pemanggil fungsi
  }
};
