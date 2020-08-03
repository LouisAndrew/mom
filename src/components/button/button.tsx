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

    background: none;
    border: none;
    outline: none;
    border-radius: 4px;

    transition: .2s;

    ${btnVariant({
        variants: {
            primary: {
                bg: 'accent.1',
                color: 'bg',
            },
            secondary: {
                bg: 'accent.0',
                color: 'dark.0',
            },
        },
    })} 

    ${color}
    ${typography}
    ${flexbox}
    ${space}
    ${layout}

    &:hover {
        cursor: pointer;
    }

    &:active {
        transform: scale(.95);
    } 

    & > svg {
        margin-right: 8px;
    }
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
        <SButton
            onClick={handleClick}
            px={[2, 2, 3, 3]}
            py={[1, 1, 2, 2]}
            fontSize={[1, 1, 2, 2]}
            fontFamily="body"
            fontWeight="bold"
            {...rest}
        >
            {children}
        </SButton>
    );
};

export { Button };
