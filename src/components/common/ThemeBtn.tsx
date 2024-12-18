import React from "react";
import { useTheme } from "../../contexts/ThemeProvider";
import { themes } from "../../themes/themes";
import { useMutation } from "react-query";
import { updateTheme } from "../../api/configApi";
import { getUserId } from "../../utils/decodeJwt";
import { useNoticeStore } from "../../store/notification-store";
import { useAuthStore } from "../../store/auth-store";

interface ThemeButtonProps {
  newTheme: string;
  className?: string | undefined;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({
  newTheme,
  className = "",
}) => {
  const { theme, handleThemeChange } = useTheme();
  const { isAuthenticated, userId } = useAuthStore();
  const showNotice = useNoticeStore((state) => state.showNotice);
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
    if (!isAuthenticated) return;

    if (userId === undefined) return;

    if (newTheme !== theme) {
      mutation.mutate({ user_id: userId, newTheme: newTheme });
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
