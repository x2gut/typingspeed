import {create} from "zustand";
import { Notice } from "../types/types";

interface NoticeStore {
  notices: Notice[];
  showNotice: (message: string, type?: "success" | "error" | "info", duration?: number) => void;
  dismissNotice: (id: number) => void;
}

export const useNoticeStore = create<NoticeStore>((set, get) => ({
  notices: [],
  
  showNotice: (message: string, type = "info", duration = 5000) => {
    const { notices } = get();
    
    if (notices.some((notice) => notice.message === message)) return;
    
    const id = Math.random();
    const newNotice = { message, type, id, duration };
    
    set((state) => ({ notices: [...state.notices, newNotice] }));    
  },
  
  dismissNotice: (id) => {
    set((state) => ({
      notices: state.notices.filter((notice) => notice.id !== id)
    }));
  }
}));
