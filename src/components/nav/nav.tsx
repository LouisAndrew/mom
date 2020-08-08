import React, { useState } from 'react';

import styled from 'styled-components';
import { layout, position, space, PositionProps } from 'styled-system';
import { Icon } from '@iconify/react';
import menuIcon from '@iconify/icons-uil/bars';
import closeIcon from '@iconify/icons-uil/multiply';

import Logo from 'components/logo';
import Links from './links';
import { OuterWrapper, PositioningProps, StylingProps, theme } from 'styles';
import Button from 'components/button';

type Props = {};

type ContainerProps = PositioningProps & PositionProps & StylingProps & {};

const Container: React.FC<ContainerProps> = styled.nav<ContainerProps>`
    ${layout}
    ${position}
    ${space}
`;

const Nav: React.FC<Props> = () => {
    const [displayMenu, setDisplayMenu] = useState(false);

    const toggleMenu = () =>
        setDisplayMenu(prevDisplayMenu => !prevDisplayMenu);

    const clickButton = () => {
        return;
    };

    return (
        <Container
            width={1}
            position={'fixed'}
            left={0}
            zIndex={2}
            css={`
                display: grid;
                place-items: center;
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
                <Links displayMenu={displayMenu} clickButton={clickButton} />
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
                    handleClick={clickButton}
                    variant="secondary"
                    width="fit-content"
                >
                    Hubungi Saya!
                </Button>
            </OuterWrapper>
        </Container>
    );
};

export { Nav };
