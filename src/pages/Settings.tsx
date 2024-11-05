import { useEffect } from "react";
import SettingsMain from "../components/settings/SettingsMain";

const Settings = () => {
  useEffect(() => {
    document.title = "Settings";
  }, []);

  return (
    <>
      <SettingsMain />
    </>
  );
};

export default Settings;
