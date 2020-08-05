import React from 'react';
import styled from 'styled-components';
import {
    layout,
    flexbox,
    space,
    position,
    color,
    PositionProps,
    ColorProps,
} from 'styled-system';

import Img from './img';
import ImgSmall from './img-small';
import HeroForm from './hero-form';
import { PositioningProps, OuterWrapper, theme } from 'styles';

type Props = {};

type ContainerProps = PositioningProps & ColorProps & {};

type BackgroundProps = PositioningProps & PositionProps & {};

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    display: grid;
    place-items: center;

    overflow: hidden;

    ${color}
    ${space}
`;

const Background: React.FC<BackgroundProps> = styled.div<BackgroundProps>`

    ${position}
    ${flexbox}
    ${space}
    ${layout}

    /* add media query for smaller devices */

    #img-hero-small {
        display: block;

        position: relative;

        height: 145px;
        width: 322px;

        transform: scale(1.15)
    }

    #img-hero {
        display: none;
    }

    @media screen and (max-width: 400px) and (max-height: 640px) {

        #img-hero-small {
            display: block;

            position: absolute;
            transform: scale(0.8);
            bottom: 0;
            left: -8%;
        }
    }

    @media screen and (min-width: ${theme.breakpoints[1]}) {
        #img-hero-small {
            display: none;
        }

        #img-hero {
            display: block;

            position: absolute;
            width: 1308px;
            height: 487px;

            transform: scale(0.6);
            bottom: 0;
            left: -32%;
        }
    }

    @media screen and (min-width: ${theme.breakpoints[2]}) {

        #img-hero {
            position: relative;

            left: 0;
            bottom: 10%;
            transform: scale(1.1);
        }
    }
`;

const Hero: React.FC<Props> = () => {
    const mockheadingText = 'Siapa bilang cari rumah jaman sekarang susah?';
    const mockBodyText =
        'Cari rumah idamanmu sekarang! Cukup cantumkan kriteria mu, tanpa ribet';
    const mockAllLocations: string[] = ['PIK', 'Muara Karang', 'BSD'];

    const submitForm = (
        location: string,
        area: number,
        type: 'buy' | 'rent' | ''
    ) => {
        // naivgate to search page
        console.log({ location, area, type });
        return;
    };

    return (
        <>
            <Container bg="bg" pt={[0, 0, '10%']}>
                <OuterWrapper
                    position="relative"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection={[
                        'column-reverse',
                        'column-reverse',
                        'column',
                    ]}
                    height={['100vh', '80vh', '100vh']}
                    css={`
                        @media screen and (max-width: 400px) and (max-height: 640px) {
                            height: 120vh;
                        }
                    `}
                >
                    <HeroForm
                        headingText={mockheadingText}
                        bodyText={mockBodyText}
                        allLocations={mockAllLocations}
                        submitForm={submitForm}
                    />
                    <Background
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        overflowX="visible"
                        height={['30%', '0', '50%']}
                        zIndex={1}
                        css={`
                            @media screen and (max-width: 400px) and (max-height: 640px) {
                                height: 0;
                            }
                        `}
                    >
                        <Img className="img" id="img-hero" />
                        <ImgSmall className="img" id="img-hero-small" />
                    </Background>
                </OuterWrapper>
            </Container>
        </>
    );
};

export { Hero };
