import { create } from "zustand";
import { GameSettings, TypeSettings } from "../types/types";

const localSettings = localStorage.getItem("config")
  ? JSON.parse(localStorage.getItem("config") as string)
  : null;

interface SettingsStore {
  gameSettings: TypeSettings;
  typeSettings: GameSettings;
  setGameSettings: (gameSetting: Partial<TypeSettings>) => void;
  setTypeSettings: (typeSetting: Partial<GameSettings>) => void;
}

const useSettingsStore = create<SettingsStore>((set) => ({
  gameSettings: {
    layout: localSettings?.layout || "english",
    lang: localSettings?.lang || "english",
    mode: localSettings?.mode || "time",
    time: localSettings?.time ? Number(localSettings.time) : 60,
    words: localSettings?.words ? Number(localSettings.words) : 50,
    keyboard: {
      show: localSettings?.keyboard ? localSettings.keyboard.show : false,
      responsive: localSettings?.keyboard
        ? localSettings.keyboard.responsive
        : false,
    },
    soundOnPress: localSettings?.soundOnPress || false,
    caretType: localSettings?.caretType ?? "default",
    caretRainbow: localSettings?.caretRainbow ?? false,
    randomTheme: localSettings?.randomTheme ?? false,
    themesSidebar: localSettings?.themesSidebar ?? true,
    wordsHistory: localSettings?.wordsHistory ?? true,
  },
  typeSettings: {
    isFocused: false,
    isGameStarted: false,
    isTimeOut: false,
    time: Number(localSettings.time) || 60,
  },
  setGameSettings: (gameSetting) => {
    set((state) => ({
      gameSettings: {
        ...state.gameSettings,
        ...gameSetting,
      },
    }));
  },
  setTypeSettings: (typeSetting) =>
    set((state) => ({
      typeSettings: {
        ...state.typeSettings,
        ...typeSetting,
      },
    })),
}));

useSettingsStore.subscribe((state) => {
  localStorage.setItem("config", JSON.stringify(state.gameSettings));
});

export default useSettingsStore;
