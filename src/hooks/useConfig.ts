import { createConfig, getConfig } from "../api/configApi";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {useAuthStore} from "../store/auth-store";
import { useTheme } from "../contexts/ThemeProvider";
import useSettingsStore from "../store/settings-store";
import { AxiosError } from "axios";
import { useNoticeStore } from "../store/notification-store";

const useConfig = () => {
  const [config, setConfig] = useState({});
  const { isAuthenticated, userId } = useAuthStore();
  const { handleThemeChange } = useTheme();
  const { setGameSettings } = useSettingsStore();
  const {showNotice} = useNoticeStore();

  const { data } = useQuery(["config"], () => getConfig(userId), {
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      const config = response.data.config;
      const theme = response.data.theme;

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
    onError: (error: AxiosError) => {
      showNotice(`Error fetching config: ${error}`)
    }
  });
  return { config, setConfig };
};

export default useConfig;