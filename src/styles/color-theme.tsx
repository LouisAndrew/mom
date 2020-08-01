export interface ColorTheme {
    bg: string;
    light: string[];
    dark: string[];
    accent: string[];
}

export const colors: ColorTheme = {
    bg: '#F3F0F0',
    // plain white!
    light: ['#FFFFFF'],
    // font color
    dark: ['#2E282A'],
    //      green accent, pink accent
    accent: ['#2EC4B6', '#FF7477'],
};
