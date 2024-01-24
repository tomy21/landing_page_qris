import axios from "axios";

export const getPaymentConfirmasions = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:3002/api/payment-confirm"
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Melemparkan error agar dapat ditangkap oleh pemanggil fungsi
  }
};
