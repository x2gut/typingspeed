import { IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";

const SettingsBtn = () => {
  return (
    <Link to="/settings" className="header-settings">
      <IoSettings
        size={20}
        className="hover:rotate-90 transition-all duration-300"
      />
    </Link>
  );
};

export default SettingsBtn;