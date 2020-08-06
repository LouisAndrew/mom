import { colors, ColorTheme } from './color-theme';

export interface Theme {
    breakpoints: string[];
    sizes: string[];
    fontSizes: number[];
    space: number[];
    fonts: {
        body: string;
        heading: string;
        monospace: string;
    };
    fontWeights: {
        body: number;
        heading: number;
        bold: number;
        extraBold: number;
        regular: number;
    };
    lineHeights: {
        body: number;
        heading: number;
    };
    shadows: {
        blend: string;
        blendLarge: string;
        bigAcc1: string;
        bigAcc2: string;
        smallAcc1: string;
        smallAcc2: string;
    };
    // customize if needed.
    colors: ColorTheme;
}

export const bigShadow = `20px 20px 0`;
export const smallShadow = `10px 10px 0`;

const theme: Theme = {
    // use breakpoints in ems under the assumption that 1em = 16px.
    // usage of breakpoints here is mobile-first, meaning: <Button width={[1, 1/2, 1/4, 1/8]} />
    // width of the button on 64em and larger is 12.5%, width on screen size 52em and larger is 25%, and so on.
    //            640px,   832px   1024px
    breakpoints: ['40em', '52em', '64em'],

    // for layout! an array of strings...
    sizes: [],

    // all spacing units here are defined in number: using pixels.
    //          0,  1,  2,  3,  4,  5,  6,  7
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
    //      0, 1, 2, 3,  4,  5,  6,  7,  8,    9
    space: [0, 4, 8, 16, 24, 32, 48, 64, 128, 256],
    // customize accordingly with google fonts!
    fonts: {
        body: 'Raleway, sans-serif',
        heading: 'Monstseraat, sans-serif',
        monospace: 'Menlo, monospace',
    },
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 600,
        extraBold: 800,
        regular: 500,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.25,
    },
    shadows: {
        // used often in cards-like components.
        blend: '1px 2px 2px rgba(0, 0, 0, .15)',
        blendLarge: '2px 4px 4px rgba(0, 0, 0, .15)',
        // used often in product images!
        bigAcc1: `${bigShadow} ${colors.accent[0]}`,
        bigAcc2: `${bigShadow} ${colors.accent[1]}`,
        smallAcc1: `${smallShadow} ${colors.accent[0]}`,
        smallAcc2: `${smallShadow} ${colors.accent[1]}`,
    },

    colors,
};

export default theme;
