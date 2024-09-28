import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useTypeSettings } from "../contexts/TypeSettingsContext";

interface LanguageSelectModalProps {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  callback: () => void;
}

const LanguageSelectModal: React.FC<LanguageSelectModalProps> = ({
  isActive,
  setIsActive,
  callback,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { setTypeSettings } = useTypeSettings();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node))
        setIsActive(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const changeLang = (newLang: string) => {
    setIsActive(false);
    setTypeSettings((prevData) => ({
      ...prevData,
      lang: newLang,
    }));
  };

  const changeLayout = (layout: string) => {
    setIsActive(false);
    setTypeSettings((prevData) => ({
      ...prevData,
      layout: layout,
    }));
  };

  return (
    <>
      {isActive && (
        <div className="language-modal w-screen h-screen fixed top-0 left-0 flex justify-center">
          <div
            className="language-modal-content rounded-r-lg pt-10"
            ref={modalRef}
          >
            <div
              className="language-option"
              onClick={() => {
                changeLang("english");
                changeLayout("english");
                callback();
              }}
            >
              <button className="pl-7 py-1" id="english">
                english
              </button>
            </div>
            <div
              className="language-option"
              onClick={() => {
                changeLang("english_1k");
                changeLayout("english");
                callback();
              }}
            >
              <button className="pl-7 py-1" id="english_1k">
                english 1k
              </button>
            </div>
            <div
              className="language-option"
              onClick={() => {
                changeLang("english_10k");
                changeLayout("english");
                callback();
              }}
            >
              <button className="pl-7 py-1" id="english_10k">
                english 10k
              </button>
            </div>
            <div
              className="language-option"
              onClick={() => {
                changeLang("russian");
                changeLayout("russian");
                callback();
              }}
            >
              <button className="pl-7 py-1" id="rusian">
                russian
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LanguageSelectModal;
