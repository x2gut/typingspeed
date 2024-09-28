import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { TypeSettings } from "../types/types";

interface TypeSettingsContextProps {
  typeSettings: TypeSettings;
  setTypeSettings: React.Dispatch<React.SetStateAction<TypeSettings>>;
}

const TypeSettingsContext = createContext<TypeSettingsContextProps | undefined>(
  undefined
);

export const TypeSettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const result = localStorage.getItem("config")
    ? JSON.parse(localStorage.getItem("config") as string)
    : null;

  const [typeSettings, setTypeSettings] = useState<TypeSettings>({
    layout: result?.layout || "english",
    lang: result?.lang || "english",
    mode: result?.mode || "time",
    time: result?.time ? Number(result.time) : 60,
    words: result?.words ? Number(result.words) : 50,
    keyboard: {
      show: result?.keyboard ? result.keyboard.show : false,
      responsive: result?.keyboard ? result.keyboard.responsive : false,
    },
    soundOnPress: result?.soundOnPress || false,
    caretType: result?.caretType ?? "default",
  });

  const { layout, lang, mode, time, words, keyboard, soundOnPress, caretType } =
    typeSettings;

  useEffect(() => {
    localStorage.setItem(
      "config",
      JSON.stringify({
        layout,
        lang,
        mode,
        time,
        words,
        keyboard,
        soundOnPress,
        caretType,
      })
    );
  }, [typeSettings]);

  return (
    <TypeSettingsContext.Provider value={{ typeSettings, setTypeSettings }}>
      {children}
    </TypeSettingsContext.Provider>
  );
};

export const useTypeSettings = () => {
  const context = useContext(TypeSettingsContext);
  if (!context) {
    throw new Error(
      "useTypeSettings must be used within a TypeSettingsProvider"
    );
  }
  return context;
};
