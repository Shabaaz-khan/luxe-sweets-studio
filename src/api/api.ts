import api from "./axios";

// Categories
export const getCategories = async () => {
  const { data } = await api.get("/categories?active=true");
  return data;
};

// Types
export const getTypes = async () => {
  const { data } = await api.get("/types?active=true");
  return data;
};

// Products
export const getProducts = async () => {
  const { data } = await api.get("/products?available=true");
  return data;
};

export const getProduct = async (id: string) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};
// Razorpay

export const createOrder = async (payload: any) => {
  const { data } = await api.post("/razorpay/create-order", payload);
  return data;
};

export const verifyPayment = async (payload: any) => {
  const { data } = await api.post("/razorpay/verify-payment", payload);
  return data;
};
