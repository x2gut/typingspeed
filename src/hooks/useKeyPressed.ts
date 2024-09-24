import { useEffect, useState } from "react";

const useKeyPressed = () => {
  const [keyPressed, setKeyPressed] = useState<string>("");

  useEffect(() => {
    const handleKeyPressed = (event: KeyboardEvent) => {
      setKeyPressed(event.key); 
    };

    window.addEventListener("keydown", handleKeyPressed);

    return () => {
      window.removeEventListener("keydown", handleKeyPressed);
    };
  }, []);

  return { keyPressed,setKeyPressed };
};

export default useKeyPressed;
