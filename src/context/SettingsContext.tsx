import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getSettings } from "@/api/api";

const SettingsContext = createContext<any>(null);

export function SettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function loadSettings() {
    try {
      const data = await getSettings();
      setSettings(data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        refreshSettings: loadSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  return useContext(SettingsContext);
};