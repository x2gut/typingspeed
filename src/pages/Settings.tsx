import { useEffect } from "react";
import SettingsMain from "../components/settings/SettingsMain";
import { TypeSettingsProvider } from "../contexts/TypeSettingsContext";

const Settings = () => {
  useEffect(() => {
    document.title = "Settings";
  }, []);

  return (
    <TypeSettingsProvider>
      <SettingsMain />
    </TypeSettingsProvider>
  );
};

export default Settings;
