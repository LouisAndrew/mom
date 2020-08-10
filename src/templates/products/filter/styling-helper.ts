export const labelFontStyles: {
    fontFamily: string;
    fontSize: number[];
    fontWeight: string;
} = {
    fontFamily: 'body',
    fontSize: [1, 1, 2],
    fontWeight: 'regular',
};

// overwrites the regular filter variant on input.
export const horizontalFormStyles: {
    color: string[];
    bg: string[];
} = {
    color: ['bg'],
    bg: ['dark.0'],
};

const inputWidth = (
    numOfLetters: number,
    fontSize: number,
    padding: number
): number => 2 * padding + numOfLetters * fontSize;

export const calculateAreaFormWidth = (numOfLetters: number): number[] => {
    // pr={[2, 2, 3]} -> default input x paddings.
    // fontSize={[1, 1, 2, 2]} -> default input fontSizes..

    const inputXPadding = [8, 8, 16]; // in pixels.
    const inputFontSize = [14, 14, 16];

    return inputXPadding.map((padding, i) =>
        inputWidth(numOfLetters, inputFontSize[i], padding)
    );
};

export const labelTypographyStyles: string[] = ['bg'];

export const inputElementSpacingProps: {
    mt: number[] | string[];
    mb: number[] | string[];
} = {
    mb: [2],
    mt: [1],
};

// i 4 -1
// -1 -3 5
// 5 19 -18
