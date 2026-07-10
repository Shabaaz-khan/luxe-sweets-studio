import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const createOrder = async (amount: number) => {
  const res = await axios.post(
    `${API}/api/razorpay/create-order`,
    {
      amount,
    }
  );

  return res.data;
};

export const verifyPayment = async (data: any) => {
  const res = await axios.post(
    `${API}/api/razorpay/verify-payment`,
    data
  );

  return res.data;
};