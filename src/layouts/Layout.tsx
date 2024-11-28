import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import { useTransition, animated } from "react-spring";
import NoticeList from "../components/common/NoticeList";
import { useAuthCheck } from "../hooks/useCheckAuth";
import Spinner from "../components/common/Spinner";

const Layout: React.FC = () => {
  const location = useLocation();
  const { isLoading } = useAuthCheck();

  const transitions = useTransition(location, {
    from: { opacity: 0, transform: "translateY(20px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
  });

  return (
    <div className="min-h-screen bg-[--bg-color]">
      {isLoading && <Spinner />}
      <>
        <Header />
        <main>
          <NoticeList />
          {transitions((style, item) => (
            <animated.div style={style} key={item.key}>
              <Outlet />
            </animated.div>
          ))}
        </main>
      </>
      )
    </div>
  );
};

export default Layout;
