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

import HeroForm from './hero-form';
import { PositioningProps, OuterWrapper, theme } from 'styles';

type Props = {};

type ContainerProps = PositioningProps & ColorProps & PositionProps & {};

type BackgroundProps = PositioningProps & PositionProps & {};

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    display: grid;
    place-items: center;

    overflow: hidden;

    ${color}
    ${space}
    ${position}
`;

const Background: React.FC<BackgroundProps> = styled.div<BackgroundProps>`

    ${position}
    ${flexbox}
    ${space}
    ${layout}
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
            <Container
                bg="bg"
                pt={0}
                position="relative"
                zIndex={1}
                minHeight={['100vh', '80vh', '100vh']}
            >
                <Background
                    position="absolute"
                    top={0}
                    left={0}
                    // display="flex"
                    // alignItems={['flex-start', 'flex-start', 'flex-end']}
                    // justifyContent={['flex-start', 'flex-start', 'flex-end']}
                    overflowX="visible"
                    height={['100%']}
                    width={1}
                    zIndex={2}
                    css={`
                        --border-radius: 16px;

                        #hero-img {
                            position: absolute;
                            width: 100%;
                            bottom: -15%;
                            left: 0;

                            border-top-left-radius: calc(
                                4 * var(--border-radius)
                            );
                        }

                        @media screen and (min-width: ${theme.breakpoints[1]}) {
                            #hero-img {
                                height: 60%;
                                width: auto;

                                left: auto;
                                right: 0;

                                z-index: 2;
                                border-top-left-radius: 0;
                            }

                            &:after {
                                content: '';
                                position: absolute;
                                z-index: 1;

                                height: 40%;
                                width: 50%;

                                bottom: 8%;
                                right: 10%;

                                background-color: ${theme.colors.accent[1]};

                                border-top-right-radius: var(--border-radius);
                                border-bottom-left-radius: var(--border-radius);
                            }
                        }

                        @media screen and (min-width: ${theme.breakpoints[2]}) {
                            #hero-img {
                                height: 100%;
                                top: -15%;
                                right: -10%;
                                border-bottom-left-radius: var(--border-radius);
                            }

                            &:after {
                                height: 80%;
                                width: 40%;
                                max-width: 500px;

                                right: 5%;
                                top: 10%;

                                border-top-right-radius: 0;
                                border-top-left-radius: calc(
                                    var(--border-radius) / 2
                                );
                                border-bottom-right-radius: calc(
                                    var(--border-radius) / 2
                                );
                            }
                        }

                        @media screen and (min-width: 1440px) {
                            #hero-img {
                                right: -5%;
                            }
                        }
                    `}
                >
                    {/* <Img className="img" id="img-hero" />
                        <ImgSmall className="img" id="img-hero-small" /> */}
                    <img
                        src="https://res.cloudinary.com/dsvdffre0/image/upload/v1596883624/sonnie-hiles-L0BaowhFe4c-unsplash_jwo8ie.jpg"
                        alt="img"
                        id="hero-img"
                    />
                </Background>
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
                    minHeight={['100vh', '80vh', '100vh']}
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
                </OuterWrapper>
            </Container>
        </>
    );
};

export { Hero };
