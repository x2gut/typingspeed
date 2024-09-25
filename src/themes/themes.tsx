interface Theme {
  [key: string]: string;
}

type Themes = {
  [key: string]: Theme;
};

export const themes: Themes = {
  BASE: {
    "--bg-color": "#171717",
    "--main-color": "#facc15",
    "--sub-color": "#cbd5e1",
    "--sub-accent-color": "#64748b",
    "--text-color": "#52525b",
    "--mistake-color": "#e11d48",
    "--text-correct-color": "#e4e4e7",
  },
  MATCHA: {
    "--bg-color": "#44624a",
    "--main-color": "#ffffff",
    "--sub-color": "#8ba888",
    "--sub-accent-color": "#c0cfb2",
    "--text-color": "#f2ded0",
    "--mistake-color": "#d99b77",
    "--text-correct-color": "#ffffff",
  },
  LIGHT: {
    "--bg-color": "#fafafa",
    "--main-color": "#484b6a",
    "--sub-color": "#9394a5",
    "--sub-accent-color": "#e4e5f1",
    "--text-color": "#9394a5",
    "--mistake-color": "#ff9354",
    "--text-correct-color": "#9093d6",
  },
  COFFEE: {
    "--bg-color": "#f5efe6",
    "--main-color": "#d7b89a",
    "--sub-color": "#b89a7a",
    "--sub-accent-color": "#8b6d56",
    "--text-color": "#8b6d56",
    "--mistake-color": "#d9534f",
    "--text-correct-color": "#4b3a2f",
  },
  FOREST: {
    '--bg-color': "#122a22",        /* Очень тёмно-зелёный фон, как густая лесная тень */
    '--main-color': "#1b4033",      /* Основной цвет - глубокий тёмно-зелёный */
    '--sub-color': "#4a6b59",       /* Дополнительный цвет - более светлый зелёный с сероватым оттенком */
    '--sub-accent-color': "#5e3d2b", /* Акцентный цвет - тёмно-древесно-коричневый */
    '--text-color': "#d0cfc4",      /* Цвет текста - светлый, слегка теплый */
    '--mistake-color': "#b34338",   /* Цвет ошибки - глубокий красный */
    '--text-correct-color': "#5e3d2b" /* Цвет корректного текста - тёмный бежево-коричневый */
},
  SPACE: {
    "--bg-color": "#0a0f29",
    "--main-color": "#152043",
    "--sub-color": "#3b4d71",
    "--sub-accent-color": "#6b7280",
    "--text-color": "#ffffff",
    "--mistake-color": "#e63946",
    "--text-correct-color": "#b8c1ec",
  },
  DARK: {
    "--bg-color": "#0d0d0d",
    "--main-color": "#1a1a1a",
    "--sub-color": "#333333",
    "--sub-accent-color": "#4f4f4f",
    "--text-color": "#b3b3b3",
    "--mistake-color": "#ff4c4c",
    "--text-correct-color": "#5ac18e",
  },
  VOLCANIC: {
    "--bg-color": "#1c1c1c",
    "--main-color": "#2e2e2e",
    "--sub-color": "#5a3326",
    "--sub-accent-color": "#ff4500",
    "--text-color": "#e6e6e6",
    "--mistake-color": "#ff2400",
    "--text-correct-color": "#ffa07a",
  },
  ICE: {
    "--bg-color": "#e0f7fa",
    "--main-color": "#b2ebf2",
    "--sub-color": "#80deea",
    "--sub-accent-color": "#4fc3f7",
    "--text-color": "#1c1c1c",
    "--mistake-color": "#ff4081",
    "--text-correct-color": "#4fc3f7",
  },
  MATRIX: {
    "--bg-color": "#000000",
    "--main-color": "#003300",
    "--sub-color": "#004d00",
    "--sub-accent-color": "#006500",
    "--text-color": "#006500",
    "--mistake-color": "#ff4d4d",
    "--text-correct-color": "#33ff00",
  },
  HALLOWEEN: {
    "--bg-color": "#1a1a1a",
    "--main-color": "#333333",
    "--sub-color": "#ff6600",
    "--sub-accent-color": "#cc33ff",
    "--text-color": "#f2f2f2",
    "--mistake-color": "#ff3300",
    "--text-correct-color": "#66ff66",
  },
  DRAGON: {
    "--bg-color": "#1a0d0a",
    "--main-color": "#4b1e17",
    "--sub-color": "#b33a12",
    "--sub-accent-color": "#e1a458",
    "--text-color": "#e1a458",
    "--mistake-color": "#ff4d4d",
    "--text-correct-color": "#b33a12",
  },
  BARBIE: {
    "--bg-color": "#ffccd4",
    "--main-color": "#ff5aa7",
    "--sub-color": "#ff5aa7",
    "--sub-accent-color": "#ffffff",
    "--text-color": "#ffffff",
    "--mistake-color": "#b71c1c",
    "--text-correct-color": "#ff5aa7",
  },
};
