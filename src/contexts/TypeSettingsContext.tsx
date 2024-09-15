import React, { createContext, useContext, useState, ReactNode } from "react";
import { TypeSettings } from "../types/types";

interface TypeSettingsContextProps {
  typeSettings: TypeSettings;
  setTypeSettings: React.Dispatch<React.SetStateAction<TypeSettings>>;
}

const TypeSettingsContext = createContext<TypeSettingsContextProps | undefined>(undefined);

export const TypeSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [typeSettings, setTypeSettings] = useState<TypeSettings>({
    mode: "time",
    time: 30,
    words: 25,
  });

  return (
    <TypeSettingsContext.Provider value={{ typeSettings, setTypeSettings }}>
      {children}
    </TypeSettingsContext.Provider>
  );
};

export const useTypeSettings = () => {
  const context = useContext(TypeSettingsContext);
  if (!context) {
    throw new Error("useTypeSettings must be used within a TypeSettingsProvider");
  }
  return context;
};
