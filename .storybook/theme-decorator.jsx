import React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme, GlobalStyles } from '../src/styles';
import useGoogleFonts from '../src/hooks/useGoogleFonts';

const ThemeDecorator = storyFn => {
    useGoogleFonts();

    return (
        <>
            <GlobalStyles />
            <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
        </>
    );
};

export default ThemeDecorator;
