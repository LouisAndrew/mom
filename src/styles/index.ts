// import { useContext } from "react";
// import { ThemeContext, DefaultTheme } from "styled-components";
// import media from "use-media";

import {
    ColorProps,
    TypographyProps,
    FlexboxProps,
    SpaceProps,
    LayoutProps,
} from 'styled-system';

import theme, { Theme } from './theme';
import 'modern-css-reset/dist/reset.min.css';

export { H1, H2, H3, H5, P } from './global-elements';
export { theme, Theme };
export { GlobalStyles } from './global-styles';

export interface PositioningProps
    extends FlexboxProps,
        SpaceProps,
        LayoutProps {}

export interface StylingProps extends ColorProps, TypographyProps {}

// type DefaultThemeObject = Omit<typeof themeObject, "screens"> & {
//   screens: {
//     [key: string]: number;
//   };
// };

// const theme = (): DefaultTheme => {
//   const { screens, ...themeValues }: DefaultThemeObject = themeObject;
//   const breakpointSizes = Object.keys(screens).reduce((accum, key: string) => {
//     const value = media({ maxWidth: screens[key] });
//     return {
//       ...accum,
//       [key]: value,
//     };
//   }, {});
//   return {
//     ...themeValues,
//     screens: breakpointSizes,
//   };
// };

// const useTheme = () => useContext(ThemeContext);

// What is use-media?
