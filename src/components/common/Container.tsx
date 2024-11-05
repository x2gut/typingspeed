interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="w-full max-w-[1540px] mx-auto p-3">{children}</div>;
};

export default Container;
