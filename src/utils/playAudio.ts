const sounds: Record<string, Record<string, HTMLAudioElement[]>> = {
  Alpacas: {
    main: Array.from({ length: 2 }, () => new Audio("/typingspeed/assets/sounds/Alpacas_main_soundmp3.mp3")),
    backspace: Array.from({ length: 2 }, () => new Audio("/typingspeed/assets/sounds/Alpacas_backspace_soundmp3.mp3")),
    space: Array.from({ length: 2 }, () => new Audio("/typingspeed/assets/sounds/Alpacas_space_soundmp3.mp3")),
  },
  NovelKeysCream: {
    main: Array.from({ length: 2 }, () => new Audio("/typingspeed/assets/sounds/NovelKeysCream_main_soundmp3.mp3")),
    backspace: Array.from({ length: 2 }, () => new Audio("/typingspeed/assets/sounds/NovelKeysCream_backspace_soundmp3.mp3")),
    space: Array.from({ length: 2 }, () => new Audio("/typingspeed/assets/sounds/NovelKeysCream_space_soundmp3.mp3")),
  },
};

const soundIndex: Record<string, Record<string, number>> = {
  Alpacas: { main: 0, backspace: 0, space: 0 },
  NovelKeysCream: { main: 0, backspace: 0, space: 0 },
};

export const playAudio = (key: string, soundType: string) => {
  const soundPool = sounds[soundType];
  if (!soundPool) {
    console.error(`Sound type "${soundType}" not found.`);
    return;
  }

  let audioArray: HTMLAudioElement[];
  let audioType: string;

  if (key === "Space") {
    audioArray = soundPool.space;
    audioType = "space";
  } else if (key === "BackSpace") {
    audioArray = soundPool.backspace;
    audioType = "backspace";
  } else {
    audioArray = soundPool.main;
    audioType = "main";
  }

  const index = soundIndex[soundType][audioType];
  const audioToPlay = audioArray[index];
  soundIndex[soundType][audioType] = (index + 1) % audioArray.length;

  audioToPlay.currentTime = 0; 
  audioToPlay.play().catch((error) => console.log("Error playing audio:", error));
};
