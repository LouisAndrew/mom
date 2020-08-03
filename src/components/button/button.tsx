import React from 'react';
import styled from 'styled-components';
import {
    color,
    typography,
    flexbox,
    space,
    layout,
    variant as btnVariant,
    ColorProps,
    TypographyProps,
    FlexboxProps,
    SpaceProps,
    LayoutProps,
} from 'styled-system';

type SProps = ColorProps &
    TypographyProps &
    FlexboxProps &
    SpaceProps &
    LayoutProps &
    React.HTMLProps<HTMLButtonElement> & {
        variant?: string;
    };

const SButton: React.FC<SProps> = styled.button`

    ${btnVariant({
        variants: {
            primary: {
                bg: 'accent.1',
                color: 'bg',
            },
            secondary: {
                bg: 'accent.2',
                color: 'dark.0',
            },
        },
    })} 

    ${color}
    ${typography}
    ${flexbox}
    ${space}
    ${layout}
`;

type Props = {
    children?: React.ReactNode;
    variant?: string;
    color?: string;
    bg?: string;
    handleClick: () => void;
};

const Button: React.FC<Props> = ({ children, handleClick, ...rest }) => {
    return (
        <SButton onClick={handleClick} {...rest}>
            {children}
        </SButton>
    );
};

export { Button };
