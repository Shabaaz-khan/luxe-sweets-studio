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
// Coupons

export const validateCoupon = async (payload: any) => {
  const { data } = await api.post("/coupons/validate", payload);
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
export const submitCorporateInquiry  = async (
    payload:any
) => {
    const { data } = await api.post(
        "/corporate",
        payload
    );

    return data;
};
export const getSettings = async () => {
  const { data } = await api.get("/settings");
  return data;
};
export const getCorporatePage = async () => {
  const res = await api.get("/corporate-page");
  return res.data;
};
export const getMenuPage = async () => {
  const res = await api.get("/menu-page");
  return res.data;
};
export const getAboutPage = async () => {
  const res = await api.get("/about-page");
  return res.data;
};
export const getHomePage = async () => {
  const res = await api.get("/home-page");
  return res.data;
};
export async function getLegalPage() {
  const { data } = await api.get("/legal");
  return data;
}
export const getMyOrders = async () => {
  const { data } = await api.get("/orders/my-orders");
  return data.orders;
};