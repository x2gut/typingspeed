import React, { Dispatch, useEffect, useRef, useState } from "react";
import { CiLogin } from "react-icons/ci";
import { loginUser } from "../api/authApi";
import { useMutation } from "react-query";
import { AxiosResponse } from "axios";
import { useNoticeStore } from "../store/notification-store";
import {useAuthStore} from "../store/auth-store";
import storeTokens from "../utils/storeTokens";
import Modal from "../components/common/Modal";

interface LoginModalProps {
  isLogin: boolean;
  setIsLogin: Dispatch<React.SetStateAction<boolean>>;
  setIsRegister: Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isLogin,
  setIsLogin,
  setIsRegister,
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setIsAuthenticated } = useAuthStore();
  const showNotice = useNoticeStore((state) => state.showNotice);

  const mutation = useMutation(loginUser, {
    onSuccess: (response) => {
      storeTokens(response.data.access_token, response.data.refresh_token);
      setIsAuthenticated(true);
      setIsLogin(false);
      showNotice("You successfully logged in!", "success", 5000);
      clearFields();
    },
    onError: (error: AxiosResponse) => {
      if (error.status === 422) {
        showNotice("Invalid login or password", "error", 5000);
      } else {
        showNotice("Network error", "error", 5000);
      }
    },
  });

  const clearFields = () => {
    setUsername("");
    setPassword("");
  };

  const checkFieds = () => {
    if (username.length === 0 || password.length === 0) {
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!checkFieds()) {
      showNotice("Fields can`t be empty!", "error", 5000);
      return;
    }

    mutation.mutate({ username, password });
  };

  return (
    <>
      {isLogin && (
        <Modal setCloseModal={setIsLogin} callbackOnClose={clearFields} darknessBg={true}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleLogin();
            }}
            className="modal-form flex justify-center items-center gap-3 flex-col max-w-80 max-h-80"
          >
            <div className="modal-title flex gap-1 items-center">
              <CiLogin size={32} />
              <h3 className="login-title w-full text-start">login</h3>
            </div>
            <input
              type="text"
              className="modal-field login-username w-72"
              placeholder="username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              value={username}
            />
            <input
              type="password"
              className="modal-field login-pass w-72"
              placeholder="password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
            <p>
              Dont have an account?{" "}
              <button
                className="underline hover:brightness-125"
                onClick={() => {
                  setIsLogin(false);
                  setIsRegister(true);
                }}
              >
                Register
              </button>
            </p>

            <button
              disabled={mutation.isLoading}
              className="overflow-hidden max-h-[34px] flex items-center justify-center relative w-72 bg-[--sub-accent-color]
             text-[--sub-color] py-4 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full
              before:w-1/2 before:rounded-full before:bg-[--main-color] before:top-0 before:left-1/4
               before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-[--correct-text-color]
                hover:before:animate-ping transition-all duration-300"
            >
              <button className="relative" disabled={mutation.isLoading}>
                {mutation.isLoading ? "Logging in..." : "Login"}
              </button>
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default LoginModal;
