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
    };
    lineHeights: {
        body: number;
        heading: number;
    };
    shadows: {
        small: string;
        large: string;
    };
    // customize if needed.
    colors: ColorTheme;
}

const theme: Theme = {
    // use breakpoints in ems under the assumption that 1em = 16px.
    // usage of breakpoints here is mobile-first, meaning: <Button width={[1, 1/2, 1/4, 1/8]} />
    // width of the button on 64em and larger is 12.5%, width on screen size 52em and larger is 25%, and so on.
    breakpoints: ['40em', '52em', '64em'],

    // for layout! an array of strings...
    sizes: [],

    // all spacing units here are defined in number: using pixels.
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
    space: [0, 4, 8, 16, 24, 32, 48, 64, 128, 256],
    // customize accordingly with google fonts!
    fonts: {
        body: 'Raleway, sans-serif',
        heading: 'Poppins, sans-serif',
        monospace: 'Menlo, monospace',
    },
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 600,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.25,
    },
    shadows: {
        small: '0 0 4px rgba(0, 0, 0, .125)',
        large: '0 0 24px rgba(0, 0, 0, .125)',
    },

    colors,
};

export default theme;
