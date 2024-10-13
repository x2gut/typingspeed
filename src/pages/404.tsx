import { useEffect } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const NotFound404 = () => {

    useEffect(()=>{
        document.title = "404 Not Found"
    },[])

  return (
    <div className="min-w-screen h-full w-full bg-[--bg-color] flex justify-center items-center absolute left-1/2 top-72 -translate-x-1/2 -translate-y-1/2">
      <div className="message flex items-center flex-col">
        <h2 className="text-[120px] pb-5 text-[--main-color]">404</h2>
        <p className="text-xl text-[--text-correct-color] pb-10">
          Looks like this is not a valid page...
        </p>
        <Link to={"/"} className="relative rounded-lg flex h-[50px] w-40 items-center justify-center overflow-hidden bg-[--sub-color] text-[--sub-accent-color] transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-[--main-color] before:duration-500 before:ease-out hover:before:h-56 hover:before:w-56">
          <IoHomeSharp className="mr-3 z-10"/>
          <span className="relative z-10">Back to home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound404;
