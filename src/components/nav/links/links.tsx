import React, { useState } from 'react';
import { Link } from '@reach/router';

import styled from 'styled-components';
import {
    typography,
    color,
    space,
    layout,
    flexbox,
    position,
    PositionProps,
} from 'styled-system';
import { InlineIcon } from '@iconify/react';
import homeIcon from '@iconify/icons-uil/home';
import shoppingBagIcon from '@iconify/icons-uil/shopping-bag';
import expandIcon from '@iconify/icons-uil/angle-down';

// TODO: create dropdown component

import { PositioningProps, StylingProps, theme } from 'styles';
import Dropdown from './dropdown';
import Button from 'components/button';

type Props = PositionProps & {
    displayMenu: boolean;
    clickButton: () => void;
};

type LinkItemProps = SLinkItemProps & {
    children: React.ReactNode;
    to: string;
    dropdownElement?: React.ReactNode;
    expand?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
};

type ContainerProps = PositioningProps & StylingProps & PositionProps & {};

type SLinkItemProps = StylingProps &
    PositioningProps &
    PositionProps & {
        onMouseEnter?: () => void;
        onMouseLeave?: () => void;
    };

const Container: React.FC<ContainerProps> = styled.ul<ContainerProps>`
    ${layout}
    ${flexbox}
    ${color}
    ${space}
    ${position}
`;

const SLinkItem: React.FC<SLinkItemProps> = styled.li<SLinkItemProps>`
    ${typography}
    ${space}
    ${position}
`;

const Links: React.FC<Props> = ({ displayMenu, clickButton }) => {
    const [expand, setExpand] = useState(false);

    return (
        <Container
            display="flex"
            flexDirection={['column', 'column', 'row']}
            alignItems="flex-start"
            alignSelf={'flex-start'}
            flexGrow={1}
            position={['absolute', 'absolute', 'relative']}
            top={0}
            left={[0, 0, '32px']}
            width={[1, 1, 'auto']}
            zIndex={[-1, -1, 2]}
            overflow={['hidden', 'hidden', 'visible']}
            bg={['dark.0', 'dark.0', 'rgba(0, 0, 0, 0)']}
            height={[
                displayMenu ? 'fit-content' : 0,
                displayMenu ? 'fit-content' : 0,
                'fit-content',
            ]}
            css={`
                transition: height 0.2s;
            `}
        >
            <LinkItem to="/" px={[4, 5, 3]} py={[2, 2, 3]} mt={[7, 7, 0]}>
                <InlineIcon icon={homeIcon} />
                Home
            </LinkItem>
            <LinkItem
                to="/"
                px={[4, 5, 3]}
                py={[2, 2, 3]}
                position="relative"
                top={0}
                left={0}
                zIndex={1}
                dropdownElement={<Dropdown expand={expand} />}
                expand={expand}
                onMouseEnter={() => setExpand(prevExpand => !prevExpand)}
                onMouseLeave={() => setExpand(prevExpand => !prevExpand)}
            >
                <InlineIcon icon={shoppingBagIcon} />
                Katalog
                <InlineIcon icon={expandIcon} id="expand-svg" />
            </LinkItem>
            <Button
                handleClick={clickButton}
                variant="primary"
                mx={[4, 5]}
                my={[2]}
                mb={3}
                display={['block', 'block', 'none']}
            >
                Hubungi Saya!
            </Button>
        </Container>
    );
};

const LinkItem: React.FC<LinkItemProps> = ({
    children,
    to,
    dropdownElement,
    expand,
    onMouseEnter,
    onMouseLeave,
    ...rest
}) => (
    <SLinkItem
        fontFamily="body"
        fontWeight="heading"
        fontSize={[1, 2]}
        css={`
            a {
                text-decoration: none;
                color: ${theme.colors.bg};
            }

            svg {
                transition: 0.2s;

                &:first-child {
                    margin-right: 4px;
                }

                /* means is a last-child, but not a first child */
                &#expand-svg {
                    margin-left: 4px;
                    ${expand &&
                        `
                        transform: rotate(180deg) !important;
                    `}
                }
            }

            @media screen and (min-width: ${theme.breakpoints[1]}) {
                a {
                    color: ${expand ? theme.colors.bg : theme.colors.dark[0]};
                }

                svg {
                    &:first-child {
                        margin-right: 8px;
                    }

                    &#expand-svg {
                        margin-left: 8px;
                    }
                }
            }
        `}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...rest}
    >
        <Link to={to}>{children}</Link>
        {dropdownElement}
    </SLinkItem>
);

export { Links };