const sounds: Record<string, Record<string, HTMLAudioElement>> = {
  Alpacas: {
    main: new Audio("/typingspeed/assets/sounds/Alpacas_main_soundmp3.mp3"),
    backspace: new Audio(
      "/typingspeed/assets/sounds/Alpacas_backspace_soundmp3.mp3"
    ),
    space: new Audio("/typingspeed/assets/sounds/Alpacas_space_soundmp3.mp3"),
  },
  NovelKeysCream: {
    main: new Audio(
      "/typingspeed/assets/sounds/NovelKeysCream_main_soundmp3.mp3"
    ),
    backspace: new Audio(
      "/typingspeed/assets/sounds/NovelKeysCream_backspace_soundmp3.mp3"
    ),
    space: new Audio(
      "/typingspeed/assets/sounds/NovelKeysCream_space_soundmp3.mp3"
    ),
  },
};

export const playAudio = (key: string, soundType: string) => {
  const sound = sounds[soundType];

  if (!sound) {
    console.error(`Sound type "${soundType}" not found.`);
    return;
  }

  let audioToPlay;

  if (key === "Space") {
    audioToPlay = sound.space;
  } else if (key === "BackSpace") {
    audioToPlay = sound.backspace;
  } else {
    audioToPlay = sound.main;
  }

  audioToPlay
    .play()
    .catch((error) => console.log("Error playing audio:", error));
};
