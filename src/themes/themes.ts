interface Theme {
  [key: string]: string;
}

type Themes = {
  [key: string]: Theme;
};

export const themes: Themes = {
  base: {
    "--bg-color": "#171717",
    "--main-color": "#facc15",
    "--sub-color": "#cbd5e1",
    "--sub-accent-color": "#64748b",
    "--text-color": "#52525b",
    "--mistake-color": "#e11d48",
    "--text-correct-color": "#e4e4e7",
  },
  matcha: {
    "--bg-color": "#44624a",
    "--main-color": "#ffffff",
    "--sub-color": "#8ba888",
    "--sub-accent-color": "#c0cfb2",
    "--text-color": "#f2ded0",
    "--mistake-color": "#d99b77",
    "--text-correct-color": "#ffffff",
  },
  light: {
    "--bg-color": "#fafafa",
    "--main-color": "#484b6a",
    "--sub-color": "#9394a5",
    "--sub-accent-color": "#e4e5f1",
    "--text-color": "#9394a5",
    "--mistake-color": "#ff9354",
    "--text-correct-color": "#9093d6",
  },
  coffee: {
    "--bg-color": "#f5efe6",
    "--main-color": "#d7b89a",
    "--sub-color": "#b89a7a",
    "--sub-accent-color": "#8b6d56",
    "--text-color": "#8b6d56",
    "--mistake-color": "#d9534f",
    "--text-correct-color": "#4b3a2f",
  },
  forest: {
    '--bg-color': "#122a22",       
    '--main-color': "#1b4033",     
    '--sub-color': "#4a6b59",     
    '--sub-accent-color': "#5e3d2b",
    '--text-color': "#d0cfc4",
    '--mistake-color': "#b34338",   
    '--text-correct-color': "#5e3d2b"
},
  space: {
    "--bg-color": "#0a0f29",
    "--main-color": "#152043",
    "--sub-color": "#3b4d71",
    "--sub-accent-color": "#6b7280",
    "--text-color": "#ffffff",
    "--mistake-color": "#e63946",
    "--text-correct-color": "#b8c1ec",
  },
  dark: {
    "--bg-color": "#111",
    "--main-color": "#eee",
    "--sub-color": "#444",
    "--sub-accent-color": "#191919",
    "--text-color": "#444",
    "--mistake-color": "#ff4c4c",
    "--text-correct-color": "#eee",
  },
  volcanic: {
    "--bg-color": "#1c1c1c",
    "--main-color": "#2e2e2e",
    "--sub-color": "#5a3326",
    "--sub-accent-color": "#ff4500",
    "--text-color": "#e6e6e6",
    "--mistake-color": "#ff2400",
    "--text-correct-color": "#ffa07a",
  },
  ice: {
    "--bg-color": "#e0f7fa",
    "--main-color": "#b2ebf2",
    "--sub-color": "#80deea",
    "--sub-accent-color": "#4fc3f7",
    "--text-color": "#1c1c1c",
    "--mistake-color": "#ff4081",
    "--text-correct-color": "#4fc3f7",
  },
  matrix: {
    "--bg-color": "#000000",
    "--main-color": "#003300",
    "--sub-color": "#004d00",
    "--sub-accent-color": "#006500",
    "--text-color": "#006500",
    "--mistake-color": "#ff4d4d",
    "--text-correct-color": "#33ff00",
  },
  halloween: {
    "--bg-color": "#1a1a1a",
    "--main-color": "#333333",
    "--sub-color": "#ff6600",
    "--sub-accent-color": "#cc33ff",
    "--text-color": "#f2f2f2",
    "--mistake-color": "#ff3300",
    "--text-correct-color": "#66ff66",
  },
  dragon: {
    "--bg-color": "#1a0d0a",
    "--main-color": "#4b1e17",
    "--sub-color": "#b33a12",
    "--sub-accent-color": "#e1a458",
    "--text-color": "#e1a458",
    "--mistake-color": "#ff4d4d",
    "--text-correct-color": "#b33a12",
  },
  barbie: {
    "--bg-color": "#ffccd4",
    "--main-color": "#ff5aa7",
    "--sub-color": "#ff5aa7",
    "--sub-accent-color": "#ffffff",
    "--text-color": "#ffffff",
    "--mistake-color": "#b71c1c",
    "--text-correct-color": "#ff5aa7",
  },
  waves: {
    "--bg-color": "#023e8a",
    "--main-color": "#3a86ff",
    "--sub-color": "#0096c7",
    "--sub-accent-color": "#caf0f8",
    "--text-color": "#ade8f4",
    "--mistake-color": "#e76f51",
    "--text-correct-color": "#0077b6",
  },
  softgirl: {
    "--bg-color": "#b8c0ff",
    "--main-color": "#3a86ff",
    "--sub-color": "#cddafd",
    "--sub-accent-color": "#1e6091",
    "--text-color": "#7d8597",
    "--mistake-color": "#e76f51",
    "--text-correct-color": "#0077b6",
  },
  neon: {
    "--bg-color": "#000000",
    "--main-color": "#c58aff",
    "--sub-color": "#972fff",
    "--sub-accent-color": "#1e001e",
    "--text-color": "#ebd7ff",
    "--mistake-color": "#da3333",
    "--text-correct-color": "#972fff",
  },
  nightowl: {
   "--bg-color": "#011627",
    "--main-color": "#82aaff",
    "--sub-color": "#41e0b6",
    "--sub-accent-color": "#2a2a2a",
    "--text-color": "#d6deeb",
    "--mistake-color": "#ff6f61",
    "--text-correct-color": "#41e0b6",
  },
  catpuccin: {
      "--bg-color": "#221c35",
      "--main-color": "#f67599",
      "--sub-color": "#5a3a7e",
      "--sub-accent-color": "#2f2346",
      "--text-color": "#5a3a7e",
      "--mistake-color": "#efc050",
      "--text-correct-color": "#ffe3eb"
  }
};
