import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Modal from "../components/common/Modal";
import { useNoticeStore } from "../store/notification-store";
import { useAuthStore } from "../store/auth-store";
import { useMutation } from "react-query";
import { changeEmail } from "../api/emailApi";
import { AxiosError } from "axios";
import { useAuthCheck } from "../hooks/useCheckAuth";

interface UpdateEmailModalProps {
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

const UpdateEmailModal: React.FC<UpdateEmailModalProps> = ({
  setIsModalActive,
}) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const { showNotice } = useNoticeStore();
  const { userId } = useAuthStore();

  const changeEmailMutation = useMutation(changeEmail, {
    onError: (error: AxiosError) => {
      if (error.status === 409) {
        showNotice("This email is already registered", "error");
      } else {
        showNotice("Unexpected error occurred", "error");
      }
    },
    onSuccess: () => {
      showNotice("Email updated", "success");
      setPassword("")
      setEmail("")
      setConfirmEmail("")
      setIsModalActive(false)
    },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (email !== confirmEmail) {
      showNotice("Emails does`nt match", "error");
      return;
    }
    if (email.length === 0) {
      showNotice("Fields can`t be empty", "error");
      return;
    }
    changeEmailMutation.mutate({userId, password, email});
  };

  return (
    <Modal
      setCloseModal={setIsModalActive}
      className="mt-[-70px]"
      darknessBg={true}
    >
      <div className="py-5 px-16 bg-[--bg-color] rounded-lg">
        <form
          action=""
          className="flex flex-col gap-5 w-full min-w-[250px]"
          onSubmit={handleSubmit}
        >
          <h4 className="text-xl text-[--sub-color]">Update email</h4>
          <div className="w-full flex flex-col gap-3">
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="password"
              className="p-1 w-full rounded-md bg-[--sub-accent-color] outline-[--sub-color] text-[--text-correct-color] placeholder-[--text-correct-color] placeholder-opacity-40"
            />
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="email"
              className="p-1 w-full rounded-md bg-[--sub-accent-color] outline-[--sub-color] text-[--text-correct-color] placeholder-[--text-correct-color] placeholder-opacity-40"
            />
            <input
              value={confirmEmail}
              onChange={(event) => setConfirmEmail(event.target.value)}
              type="email"
              placeholder="confirm email"
              className="p-1 w-full rounded-md bg-[--sub-accent-color] outline-[--sub-color] text-[--text-correct-color] placeholder-[--text-correct-color] placeholder-opacity-40"
            />
          </div>
          <button className="text-[--text-correct-color] bg-[--sub-accent-color] p-1 rounded-lg hover:bg-[--text-correct-color] hover:text-[--sub-accent-color] duration-200">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateEmailModal;