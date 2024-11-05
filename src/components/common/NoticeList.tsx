import React from "react";
import { useNoticeStore } from "../../store/notification-store";
import NoticeComponent from "./Notice";

const NoticeList: React.FC = () => {
  const { notices, dismissNotice } = useNoticeStore();

  return (
    <div className="flex flex-col gap-5 fixed top-[20px] right-[15px] z-[500]">
      {notices.map((notice) => (
        <NoticeComponent
          key={notice.id}
          message={notice.message}
          noticeType={notice.type}
          duration={notice.duration}
          onDismiss={() => dismissNotice(notice.id)}
        />
      ))}
    </div>
  );
};

export default NoticeList;
