import { useEffect, useState } from "react";

const useKeyPressed = () => {
  const [keyPressed, setKeyPressed] = useState<string>("");

  useEffect(() => {
    const handleKeyPressed = (event: KeyboardEvent) => {
      setKeyPressed(event.key); 
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      setKeyPressed(""); 
    }
    window.addEventListener("keydown", handleKeyPressed);
    window.addEventListener("keyup", handleKeyUp);


    return () => {
      window.removeEventListener("keydown", handleKeyPressed);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return { keyPressed,setKeyPressed };
};

export default useKeyPressed;
