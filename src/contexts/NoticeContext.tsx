import React, { createContext, useContext, useState, ReactNode } from "react";
import NoticeComponent from "../components/common/Notice";

interface Notice {
  message: string;
  type?: "success" | "error" | "info";
  id: number;
  duration?: number;
}

interface NoticeContextProps {
  showNotice: (
    message: string,
    noticeType?: "success" | "error" | "info",
    duration?: number
  ) => void;
}

const NoticeContext = createContext<NoticeContextProps | undefined>(undefined);

export const NoticeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notices, setNotices] = useState<Notice[] | null>(null);

  const showNotice = (
    message: string,
    type: "success" | "error" | "info" = "info",
    duration = 5000
  ) => {
    const currentNotices = notices || [];

    if (currentNotices.some((notice) => notice.message === message)) {
      return;
    }

    const id = Math.random();
    const newNotice = { message, type, id, duration };
    setNotices((prevData) => [...(prevData || []), newNotice]);

  };

  const handleDismiss = (id: number) => {
    setNotices(
      (prevNotices) => prevNotices?.filter((notice) => notice.id !== id) || []
    );
  };

  return (
    <NoticeContext.Provider value={{ showNotice }}>
      {children}
      <div className="flex flex-col gap-5 fixed top-[20px] right-[15px] z-[500]">
        {notices?.map((notice) => (
          <NoticeComponent
            key={notice.id}
            message={notice.message}
            noticeType={notice.type}
            duration={notice.duration}
            onDismiss={() => handleDismiss(notice.id)}
          />
        ))}
      </div>
    </NoticeContext.Provider>
  );
};

export const useNotice = (): NoticeContextProps => {
  const context = useContext(NoticeContext);

  if (!context) {
    throw new Error("useNotice must be used within a NoticeProvider");
  }

  return context;
};
