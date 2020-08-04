import React from 'react';
import styled from 'styled-components';
import {
    flexbox,
    space,
    layout,
    grid,
    color,
    boxShadow,
    ColorProps,
    BoxShadowProps,
} from 'styled-system';

import { PositioningProps, theme } from 'styles';
import { smallShadow, bigShadow } from 'styles/theme';

type Props = PositioningProps &
    ColorProps & {
        // the actual img component. Not implemented directly into gatsby-image give
        // the flexibility to develop in storybook.
        imgComponent: React.ReactNode;
        variant?: string;
    };

type ImgWrapperProps = PositioningProps &
    ColorProps &
    BoxShadowProps & { variant?: string };

const ImgWrapper: React.FC<ImgWrapperProps> = styled.div<ImgWrapperProps>`

    img {

        border-radius: 4px;

        ${flexbox}
        ${space}
        ${layout}
        ${grid}
        ${color}
        ${boxShadow}
    }
`;

const ImgWithBorder: React.FC<Props> = ({ imgComponent, variant, ...rest }) => {
    let boxShadowVariant: string[]; // eslint-disable-line immutable/no-let, @typescript-eslint/tslint/config

    if (variant) {
        boxShadowVariant =
            variant === 'primary'
                ? ['smallAcc1', 'smallAcc1', 'bigAcc1']
                : ['smallAcc2', 'smallAcc2', 'bigAcc2'];
    } else {
        boxShadowVariant = [
            `${smallShadow} ${theme.colors.dark}`,
            `${smallShadow} ${theme.colors.dark}`,
            `${bigShadow} ${theme.colors.dark}`,
        ];
    }

    const sizes: number[] = [200, 250, 300];

    return (
        <ImgWrapper
            width={sizes}
            height={sizes}
            boxShadow={boxShadowVariant}
            {...rest}
        >
            {imgComponent}
        </ImgWrapper>
    );
};

export { ImgWithBorder };
