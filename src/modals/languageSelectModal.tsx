import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useTypeSettings } from "../contexts/TypeSettingsContext";
import { GoSearch } from "react-icons/go";
import { useTheme } from "../contexts/ThemeProvider";
import SearchInput from "../components/common/SearchInput";

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
  resetGame,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { setTypeSettings } = useTypeSettings();
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node))
        setIsActive(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsActive]);

  const changeLang = (newLang: string, layout: string) => {
    setIsActive(false);
    setTypeSettings((prevData) => ({
      ...prevData,
      lang: newLang,
      layout: layout,
    }));
    resetGame();
  };

  return (
    <>
      {isActive && (
        <div className="language-modal w-screen h-screen fixed top-0 left-0 flex justify-center">
          <div className="language-modal-content rounded-r-lg" ref={modalRef}>
            <GoSearch
              size={20}
              color={colors.mainColor}
              className="absolute translate-y-3 translate-x-2"
            />
            <SearchInput
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
      )}
    </>
  );
};

export default LanguageSelectModal;
