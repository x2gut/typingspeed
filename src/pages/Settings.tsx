import Header from "../components/header/Header";
import { ThemeProvider } from "../contexts/ThemeProvider";
import {
  TypeSettingsProvider,
  useTypeSettings,
} from "../contexts/TypeSettingsContext";
import SettingsMain from "../components/settings/SettingsMain";

const Settings = () => {
  return (
    <>
      <div className="page-content h-full">
        <Header />
        <SettingsMain />
      </div>
    </>
  );
};

export default Settings;
