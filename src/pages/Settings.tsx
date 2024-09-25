import { useState } from "react";
import Header from "../components/Header";
import { ThemeProvider } from "../contexts/ThemeProvider";
import { TypeSettingsProvider, useTypeSettings } from "../contexts/TypeSettingsContext";
import SettingsMain from "../components/settings/SettingsMain";

const Settings = () => {

  return (
    <>
      <TypeSettingsProvider>
        <ThemeProvider>
          <div className="page-content min-h-screen">
            <Header />
            <SettingsMain/>
            </div>
        </ThemeProvider>
      </TypeSettingsProvider>
    </>
  );
};

export default Settings;
