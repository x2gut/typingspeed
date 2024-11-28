import React, { Dispatch, FormEvent, useRef, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa";
import { registerUser } from "../api/authApi";
import { loginUser, loginOauthUser } from "../api/authApi";
import { useMutation } from "react-query";
import { useNoticeStore } from "../store/notification-store";
import Modal from "../components/common/Modal";
import { useAuthCheck } from "../hooks/useCheckAuth";

interface RegisterModalInterface {
  isRegister: boolean;
  setIsRegister: Dispatch<React.SetStateAction<boolean>>;
  setIsLogin: Dispatch<React.SetStateAction<boolean>>;
}

const RegisterModal: React.FC<RegisterModalInterface> = ({
  isRegister,
  setIsRegister,
  setIsLogin,
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const {refetchAuthStatus} = useAuthCheck();
  const showNotice = useNoticeStore((state) => state.showNotice);

  const registerMutation = useMutation(registerUser, {
    onSuccess: async () => {
      showNotice("You successfully registered", "success", 5000);
      await loginUser({ username, password });
      refetchAuthStatus();
      setIsRegister(false);
      clearFields();
    },

    onError: (error: { error: string }[]) => {
      if (error.length > 0) {
        error.forEach((errorItem) =>
          showNotice(errorItem.error, "error", 5000)
        );
      }
    },
  });

  const oauthLoginMutation = useMutation(loginOauthUser, {
    onSuccess: () => {
      console.log("Success")
    },
    onError: () => {
      console.log("error")
    }
  })

  const modalRef = useRef<HTMLFormElement>(null);

  const clearFields = () => {
    setUsername("");
    setPassword("");
    setRepeatPassword("");
    setEmail("");
  };

  const checkFields = () => {
    if (
      username.length === 0 ||
      password.length === 0 ||
      repeatPassword.length === 0 ||
      email.length === 0
    ) {
      return false;
    }
    return true;
  };

  const handleRegister = () => {
    if (!checkFields()) {
      showNotice("Fields can't be empty!", "error", 5000);
      return;
    }

    if (password !== repeatPassword) {
      showNotice("Passwords do not match!", "error", 5000);
      return;
    }

    registerMutation.mutate({
      username,
      email,
      password,
    });
  };

  return (
    <>
      {isRegister && (
        <Modal
          setCloseModal={setIsRegister}
          callbackOnClose={clearFields}
          darknessBg={true}
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleRegister();
            }}
            className="modal-form flex justify-center items-center gap-3 flex-col max-w-80 max-h-96"
            ref={modalRef}
          >
            <div className="modal-title flex gap-1 items-center">
              <AiOutlineUserAdd size={32} />
              <h3 className="register-title w-full text-start">register</h3>
            </div>
            <input
              type="text"
              className="modal-field register-username w-72"
              placeholder="username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              value={username}
            />
            <input
              type="email"
              className="modal-field register-email w-72"
              placeholder="email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
            <input
              type="password"
              className="modal-field register-pass w-72"
              placeholder="password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
            <input
              type="password"
              className="modal-field register-repeat-pass w-72"
              placeholder="repeat password"
              onChange={(event) => setRepeatPassword(event.target.value)}
              value={repeatPassword}
            />
            <p>
              Already have an account?{" "}
              <button
                className="underline hover:brightness-125"
                onClick={() => {
                  setIsRegister(false);
                  setIsLogin(true);
                }}
              >
                Login
              </button>
            </p>
            <div className="flex justify-center flex-col w-full items-center">
              <p>OR</p>
              <button
                className="w-full flex justify-center px-10 py-2 bg-[--bg-color] brightness-90 rounded-lg hover:brightness-110 duration-200"
                onClick={(event: FormEvent) => {
                  event.preventDefault();
                  window.location.href = "http://localhost:8000/oauth/google/login"
                }}
              >
                <FaGoogle />
              </button>
            </div>
            <button
              className="overflow-hidden flex items-center justify-center relative w-72 bg-[--sub-accent-color]
             text-[--sub-color] py-4 px-4 rouPnded-xl font-bold uppercase -- before:block before:absolute before:h-full
              before:w-1/2 before:rounded-full before:bg-[--main-color] before:top-0 before:left-1/4
               before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-[--correct-text-color]
                hover:before:animate-ping transition-all duration-300"
            >
              <button disabled={registerMutation.isLoading} className="relative">
                {registerMutation.isLoading ? "Registering..." : "Register"}
              </button>
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default RegisterModal;
