import React from 'react';
import styled from 'styled-components';
import { color, layout, space, flexbox, ColorProps } from 'styled-system';
import Img, { FluidObject } from 'gatsby-image';

import { OuterWrapper, H2, P, PositioningProps } from 'styles';

type Props = {
    imgAlt: string;
    imgSrc?: string;
    imgFluidSrc?: FluidObject | FluidObject[];
};

type ContainerProps = ColorProps & PositioningProps & {};

type WrapperProps = PositioningProps & {};

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

/**
 * Providing imgSrc to get the flexibility to develop in storybook
 * On the actual project: gotta be using the imgFluidSrc and get the text contents from gatsby
 */
const About: React.FC<Props> = ({ imgAlt, imgSrc, imgFluidSrc }) => {
    const headingText =
        'Siapakah saya yang sebenarnya? Mengapa anda perlu peduli?';
    const bodyText =
        'Quis ut sunt labore commodo amet velit laborum eu laboris. Lorem officia consectetur reprehenderit in ut ad anim cillum. Aute proident quis consequat nisi nulla non. Est ex minim aute qui commodo. Reprehenderit exercitation consectetur tempor aliquip nulla tempor cillum. Qui sint reprehenderit in anim aliqua labore veniam magna enim.';

    return (
        <Container bg="dark.0" py={[5, 5, 6, 6]}>
            <OuterWrapper display="flex" justifyContent="center">
                <Wrapper
                    width={4 / 5}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    {imgFluidSrc ? (
                        <Img fluid={imgFluidSrc} alt={imgAlt} />
                    ) : (
                        <img src={imgSrc} alt={imgAlt} />
                    )}

                    <H2 color="light.0" textAlign="center" py={[3, 3, 4, 4]}>
                        {headingText}
                    </H2>
                    <P color="light.0" textAlign="center">
                        {bodyText}
                    </P>
                </Wrapper>
            </OuterWrapper>
        </Container>
    );
};

export { About };
