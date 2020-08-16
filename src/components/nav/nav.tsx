import React, { useState } from 'react';

import styled from 'styled-components';
import { layout, position, space, color, PositionProps } from 'styled-system';
import { Icon, InlineIcon } from '@iconify/react';
import menuIcon from '@iconify/icons-uil/bars';
import closeIcon from '@iconify/icons-uil/multiply';
import waIcon from '@iconify/icons-uil/whatsapp';

import Logo from 'components/logo';
import Links from './links';
import { OuterWrapper, PositioningProps, StylingProps, theme } from 'styles';
import Button from 'components/button';
import { contact } from 'helper/consts';

type Props = {};

type ContainerProps = PositioningProps & PositionProps & StylingProps & {};

const Container: React.FC<ContainerProps> = styled.nav<ContainerProps>`
    ${layout}
    ${position}
    ${space}
    ${color}
`;

const Nav: React.FC<Props> = () => {
    const [displayMenu, setDisplayMenu] = useState(false);

    const toggleMenu = () =>
        setDisplayMenu(prevDisplayMenu => !prevDisplayMenu);

    return (
        <Container
            bg={[
                // displayMenu ? 'dark.0' : 'bg',
                // displayMenu ? 'dark.0' : 'bg',
                'bg',
            ]}
            width={1}
            position={'fixed'}
            left={0}
            zIndex={3}
            css={`
                display: grid;
                place-items: center;

                @supports not (place-items: center) {
                    align-items: center;
                    justify-items: center;
                }
            `}
        >
            <OuterWrapper
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                position="relative"
                width={1}
                py={[3]}
                px={[3]}
                css={`
                    border-bottom: 1px solid
                        ${displayMenu
                            ? 'rgba(0, 0, 0, 0)'
                            : theme.colors.accent[2]};
                    #logo {
                        transition: 0.2s;
                        height: 32px;
                        width: 96px;

                        path {
                            fill: ${displayMenu
                                ? theme.colors.bg
                                : theme.colors.dark[0]};
                        }
                    }

                    #menu {
                        transition: 0.2s;
                        height: 24px;
                        width: 24px;
                        transform: translateY(20%) !important;
                    }

                    @media screen and (min-width: ${theme.breakpoints[1]}) {
                        #menu {
                            display: none;
                        }
                    }
                `}
            >
                <Logo id="logo" />
                <Links displayMenu={displayMenu} clickButton={contact} />
                <span
                    onClick={toggleMenu}
                    onKeyDown={toggleMenu}
                    role="button"
                    tabIndex={0}
                >
                    <Icon
                        icon={displayMenu ? closeIcon : menuIcon}
                        color={
                            displayMenu ? theme.colors.bg : theme.colors.dark[0]
                        }
                        id="menu"
                    />
                </span>
                <Button
                    display={['none', 'none', 'block']}
                    handleClick={contact}
                    variant="primary"
                    width="fit-content"
                    css={`
                        & > svg {
                            transform: scale(1.2) !important;
                        }
                    `}
                >
                    <InlineIcon icon={waIcon} />
                    Hubungi Saya!
                </Button>
            </OuterWrapper>
        </Container>
    );
};

export { Nav };
