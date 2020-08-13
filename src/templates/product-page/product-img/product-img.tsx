import React, { useState, useEffect } from 'react';
import Img, { FixedObject, FluidObject } from 'gatsby-image';

import styled from 'styled-components';
import { layout, flexbox, position, space, PositionProps } from 'styled-system';

import { PositioningProps } from 'styles';

type ContainerProps = PositioningProps & {};

type ImgBoxProps = PositioningProps & PositionProps & {};

type FlexboxProps = PositioningProps & PositionProps;

type BoxProps = FlexboxProps & {
    role: string;
    tabIndex: number;
    onKeyDown: () => void;
    onClick: () => void;
};

const ImgBox: React.FC<ImgBoxProps> = styled.div<ImgBoxProps>`
    ${layout}
    ${position}
`;

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    ${layout}
`;

const Flexbox: React.FC<FlexboxProps> = styled.div<FlexboxProps>`
    ${layout}
    ${flexbox}
    ${space}
`;

const Box: React.FC<BoxProps> = styled.div<BoxProps>`
    ${layout}
    ${flexbox}
    ${position}
    ${space}
`;

export type ImgObject = {
    image: string | FluidObject | FluidObject[] | FixedObject | FixedObject[];
    imgAlt: string;
};

type Props = {
    imgs: ImgObject[];
};

const ProductImg: React.FC<Props> = ({ imgs }) => {
    const noImgDefault: ImgObject = {
        image:
            'https://res.cloudinary.com/dsvdffre0/image/upload/v1597323293/sarah-kilian-52jRtc2S_VE-unsplash_rgrekp.jpg',
        imgAlt: 'Image not found',
    };

    const [activeImg, setActiveImg] = useState<ImgObject>(noImgDefault);

    useEffect(() => {
        if (imgs.length > 0) {
            setActiveImg(imgs[0]);
        }
    }, []);

    return (
        <Container width={['fit-content']} maxWidth={[270, 330, 450]}>
            <ImgBox
                // height={['50%']}
                width={[270, 330, 450]}
                height={[180, 222, 300]}
                overflow="hidden"
                position="relative"
                css={`
                    & > img {
                        height: 100%;
                        width: 100%;

                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                `}
            >
                {typeof activeImg.image === 'string' ? (
                    <img
                        src={activeImg.image}
                        alt={activeImg.imgAlt}
                        data-testid="main"
                    />
                ) : (
                    <Img
                        fixed={activeImg.image as FixedObject | FixedObject[]}
                        fluid={activeImg.image as FluidObject | FluidObject[]}
                        alt={activeImg.imgAlt}
                    />
                )}
            </ImgBox>
            <Flexbox
                py={[3]}
                display="flex"
                flexWrap="wrap"
                justifyContent={['center']}
            >
                {imgs.length > 0 &&
                    imgs.map((imgObj: ImgObject, i: number) => (
                        <Box
                            height={[40, 40, 60]}
                            width={[60, 60, 90]}
                            mx={[1, 1, 2]}
                            my={[1, 1, 2]}
                            position="relative"
                            key={`${imgObj.imgAlt}-selector`}
                            role="button"
                            onClick={() => {
                                setActiveImg(imgObj);
                            }}
                            onKeyDown={() => {
                                setActiveImg(imgObj);
                            }}
                            tabIndex={i - imgs.length}
                            css={`
                                transition: 0.2s;

                                & > img {
                                    height: 100%;
                                    width: 100%;

                                    display: absolute;
                                    left: 0;
                                    top: 0;
                                }

                                &:hover {
                                    cursor: pointer;
                                    filter: brightness(0.8);
                                }
                            `}
                        >
                            <img
                                src={
                                    typeof imgObj.image === 'string'
                                        ? imgObj.image
                                        : Array.isArray(imgObj.image)
                                        ? imgObj.image[0].src
                                        : imgObj.image.src
                                }
                                alt={imgObj.imgAlt}
                            />
                        </Box>
                    ))}
            </Flexbox>
        </Container>
    );
};

export { ProductImg };
