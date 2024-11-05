import { getConfig } from "../api/configApi";
import { useState } from "react";
import { useQuery } from "react-query";
import useAuthStore from "../store/auth-store";
import { useTheme } from "../contexts/ThemeProvider";
import useSettingsStore from "../store/settings-store";

const useConfig = () => {
  const [config, setConfig] = useState({});
  const { isAuthenticated } = useAuthStore();
  const { handleThemeChange } = useTheme();
  const { setGameSettings } = useSettingsStore();

  const { data } = useQuery(["config"], getConfig, {
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      const config = response.data[0].config[0];
      const theme = response.data[1];

      handleThemeChange(theme);

      setGameSettings({
        layout: config?.layout,
        lang: config?.lang,
        mode: config?.mode,
        time: Number(config.time),
        words: Number(config.words),
        keyboard: {
          show: config?.keyboard.show,
          responsive: config?.keyboard.responsive,
        },
        soundOnPress: config?.soundOnPress,
        caretType: config?.caretType,
        caretRainbow: config?.caretRainbow,
        randomTheme: config?.randomTheme,
        themesSidebar: config?.themesSidebar,
        wordsHistory: config?.wordsHistory,
      });
    },
  });
  return { config, setConfig };
};

export default useConfig;