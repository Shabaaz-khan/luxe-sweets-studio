import api from "./axios";

export const registerCustomer = async (payload: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) => {
  const { data } = await api.post(
    "/customer/register",
    payload
  );

  return data;
};

export const loginCustomer = async (payload: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post(
    "/customer/login",
    payload
  );

  return data;
};

export const getCurrentCustomer = async () => {
  const { data } = await api.get(
    "/customer/me"
  );

  return data;
};