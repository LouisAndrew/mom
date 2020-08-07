import React from 'react';
import styled from 'styled-components';
import {
    space,
    color,
    typography,
    layout,
    flexbox,
    variant as tagVariant,
} from 'styled-system';

import { StylingProps, PositioningProps, theme } from 'styles';

type Props = PositioningProps & {
    children: React.ReactNode;
    tabIndex?: number;
    variant?: string;
    handleClick?: () => void;
};

type ContainerProps = StylingProps &
    PositioningProps & {
        role: string;
        variant?: string;
        tabIndex: number;
        onClick?: () => void;
        onKeyDown?: () => void;
    };

const Container: React.FC<ContainerProps> = styled.span<ContainerProps>`

    border-radius: 4px;
    transition: .2s;

    ${tagVariant({
        variants: {
            primary: {
                bg: 'accent.1',
                color: 'bg',
            },
            secondary: {
                bg: 'accent.0',
                color: 'bg',
            },
        },
    })}

    ${space}
    ${color}
    ${typography}
    ${layout}
    ${flexbox}

    &:hover {
        cursor: pointer;
        filter: brightness(.9);
    }

    & > svg {
        margin-left: 4px;
    }

    @media screen and (min-width: ${theme.breakpoints[1]}) {
        & > svg { margin-left: 8px; }
    }
`;

const Tag: React.FC<Props> = ({ children, tabIndex, handleClick, ...rest }) => {
    return (
        <Container
            fontFamily="body"
            fontSize={[1, 1, 2, 2]}
            px={[2, 2, 3, 3]}
            py={[2]}
            bg="accent.3"
            color="dark.3"
            onClick={handleClick}
            onKeyDown={handleClick}
            tabIndex={tabIndex ? tabIndex : 1}
            role="button"
            {...rest}
        >
            {children}
        </Container>
    );
};

export { Tag };
