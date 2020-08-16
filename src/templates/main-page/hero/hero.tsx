import React from 'react';
import Img, { FluidObject } from 'gatsby-image';
import { useNavigate } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';
import { throttle } from 'lodash';

import styled, { AnyStyledComponent } from 'styled-components';
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

type Props = {
    heroImgFluid?: FluidObject;
};

type ContainerProps = PositioningProps &
    ColorProps &
    PositionProps & {
        className?: string;
    };

type BackgroundProps = PositioningProps & PositionProps & {};

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    display: grid;
    place-items: center;

    overflow: hidden;

    @supports not (place-items: center) {
        align-items: center;
        justify-items: center;
    }

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

const Hero: React.FC<Props> = ({ heroImgFluid }) => {
    const mockheadingText = 'Siapa bilang cari rumah jaman sekarang susah?';
    const mockBodyText =
        'Cari rumah idamanmu sekarang! Cukup cantumkan kriteria mu, tanpa ribet';

    const navigate = useNavigate();
    const data: any = useStaticQuery(graphql`
        query {
            allSanityLocation {
                edges {
                    node {
                        locationName
                    }
                }
            }
        }
    `);

    const allLocations: string[] = data.allSanityLocation.edges.map(
        (edge: AnyStyledComponent) => edge.node.locationName as string
    );

    // navigate(`/products?prop=${propertyType}`);

    const submitForm = (
        location: string,
        area: number,
        type: 'buy' | 'rent' | ''
    ) => {
        // naivgate to search page
        // bug here: reach router won't navigate directly to the url,
        // but instead redirecting to /products/?
        const params = `loc=${location}&area=${area}&sale=${type}`;
        throttle(navigate)(`/products/?${params}`, {
            replace: true,
        });
    };

    return (
        <>
            <Container
                bg="bg"
                pt={0}
                position="relative"
                zIndex={1}
                minHeight={['100vh', '80vh', '100vh']}
                className="top"
                css={`
                    @media screen and (max-width: 768px) and (min-height: 568px) {
                        &.top {
                            padding-top: 0 !important;
                            top: -3vh;
                        }
                    }
                `}
            >
                <Background
                    position="absolute"
                    top={0}
                    left={0}
                    overflowX="visible"
                    height={['100%']}
                    width={1}
                    zIndex={2}
                    css={`
                        --border-radius: 16px;

                        #hero-img {
                            /* basic positionuing styling */
                            position: absolute;
                            overflow: hidden;

                            height: 30%;
                            width: 100%;

                            bottom: 0;

                            img {
                                transform: translateY(-35%);
                            }

                            @media screen and (min-width: ${theme.breakpoints[1]}) {
                                height: 45%;

                                /* .gatsby-image-wrapper {
                                    box-shadow: 60px 120px 0
                                        ${theme.colors.accent[1]};
                                } */

                                img {
                                    transform: translate(20%, -50%);
                                }
                            }

                            @media screen and (min-width: ${theme.breakpoints[2]}) {
                                /* height: 100%; */
                                width: 100%;

                                max-width: 700px;

                                left: auto;
                                right: 15vw;

                                bottom: 8%;

                                img {
                                    transform: translate(-2vw, -30%);
                                }

                                @media screen and (min-width: 1440px) {
                                    right: 25vw;
                                }
                            }
                        }

                        
                    `}
                >
                    {/* <Img className="img" id="img-hero" />
                        <ImgSmall className="img" id="img-hero-small" /> */}
                    <div id="hero-img">
                        {heroImgFluid ? (
                            <Img fluid={heroImgFluid} alt="hero-img" />
                        ) : (
                            <img
                                src="https://res.cloudinary.com/dsvdffre0/image/upload/v1596883624/sonnie-hiles-L0BaowhFe4c-unsplash_jwo8ie.jpg"
                                alt="img"
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                }}
                            />
                        )}
                    </div>

                    <div id="bg-shade" />
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
                        allLocations={allLocations}
                        submitForm={submitForm}
                    />
                </OuterWrapper>
            </Container>
        </>
    );
};

export { Hero };
