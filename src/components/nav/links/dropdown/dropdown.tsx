import React from 'react';
// import link from gatsby is not possible -> it breaks storybook
import { Link } from '@reach/router';

import styled from 'styled-components';
import {
    space,
    typography,
    layout,
    flexbox,
    color,
    position,
    opacity,
    PositionProps,
    OpacityProps,
} from 'styled-system';

import HouseSvg from './assets/house';
import HomeOfficeSvg from './assets/home-office';
import KavlingSvg from './assets/kavling';
import ApartmentSvg from './assets/apartment';
import { PositioningProps, StylingProps, theme } from 'styles';

type Props = {
    expand: boolean;
};

type ContainerProps = PositioningProps &
    StylingProps &
    PositionProps &
    OpacityProps & {};

type ImgContainerProps = PositionProps & PositioningProps & {};

type LinksContainerProps = PositioningProps & {};

type SLinkProps = StylingProps &
    PositioningProps & {
        id: string;
        onMouseEnter: () => void;
        onMouseLeave: () => void;
    };

/**
 * type to map the dropdown item's properties.
 */
type DropdownItem = {
    textContent: string;
    id: string;
    to: string;
    imgContent: React.ReactNode;
};

const LinksContainer: React.FC<LinksContainerProps> = styled.ul<
    LinksContainerProps
>`
    ${layout}
    ${space}
`;

const SLink: React.FC<SLinkProps> = styled.li<SLinkProps>`

    ${space}
    ${typography}
    ${color}
`;

const ImgContainer: React.FC<ImgContainerProps> = styled.div<ImgContainerProps>`

    ${layout}
    ${flexbox}
    ${space}
    ${position}

    svg {
        transition: .2s;
        opacity: 0;

        position: absolute;
        left: 0;

        &.active {
            opacity: 1;
        }
    }
`;

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    ${space}
    ${layout}
    ${color}
    ${position}
    ${opacity}
`;

const Dropdown: React.FC<Props> = ({ expand }) => {
    const dropdownItems: DropdownItem[] = [
        {
            textContent: 'Rumah',
            id: 'house',
            to: '/products?prop=house',
            imgContent: <HouseSvg id="house-svg" />,
        },
        {
            textContent: 'Apartment',
            id: 'apartment',
            to: '/products?prop=apartment',
            imgContent: <ApartmentSvg id="apartment-svg" />,
        },
        {
            textContent: 'Kavling',
            id: 'kavling',
            to: '/products?prop=kavling',
            imgContent: <KavlingSvg id="kavling-svg" />,
        },
        {
            textContent: 'Ruko',
            id: 'home-office',
            to: '/products?prop=home-office',
            imgContent: <HomeOfficeSvg id="home-office-svg" />,
        },
    ];
    const imgDisplayClassName = 'active';

    // Dynamically add class name to img (svg) element everytime user hovers on a text content
    const toggleImgDisplay = (id: string, show: boolean) => {
        const el: HTMLElement | null = document.getElementById(`${id}-svg`);
        if (el) {
            el.classList.toggle(imgDisplayClassName, show);
        }
    };

    return (
        <Container
            position={['relative', 'relative', 'absolute']}
            top={0}
            left={0}
            zIndex={-1}
            overflow="hidden"
            display="flex"
            px={expand ? [4, 4, 5] : 0}
            pt={expand ? [2, 3, 7] : 0}
            pb={expand ? [2, 3, 6] : 0}
            width={expand ? [1, 1, 'fit-content'] : [1, 1, 0]}
            height={
                expand ? ['fit-content', 'fit-content', 'auto'] : [0, 0, 'auto']
            }
            opacity={[1, 1, expand ? 1 : 0]}
            // maxHeight={expand ? 'auto' : 0}
            bg="dark.0"
            css={`
                transition: 0.2s;
            `}
        >
            <LinksContainer display="block">
                {dropdownItems.map(item => (
                    <SLink
                        key={item.id}
                        id={item.id}
                        onMouseEnter={() => toggleImgDisplay(item.id, true)}
                        onMouseLeave={() => toggleImgDisplay(item.id, false)}
                        my={[2, 2, 3]}
                        pr={[0, 0, 6]}
                        fontFamily="body"
                        fontWeight="bold" // ternary -> based on active. TODO
                        fontSize={[1, 2, 2]}
                        color="bg"
                        css={`
                            a {
                                color: ${theme.colors.bg} !important;
                                text-decoration: none;
                            }
                        `}
                    >
                        <Link to={item.to}>{item.textContent}</Link>
                    </SLink>
                ))}
            </LinksContainer>
            <ImgContainer
                position="relative"
                display="flex"
                alignItems="center"
                width={[0, 0, '220px']}
                css={`
                    svg {
                        display: none;

                        @media screen and (min-width: ${theme.breakpoints[1]}) {
                            & {
                                display: block;
                            }
                        }
                    }
                `}
            >
                {dropdownItems.map(item => item.imgContent)}
            </ImgContainer>
        </Container>
    );
};

export { Dropdown };
