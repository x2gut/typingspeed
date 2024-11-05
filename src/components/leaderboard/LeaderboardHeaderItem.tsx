interface LeaderboardItemProps {
  label: string;
  icon: React.ReactNode;
}

const LeaderboardHeaderItem: React.FC<LeaderboardItemProps> = ({ label, icon }) => {
  return (
    <li className="text-xl text-[--text-color] w-full max-w-[350px] flex items-center gap-1">
      {icon}
      {label}
    </li>
  );
};

export default LeaderboardHeaderItem;
