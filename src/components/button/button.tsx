import React from 'react';
import styled from 'styled-components';
import {
    color,
    typography,
    flexbox,
    space,
    layout,
    variant as btnVariant,
    grid,
} from 'styled-system';

import { PositioningProps, StylingProps } from 'styles';

type SProps = PositioningProps &
    StylingProps & {
        variant?: string;
        onClick: () => void;
    };

const SButton: React.FC<SProps> = styled.button<SProps>`

    background: none;
    border: none;
    outline: none;
    border-radius: 4px;

    transition: .2s;
    white-space: nowrap;

    ${btnVariant({
        variants: {
            primary: {
                bg: 'accent.1',
                color: 'dark.0',
            },
            secondary: {
                bg: 'accent.0',
                color: 'bg',
            },
            'primary-outer': {
                bg: 'rgba(0, 0, 0, 0)',
                color: 'accent.1',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: 'accent.1',
                '&:hover': {
                    bg: 'accent.1',
                    color: 'dark.0',
                },
            },
            'secondary-outer': {
                bg: 'rgba(0, 0, 0, 0)',
                color: 'accent.0',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: 'accent.0',
                '&:hover': {
                    bg: 'accent.0',
                    color: 'bg',
                },
            },
        },
    })} 

    ${color}
    ${typography}
    ${flexbox}
    ${space}
    ${layout}
    ${grid}

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

type Props = PositioningProps & {
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
            py={[2]}
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
