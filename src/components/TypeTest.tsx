import React, { useState } from "react";
import DisplayWords from "./DisplayWords";
import Header from "./Header";
import TypeSettingsMenu from "./TypeSettingsMenu";
import { TypeSettingsProvider } from "../contexts/TypeSettingsContext";
import { ThemeProvider } from "../contexts/ThemeProvider";
import FooterCommands from "./FooterCommands";
import ThemesSidebar from "./ThemesSidebar";
const TypeTest: React.FC = () => {
  const words: string[] = [
    "apple",
    "banana",
    "grape",
    "peach",
    "plum",
    "berry",
    "lemon",
    "melon",
    "mango",
    "orange",
    "pearl",
    "rose",
    "star",
    "moon",
    "sun",
    "cloud",
    "rain",
    "wind",
    "snow",
    "leaf",
    "tree",
    "bush",
    "grass",
    "sand",
    "rock",
    "bird",
    "fish",
    "frog",
    "bear",
    "lion",
    "cat",
    "dog",
    "rat",
    "fox",
    "wolf",
    "cow",
    "horse",
    "duck",
    "goat",
    "sheep",
    "man",
    "woman",
    "girl",
    "boy",
    "child",
    "baby",
    "house",
    "home",
    "car",
    "bus",
    "train",
    "plane",
    "bike",
    "boat",
    "ship",
    "lake",
    "river",
    "sea",
    "park",
    "zoo",
    "shop",
    "store",
    "book",
    "pen",
    "pencil",
    "desk",
    "chair",
    "table",
    "bed",
    "room",
    "floor",
    "wall",
    "door",
    "window",
    "lamp",
    "phone",
    "music",
    "game",
    "toy",
    "ball",
    "cake",
    "cookie",
    "bread",
    "milk",
    "egg",
    "juice",
    "rice",
    "meat",
    "fish",
    "tea",
    "salt",
    "sugar",
    "butter",
    "cheese",
    "pizza",
    "pasta",
    "salad",
    "soup",
    "sandwich",
    "fruit",
    "vegetable",
    "spoon",
    "fork",
    "knife",
    "plate",
    "cup",
    "bowl",
    "napkin",
    "fork",
    "spoon",
  ];
  const [isGameStarted, setIsGameStarted] = useState(false);

  return (
    <TypeSettingsProvider>
      <ThemeProvider>
      <div className="page-content min-h-screen">
        <div className="ml-auto mr-auto max-w-7xl w-full min-h-screen">
          <Header className={isGameStarted ? "focus" : ""}/>
          <TypeSettingsMenu className={isGameStarted ? "focus" : ""}/>
          <ThemesSidebar className={isGameStarted ? "focus" : ""}/>
          <div className="display-words w-full h-full flex justify-center items-center flex-col my-52">
            <DisplayWords wordsList={words} setIsGameStarted={setIsGameStarted}/>
          </div>
          <FooterCommands className={isGameStarted ? "focus" : ""}/>
        </div>
      </div>
      </ThemeProvider>
    </TypeSettingsProvider>
  );
};

export default TypeTest;
