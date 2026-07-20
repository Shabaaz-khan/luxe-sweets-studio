import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  registerCustomer,
  loginCustomer,
  getCurrentCustomer,
} from "@/api/customerAuth";

import {
  setCustomerToken,
  removeCustomerToken,
  getCustomerToken,
} from "@/lib/customerToken";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

type AuthContextType = {
  customer: Customer | null;
  loading: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;

  register: (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;

  logout: () => void;

  refreshCustomer: () => Promise<void>;

  isAuthenticated: boolean;
};

const CustomerAuthContext =
  createContext<AuthContextType | null>(null);

export function CustomerAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [customer, setCustomer] =
    useState<Customer | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = getCustomerToken();

        if (!token) {
          setLoading(false);
          return;
        }

        const data =
          await getCurrentCustomer();

        setCustomer(data.customer);
      } catch {
        removeCustomerToken();
        setCustomer(null);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  const register = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => {
    try {
      const data =
        await registerCustomer({
          name,
          email,
          phone,
          password,
        });

      setCustomerToken(data.token);
      setCustomer(data.customer);

      return {
        success: true,
      };
    } catch (err: any) {
      return {
        success: false,
        message:
          err?.response?.data?.error ??
          "Registration failed",
      };
    }
  };
const refreshCustomer = async (): Promise<void> => {
  try {
    const data = await getCurrentCustomer();
    setCustomer(data.customer);
  } catch {
    removeCustomerToken();
    setCustomer(null);
  }
};
  const login = async (
    email: string,
    password: string
  ) => {
    try {
      const data =
        await loginCustomer({
          email,
          password,
        });

      setCustomerToken(data.token);
      setCustomer(data.customer);

      return {
        success: true,
      };
    } catch (err: any) {
      return {
        success: false,
        message:
          err?.response?.data?.error ??
          "Login failed",
      };
    }
  };

  const logout = () => {
    removeCustomerToken();
    setCustomer(null);
  };

  return (
    <CustomerAuthContext.Provider
      value={{
        customer,
        loading,
        login,
        register,
        logout,
         refreshCustomer,
        isAuthenticated:
          !!customer,
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const context =
    useContext(CustomerAuthContext);

  if (!context) {
    throw new Error(
      "useCustomerAuth must be used inside CustomerAuthProvider"
    );
  }

  return context;
}