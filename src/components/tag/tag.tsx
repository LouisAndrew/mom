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

type Props = {
    children: React.ReactNode;
    variant?: string;
    handleClick?: () => void;
};

type ContainerProps = StylingProps &
    PositioningProps & {
        variant?: string;
        onClick?: () => void;
    };

const Container: React.FC<ContainerProps> = styled.span<ContainerProps>`

    border-radius: 4px;

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
    }

    & > svg {
        margin-left: 4px;
    }

    @media screen and (min-width: ${theme.breakpoints[1]}) {
        & > svg { margin-left: 8px; }
    }
`;

const Tag: React.FC<Props> = ({ children, handleClick, ...rest }) => {
    return (
        <Container
            fontFamily="body"
            fontSize={[1, 1, 2, 2]}
            px={[2, 2, 3, 3]}
            py={[2]}
            bg="accent.3"
            color="dark.3"
            onClick={handleClick}
            {...rest}
        >
            {children}
        </Container>
    );
};

export { Tag };