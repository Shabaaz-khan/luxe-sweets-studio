const CUSTOMER_TOKEN_KEY = "customer_token";

export const getCustomerToken = () => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(CUSTOMER_TOKEN_KEY);
};

export const setCustomerToken = (token: string) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(CUSTOMER_TOKEN_KEY, token);
};

export const removeCustomerToken = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(CUSTOMER_TOKEN_KEY);
};