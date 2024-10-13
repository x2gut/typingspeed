import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import { useTransition, animated } from "react-spring";

const Layout: React.FC = () => {
  const location = useLocation();

  const transitions = useTransition(location, {
    from: { opacity: 0, transform: "translateY(20px)"},
    enter: {opacity: 1, transform: "translateX(0)"},
  })
  

  return (
    <div className="min-h-screen bg-[--bg-color]">
      <Header />
      <main>
        {transitions((style, item) => (
          <animated.div style={style}>
            <Outlet />
          </animated.div>
        ))}
      </main>
    </div>
  );
};

export default Layout;
