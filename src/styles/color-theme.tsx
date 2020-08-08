export interface ColorTheme {
    bg: string;
    light: string[];
    dark: string[];
    accent: string[];
}

export const colors: ColorTheme = {
    bg: '#F3F0F0',
    // plain white!     // lighhter shade of pink.
    light: ['#FFFFFF', '#FFECEC'],
    // font color
    dark: ['#2E282A'],
    //      green accent, pink accent, stroke-shade
    accent: ['#587B7F', '#F2D9C6', '#C3C2C2'],
};
