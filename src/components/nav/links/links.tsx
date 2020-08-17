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
import waIcon from '@iconify/icons-uil/whatsapp';

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
    isActive?: boolean;
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

    // check current location and add active class name its corresponding link elemeent.
    const checkIfActive = (pathname: string): boolean => {
        // check if window object is available -> SSR
        if (typeof window !== 'undefined') {
            return location && location.pathname === pathname;
        } else {
            return false;
        }
    };

    return (
        <Container
            display="flex"
            flexDirection={['column', 'column', 'row']}
            alignItems="flex-start"
            alignSelf={'flex-start'}
            flexGrow={1}
            position={['absolute', 'absolute', 'relative']}
            top={0}
            //               theme.breakpoints[0] / 2 in pixels.
            left={['-2.6%', `calc((100vw - 640px) / -2)`, '32px']}
            width={['100vw', '100vw', 'auto']}
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
            <LinkItem
                isActive={checkIfActive('/')}
                to="/"
                px={[4, 5, 3]}
                py={[2, 2, 3]}
                mt={[7, 7, 0]}
            >
                <InlineIcon icon={homeIcon} />
                Home
            </LinkItem>
            <LinkItem
                to="/products"
                isActive={checkIfActive('/products')}
                px={[4, 5, 3]}
                py={[2, 2, 3]}
                position="relative"
                top={0}
                left={0}
                zIndex={1}
                dropdownElement={<Dropdown expand={expand} />}
                expand={expand}
                onMouseEnter={() => setExpand(true)}
                onMouseLeave={() => setExpand(false)}
            >
                <InlineIcon icon={shoppingBagIcon} />
                Katalog
                <span
                    role="button"
                    tabIndex={0}
                    // comparing browser width with the tablet breakpoint from theme.
                    onKeyDown={() => {
                        if (
                            window &&
                            window.innerWidth <
                                parseInt(
                                    theme.breakpoints[1].substr(0, 2),
                                    10
                                ) *
                                    16
                        ) {
                            setExpand(prev => !prev);
                        }
                    }}
                    onClick={() => {
                        if (
                            window &&
                            window.innerWidth <
                                parseInt(
                                    theme.breakpoints[1].substr(0, 2),
                                    10
                                ) *
                                    16
                        ) {
                            setExpand(prev => !prev);
                        }
                    }}
                >
                    <InlineIcon icon={expandIcon} id="expand-svg" />
                </span>
            </LinkItem>
            <Button
                handleClick={clickButton}
                variant="primary-outer"
                mx={[4, 5]}
                my={[2]}
                mb={3}
                display={['block', 'block', 'none']}
                css={`
                    & > svg {
                        transform: scale(1.2) !important;
                    }
                `}
            >
                <InlineIcon icon={waIcon} color={theme.colors.accent[1]} />
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
    isActive,
    onMouseEnter,
    onMouseLeave,
    ...rest
}) => (
    <SLinkItem
        fontFamily="body"
        fontWeight="heading"
        fontSize={[1, 2]}
        css={`
            --highlight-color: ${theme.colors.accent[1]};

            a {
                text-decoration: none;
                color: ${theme.colors.bg};

                transisiton: 0.2s;

                /* Inspiration from hackernoon link copmonent. https://hackernoon.com/ */
                &:hover,
                &.active {
                    background-image: linear-gradient(
                        transparent 0%,
                        transparent calc(50% - 9px),
                        var(--highlight-color) calc(50% - 9px),
                        var(--highlight-color) 100%
                    );

                    background-size: 100% 250%;
                }
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
        <Link className={isActive ? 'active' : ''} to={to}>
            {children}
        </Link>
        {dropdownElement}
    </SLinkItem>
);

export { Links };
