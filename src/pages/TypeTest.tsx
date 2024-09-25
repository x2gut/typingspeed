import React, { useState } from "react";
import DisplayWords from "../components/diplayWords/DisplayWords";
import Header from "../components/Header";
import TypeSettingsMenu from "../components/diplayWords/TypeSettingsMenu";
import { TypeSettingsProvider } from "../contexts/TypeSettingsContext";
import { ThemeProvider } from "../contexts/ThemeProvider";
import FooterCommands from "../components/diplayWords/FooterCommands";
import ThemesSidebar from "../components/ThemesSidebar";
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
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TypeSettingsProvider>
      <ThemeProvider>
        <div className="page-content min-h-screen">
          <div className="container">
            <Header/>
            <TypeSettingsMenu className={isFocused ? "focus" : ""} />
            <ThemesSidebar className={isFocused ? "focus" : ""} />
            <div className="display-words flex items-center flex-col my-36">
              <DisplayWords wordsList={words} setIsFocused={setIsFocused} />
            </div>
            <FooterCommands className={isFocused ? "focus" : ""} />
          </div>
        </div>
      </ThemeProvider>
    </TypeSettingsProvider>
  );
};

export default TypeTest;
