import React from 'react';
// import { Link } from 'gatsby';
// import { Link } from 'gatsby-link';
import { Link } from '@reach/router';

import styled from 'styled-components';
import { space, typography, layout, flexbox } from 'styled-system';

import HouseSvg from './assets/house';
import HomeOfficeSvg from './assets/home-office';
import KavlingSvg from './assets/kavling';
import ApartmentSvg from './assets/apartment';
import { PositioningProps, StylingProps } from 'styles';
// import Links from '../links';

type Props = {};

type ContainerProps = PositioningProps & {
    items: DropdownItem[];
};

type ImgContainerProps = {
    items: DropdownItem[];
};

type LinksContainerProps = {};

type SLinkProps = {
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
>``;

const SLink: React.FC<SLinkProps> = styled.li<SLinkProps>``;

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    ${space}
    ${typography}
    ${layout}
    ${flexbox}
`;

const ImgContainer: React.FC<ImgContainerProps> = styled.div<ImgContainerProps>`
    svg {
        opacity: 0;

        &.active {
            opacity: 1;
        }
    }
`;

const Dropdown: React.FC<Props> = () => {
    const dropdownItems: DropdownItem[] = [
        {
            textContent: 'Rumah',
            id: 'house',
            to: '/',
            imgContent: <HouseSvg id="house-svg" />,
        },
        {
            textContent: 'Apartment',
            id: 'apartment',
            to: '/',
            imgContent: <ApartmentSvg id="apartment-svg" />,
        },
        {
            textContent: 'Kavling',
            id: 'kavling',
            to: '/',
            imgContent: <KavlingSvg id="kavling-svg" />,
        },
        {
            textContent: 'Ruko',
            id: 'home-office',
            to: '/',
            imgContent: <HomeOfficeSvg id="home-office-svg" />,
        },
    ];
    const imgDisplayClassName = 'active';

    const displayImg = (id: string) => {
        const el: HTMLElement | null = document.getElementById(`${id}-svg`);
        if (el && !el.classList.contains(imgDisplayClassName)) {
            el.classList.toggle(imgDisplayClassName);
        }
    };
    const removeImg = (id: string) => {
        const el: HTMLElement | null = document.getElementById(`${id}-svg`);
        if (el && el.classList.contains(imgDisplayClassName)) {
            el.classList.toggle(imgDisplayClassName);
        }
    };

    return (
        <Container display="flex" items={dropdownItems}>
            <LinksContainer>
                {dropdownItems.map(item => (
                    <SLink
                        key={item.id}
                        id={item.id}
                        onMouseEnter={() => displayImg(item.id)}
                        onMouseLeave={() => removeImg(item.id)}
                    >
                        <Link to={item.to}>{item.textContent}</Link>
                    </SLink>
                ))}
            </LinksContainer>
            <ImgContainer items={dropdownItems}>
                {dropdownItems.map(item => item.imgContent)}
            </ImgContainer>
        </Container>
    );
};

export { Dropdown };
