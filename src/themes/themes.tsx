interface Theme {
    [key: string]: string; 
}

type Themes = {
    [key: string]: Theme;
};

export const themes: Themes = {
    BASE: {
        '--bg-color': "#171717",
        '--main-color': "#facc15",
        '--sub-color': "#cbd5e1",
        '--sub-accent-color': "#64748b",
        '--text-color': "#52525b",
        '--mistake-color': "#e11d48",
        '--text-correct-color': "#e4e4e7",
    },
    MATCHA: {
        '--bg-color': "#44624a",
        '--main-color': "#ffffff",
        '--sub-color': "#8ba888",
        '--sub-accent-color': "#c0cfb2",
        '--text-color': "#f2ded0",
        '--mistake-color': "#d99b77",
        '--text-correct-color': "#ffffff",
    },
    LIGHT: {
        '--bg-color': "#fafafa",
        '--main-color': "#484b6a",
        '--sub-color': "#9394a5",
        '--sub-accent-color': "#e4e5f1",
        '--text-color': "#9394a5",
        '--mistake-color': "#ff9354",
        '--text-correct-color': "#9093d6",
    },
};