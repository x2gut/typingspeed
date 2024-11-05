import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import { GoSearch } from "react-icons/go";
import { useTheme } from "../contexts/ThemeProvider";
import SearchInput from "../components/common/SearchInput";
import Modal from "../components/common/Modal";
import useSettingsStore from "../store/settings-store";
import { useMutation } from "react-query";
import { updateConfig } from "../api/configApi";
import useDebounce from "../hooks/useDebounce";
import useAuthStore from "../store/auth-store";

interface LanguageOption {
  id: string;
  label: string;
  layout: string;
}

interface LanguageSelectModalProps {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  resetGame: () => void;
}

const LanguageSelectModal: React.FC<LanguageSelectModalProps> = ({
  isActive,
  setIsActive,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { gameSettings, setGameSettings } = useSettingsStore();
  const {isAuthenticated} = useAuthStore();
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isClosing, setIsClosing] = useState(false);
  const mutation = useMutation(updateConfig, {
    onError: (error) => console.log(error),
    
  });

  const languages: LanguageOption[] = [
    { id: "english", label: "English", layout: "english" },
    { id: "english_1k", label: "English 1k", layout: "english" },
    { id: "english_10k", label: "English 10k", layout: "english" },
    { id: "russian", label: "Russian", layout: "russian" },
    { id: "russian_1k", label: "Russian 1k", layout: "russian" },
    { id: "russian_10k", label: "Russian 10k", layout: "russian" },
    { id: "ukrainian", label: "Ukrainian", layout: "ukrainian" },
  ];

  const filteredLanguages = languages.filter((language) =>
    language.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const animationProps = useSpring({
    opacity: isActive && !isClosing ? 1 : 0,
    config: { duration: 100, tension: 300 },
    onRest: () => {
      if (isClosing) {
        setIsActive(false);
        setIsClosing(false);
      }
    },
  });

  const changeLang = (newLang: string, layout: string) => {
    setIsActive(false);
    setGameSettings({
      lang: newLang,
      layout: layout,
    });
  };

  const debouncedMutation = useDebounce(mutation.mutate, 100);

  useEffect(() => {
    isAuthenticated && debouncedMutation(gameSettings);
  }, [gameSettings.lang]);

  return (
    <>
      {isActive && (
        <animated.div style={animationProps}>
          <Modal
            callbackOnClose={() => setIsClosing(true)}
            darknessBg={false}
            className="-mt-[70px] modal-bg"
          >
            <div className="w-full h-full max-w-[600px] max-h-[800px] fixed top-1/2 left-1/3 -translate-y-1/2 flex justify-center z-[499]">
              <div className="bg-[--bg-color] rounded-md" ref={modalRef}>
                <GoSearch
                  size={20}
                  color={colors.mainColor}
                  className="absolute translate-y-3 translate-x-2"
                />
                <SearchInput
                  placeholder="Search language"
                  className="language-search w-full h-12 pl-10 bg-transparent outline-none text-xl"
                  setSearchTerm={setSearchTerm}
                />
                {filteredLanguages.map((language) => (
                  <button
                    key={language.id}
                    className="language-option pl-7 py-1 w-full text-start"
                    onClick={() => changeLang(language.id, language.layout)}
                  >
                    {language.label}
                  </button>
                ))}
              </div>
            </div>
          </Modal>
        </animated.div>
      )}
    </>
  );
};

export default LanguageSelectModal;
