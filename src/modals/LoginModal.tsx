import React, { Dispatch, useEffect, useRef, useState } from "react";
import { CiLogin } from "react-icons/ci";
import loginUser from "../api/loginApi";
import { useAuth } from "../contexts/authContext";
import { useNotice } from "../contexts/NoticeContext";
import { useMutation } from "react-query";

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
  const { setIsAuthenticated } = useAuth();
  const { showNotice } = useNotice();
  const modalRef = useRef<HTMLFormElement>(null);

  const mutation = useMutation(loginUser, {
    onSuccess: () => {
      setIsAuthenticated(true);
      setIsLogin(false);
      showNotice("You successfully logged in!", "success", 5000);
      clearFields();
    },
    onError: (error: { status: number; error: string }) => {
      showNotice(error.error, "error", 5000);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsLogin(false);
        clearFields();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isLogin && (
        <div className="modal w-full h-full fixed left-0 top-0 flex items-center justify-center">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleLogin();
            }}
            className="modal-form flex justify-center items-center gap-3 flex-col max-w-80 max-h-80"
            ref={modalRef}
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
        </div>
      )}
    </>
  );
};

export default LoginModal;
