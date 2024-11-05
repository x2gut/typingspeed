import { MdOutlineTimelapse } from "react-icons/md";
import { TbHexagonLetterAFilled } from "react-icons/tb";
import useSettingsStore from "../../store/settings-store";
import { useMutation } from "react-query";
import { updateConfig } from "../../api/configApi";
import useDebounce from "../../hooks/useDebounce";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/auth-store";
interface TypeSettingsMenuProps {
  className: string;
}

const TypeSettingsMenu: React.FC<TypeSettingsMenuProps> = ({ className }) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const { gameSettings, setGameSettings } = useSettingsStore();
  const {isAuthenticated} = useAuthStore();
  const { mode, time, words } = gameSettings;

  const mutation = useMutation(updateConfig, {
    onError: (error) => console.log(error),
  });
  const debouncedMutation = useDebounce(mutation.mutate, 500);

  useEffect(() => {
    if (!isFirstLaunch && isAuthenticated) {
      debouncedMutation(gameSettings)
    } else {
      setIsFirstLaunch(false);
    }
  }, [mode, time, words]);

  return (
    <div
      className={`type-settings flex justify-center transition-opacity mb-[150px] mt-10 ${className}`}
    >
      <div className="mode flex gap-5 justify-center rounded-md p-2">
        <button
          className={`flex items-center gap-2 hover:brightness-125  active:brightness-200 duration-150 ${
            mode === "words" ? "mode-btn  mode-active" : "mode-btn"
          }`}
          onClick={() => {
            setGameSettings({ mode: "words" });
          }}
        >
          <TbHexagonLetterAFilled />
          Words
        </button>
        <button
          className={`flex items-center gap-2 hover:brightness-125 active:brightness-200 duration-150 ${
            mode === "time" ? "mode-btn mode-active" : "mode-btn"
          }`}
          onClick={() => {
            setGameSettings({ mode: "time" });
          }}
        >
          <MdOutlineTimelapse />
          Time
        </button>
        <div className="vertical-separator h-full w-1 bg-[--sub-color] brightness-50 rounded-xl opacity-25"></div>
        <div className="mode-settings">
          {mode === "time" ? (
            <div className="time-settings flex gap-3">
              <button
                onClick={() => setGameSettings({ time: 15 })}
                className={`hover:brightness-125 active:brightness-200 duration-150 ${
                  time === 15 ? "mode-active" : ""
                }`}
              >
                15
              </button>
              <button
                onClick={() => setGameSettings({ time: 30 })}
                className={`hover:brightness-125 active:brightness-200 duration-150 ${
                  time === 30 ? "mode-active" : ""
                }`}
              >
                30
              </button>
              <button
                onClick={() => setGameSettings({ time: 60 })}
                className={`hover:brightness-125 active:brightness-200 duration-150 ${
                  time === 60 ? "mode-active" : ""
                }`}
              >
                60
              </button>
            </div>
          ) : (
            <div className="words-settings flex gap-3">
              <button
                onClick={() => setGameSettings({ words: 25 })}
                className={`hover:brightness-125 active:brightness-200 duration-150 ${
                  words === 25 ? "mode-active" : ""
                }`}
              >
                25
              </button>
              <button
                onClick={() => setGameSettings({ words: 50 })}
                className={`hover:brightness-125 active:brightness-200 duration-150 ${
                  words === 50 ? "mode-active" : ""
                }`}
              >
                50
              </button>
              <button
                onClick={() => setGameSettings({ words: 100 })}
                className={`hover:brightness-125 active:brightness-200 duration-150 ${
                  words === 100 ? "mode-active" : ""
                }`}
              >
                100
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypeSettingsMenu;
