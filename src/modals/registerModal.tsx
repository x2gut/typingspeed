import React, { Dispatch, useEffect, useRef, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";

interface RegisterModalInterface {
  isRegister: boolean;
  setIsRegister: Dispatch<React.SetStateAction<boolean>>;
}

const RegisterModal: React.FC<RegisterModalInterface> = ({
  isRegister,
  setIsRegister,
}) => {
  const [username, setUsername] = useState<string>("");
  const [isUsernameError, setIsUsernameError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordError, setIsPasswordError] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isEmailError, setIsEmailError] = useState<string>("");

  const modalRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node))
        setIsRegister(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const usernameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const usernameMinLength = 4;
    const usernameMaxLength = 16;

    setUsername(event.target.value);

    if (username.length < usernameMinLength) {
      setIsUsernameError("Min username length is 4");
      return;
    } else if (username.length > usernameMaxLength) {
      setIsUsernameError("Max username length is 16");
      return;
    }
    setIsUsernameError("");
  };

  return (
    <>
      {isRegister && (
        <div className="register-modal w-full h-full fixed left-0 top-0 flex items-center justify-center">
          <form
            action=""
            className="register-modal-form flex justify-center items-center gap-3 flex-col max-w-80 max-h-80"
            ref={modalRef}
          >
            <div className="reg-modal-title flex gap-1 items-center">
              <AiOutlineUserAdd size={32} />
              <h3 className="register-title w-full text-start">register</h3>
            </div>
            <input
              type="text"
              className="register-field register-username w-72"
              placeholder="username"
              onChange={(event) => {
                usernameChangeHandler(event);
              }}
              value={username}
            />
            <input
              type="email"
              className="register-field register-email w-72"
              placeholder="email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
            <input
              type="password"
              className="register-field register-pass w-72"
              placeholder="password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
            <input
              type="password"
              className="register-field register-repeat-pass w-72"
              placeholder="repeat password"
              onChange={(event) => setRepeatPassword(event.target.value)}
              value={repeatPassword}
            />
            <button className="register-submit-btn w-72">Register</button>
          </form>
        </div>
      )}
    </>
  );
};

export default RegisterModal;
