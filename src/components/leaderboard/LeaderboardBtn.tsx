interface LeaderboardBtnProps {
  label: string;
  callback: () => void;
}

const LeaderboardBtn: React.FC<LeaderboardBtnProps> = ({ label, callback }) => {
  return (
    <button
      className="text-[--sub-color] w-[80px] h-[40px] bg-[--bg-color] brightness-90 rounded-lg hover:brightness-110 active:brightness-125 duration-150"
      onClick={callback}
    >
      {label}
    </button>
  );
};

export default LeaderboardBtn;
