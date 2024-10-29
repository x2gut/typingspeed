import React, { memo } from "react";

interface SettingsBtnProps {
  label: string;
  callback: () => void;
  className: string | boolean;
  style?: React.CSSProperties;
}

const SettingsBtn: React.FC<SettingsBtnProps> = ({
  label,
  callback,
  className,
  style = {},
}) => {
  return (
    <button
      style={style}
      className={`option-btn ${className}`}
      onClick={callback}
    >
      {label}
    </button>
  );
};

export default memo(SettingsBtn);
