import React from 'react';
import Img, { FluidObject } from 'gatsby-image';

import styled from 'styled-components';
import {
    layout,
    position,
    space,
    color,
    flexbox,
    borderRadius,
    PositionProps,
    BorderRadiusProps,
} from 'styled-system';

import { H3, P, PositioningProps, StylingProps, theme } from 'styles';
import Input from 'components/input';
import { Label } from 'templates/main-page/hero/hero-form/hero-form';
import Button from 'components/button';

type Props = {
    // provides fluid img for gatsby!
    imgFluidSrc?: FluidObject | FluidObject[];
};

type ContainerProps = PositioningProps & PositionProps & BorderRadiusProps & {};

type BackgroundProps = PositioningProps & PositionProps & {};

type ModalProps = StylingProps & PositioningProps & {};

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    ${layout}
    ${position}
    ${flexbox}
    ${space}
    ${borderRadius}

`;

const Background: React.FC<BackgroundProps> = styled.div<BackgroundProps>`
    ${layout}
    ${position}
`;

const Modal: React.FC<ModalProps> = styled.div<ModalProps>`
    ${space}
    ${color}
    ${layout}
    ${flexbox}
`;

const MailingList: React.FC<Props> = ({ imgFluidSrc }) => {
    const headingText = 'Tertarik untuk?';
    const bodyText = 'Daftar ke mailing list kammiiii?';

    // custom img uploaded to cloudinary to proide dev in storybook
    const imgSourceCloudinary =
        'https://res.cloudinary.com/dsvdffre0/image/upload/v1596797190/jarek-ceborski-jn7uVeCdf6U-unsplash_n7xbxx.jpg';
    const altImg = 'aesthetic interior';

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event);
        return;
    };

    const handleClick = () => {
        return;
    };

    return (
        <Container
            display="flex"
            alignItems={['center', 'center', 'flex-end']}
            justifyContent={['center', 'center', 'flex-start']}
            position="relative"
            overflow="hidden"
            height={[375, 375, 450]}
            width={[1, 1, 1, 945]}
            p={[0, 0, 6]}
            borderRadius={[0, 0, 4]}
        >
            <Background
                position="absolute"
                top={0}
                left={0}
                zIndex={-1}
                css={`
                    & > img {
                        height: 375px;
                        width: 464px;
                        overflow: hidden;

                        @media screen and (min-width: ${theme.breakpoints[0]}) {
                            width: 100%;
                        }

                        @media screen and (min-width: ${theme.breakpoints[1]}) {
                            height: 450px;
                            width: 945px;
                        }
                    }
                `}
            >
                {imgFluidSrc ? (
                    <Img fluid={imgFluidSrc} alt={altImg} />
                ) : (
                    <img src={imgSourceCloudinary} alt={altImg} />
                )}
            </Background>
            <Modal
                width={['80vw', '80vw', '560px']}
                height={'fit-content'}
                display="flex"
                flexDirection={['column', 'column', 'row']}
                alignItems={['center', 'center', 'flex-start']}
                flexWrap={['nowrap', 'nowrap', 'wrap']}
                py={[3]}
                px={[3]}
                color="bg"
                bg={`rgba(0, 0, 0, 0.4)`}
                css={`
                    border-radius: 4px;
                `}
            >
                <H3
                    my={[1]}
                    textAlign={['center', 'center', 'left']}
                    width={['fit-content', 'fit-content', 1]}
                >
                    {headingText}
                </H3>
                <P
                    my={[1]}
                    textAlign={['center', 'center', 'left']}
                    width={['fit-content', 'fit-content', 1]}
                >
                    {bodyText}
                </P>
                <Label
                    // gridRow={['3 / span 1']}
                    for="mailing-list"
                    mt={[2]}
                    mb={[4]}
                    fontFamily="body"
                    fontWeight="bold"
                    fontSize={[1, 1, 2]}
                    textAlign={['center', 'center', 'left']}
                    width={[1, 1, 0.5]}
                >
                    Alamat email
                    <Input
                        placeholderText="Isi alamat emailmu disini"
                        handleChange={handleChange}
                        id="mailing-list"
                        variant="primary"
                    />
                </Label>
                <Button
                    handleClick={handleClick}
                    variant="primary"
                    width="fit-content"
                    height="fit-content"
                    py={[2]}
                    mt={[0, 0, 33]}
                >
                    Daftarkan email
                </Button>
            </Modal>
        </Container>
    );
};

export { MailingList };
