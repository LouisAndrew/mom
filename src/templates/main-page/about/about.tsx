import React from 'react';
import styled from 'styled-components';
import {
    color,
    layout,
    space,
    flexbox,
    border,
    boxShadow,
    ColorProps,
    BorderProps,
    BoxShadowProps,
} from 'styled-system';
import Img, { FluidObject } from 'gatsby-image';

import { OuterWrapper, H2, P, PositioningProps, theme } from 'styles';

type Props = {
    imgAlt: string;
    imgSrc?: string;
    imgFluidSrc?: FluidObject | FluidObject[];
};

type ContainerProps = ColorProps & PositioningProps & {};

type WrapperProps = PositioningProps & {};

type DetailsWrapperProps = ColorProps &
    PositioningProps &
    BorderProps &
    BoxShadowProps & {};

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    display: grid;
    place-items: center;

    ${color}
    ${space}
`;

const Wrapper: React.FC<WrapperProps> = styled.div<WrapperProps>`
    ${layout}
    ${space}
    ${flexbox}
`;

const DetailsWrapper: React.FC<DetailsWrapperProps> = styled.div<
    DetailsWrapperProps
>`
    ${color}
    ${space}
    ${border}
    ${boxShadow}
    ${layout}
`;

/**
 * Providing imgSrc to get the flexibility to develop in storybook
 * On the actual project: gotta be using the imgFluidSrc and get the text contents from gatsby
 * img aspect ratio: 2:3. -> Figure out if img box is needed here!
 */
const About: React.FC<Props> = ({ imgAlt, imgSrc, imgFluidSrc }) => {
    const headingText =
        'Siapakah saya yang sebenarnya? Mengapa anda perlu peduli?';
    const bodyText =
        'Quis ut sunt labore commodo amet velit laborum eu laboris. Lorem officia consectetur reprehenderit in ut ad anim cillum. Aute proident quis consequat nisi nulla non. Est ex minim aute qui commodo. Reprehenderit exercitation consectetur tempor aliquip nulla tempor cillum. Qui sint reprehenderit in anim aliqua labore veniam magna enim.';

    return (
        <Container bg="bg" py={[6, 6, 7, 7]}>
            <OuterWrapper display="flex" justifyContent="center">
                <Wrapper
                    width={[0.9]}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    css={`
                        & > img {
                            border-radius: 8px;
                            width: 80%;
                            transform: translateY(24px);

                            @media screen and (min-width: ${theme
                                    .breakpoints[1]}) {
                                width: 40%;
                                align-self: flex-start;
                                transform: translate(32px, 32px);
                            }
                        }
                    `}
                >
                    {imgFluidSrc ? (
                        <Img fluid={imgFluidSrc} alt={imgAlt} />
                    ) : (
                        <img src={imgSrc} alt={imgAlt} />
                    )}

                    <DetailsWrapper
                        bg="light.0"
                        py={[6, 7]}
                        pr={[3, 5, 6]}
                        pl={[3, 5, 9]}
                    >
                        <H2
                            color="dark.0"
                            textAlign={['center', 'center', 'left']}
                        >
                            {headingText}
                        </H2>
                        <P
                            color="dark.0"
                            textAlign={['center', 'center', 'left']}
                            py={[4]}
                        >
                            {bodyText}
                        </P>
                    </DetailsWrapper>
                </Wrapper>
            </OuterWrapper>
        </Container>
    );
};

export { About };
