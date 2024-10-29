import React from "react";
import { useTheme } from "../../contexts/ThemeProvider";
import { themes } from "../../themes/themes";
import { useMutation } from "react-query";
import { updateTheme } from "../../api/configApi";
import { getUserId } from "../../utils/decodeJwt";
import { useAuth } from "../../contexts/authContext";
import { useNotice } from "../../contexts/NoticeContext";

interface ThemeButtonProps {
  newTheme: string;
  className?: string | undefined;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({
  newTheme,
  className = "",
}) => {
  const { theme, handleThemeChange } = useTheme();
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("access_token");
  const { showNotice } = useNotice();
  const mutation = useMutation(updateTheme, {
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      showNotice(`Error updating theme: ${error}`, "error", 5000);
    },
  });

  const handleClick = () => {
    handleThemeChange(newTheme);
    if (token === null || !isAuthenticated) return;

    const user_id = getUserId(token);
    if (user_id === undefined) return;

    if (newTheme !== theme) {
      mutation.mutate({ user_id, newTheme });
    }
  };

  return (
    <button
      style={{
        color: themes[newTheme]["--main-color"],
        backgroundColor: themes[newTheme]["--bg-color"],
        border:
          newTheme === theme
            ? `2px solid ${themes[newTheme]["--sub-color"]}`
            : "",
      }}
      className={`theme p-2 mb-3 rounded-lg hover:scale-105 transition-all duration-200 tracking-widest ${className}`}
      onClick={handleClick}
    >
      {newTheme}
    </button>
  );
};

export default ThemeButton;
