import React from "react";
import { HiCursorClick } from "react-icons/hi";

const BlurWarning: React.FC = () => {
  return (
    <div className="h-full w-full flex gap-3 items-center text-center text-3xl whitespace-nowrap">
      <HiCursorClick />
      Click here to focus!
    </div>
  );
};

export default BlurWarning;
