import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
} from "react";

interface ModalProps {
  children: ReactElement;
  setCloseModal?: Dispatch<SetStateAction<boolean>>;
  callbackOnClose?: () => void;
  darknessBg?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  setCloseModal,
  callbackOnClose,
  darknessBg,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setCloseModal && setCloseModal(false);
        callbackOnClose && callbackOnClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("overflow-hidden");
    };
  }, [setCloseModal, callbackOnClose]);

  return (
    <div
      className={`w-screen h-screen ${className} ${
        darknessBg && "dark-bg"
      } fixed z-[49] left-0 top-0 flex items-center justify-center`}
    >
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        ref={modalRef}
      >
        {" "}
        {children}
      </div>
    </div>
  );
};

export default Modal;
