import React from 'react';
import styled from 'styled-components';
import { flexbox, space, layout } from 'styled-system';
import Img, { FluidObject } from 'gatsby-image';

import { PositioningProps, H3, P } from 'styles';
import ImgWithBorder from 'components/img-with-border';
import Button from 'components/button';

export type Props = PositioningProps & {
    headingText: string;
    bodyText: string;
    alt: string;
    src?: string;
    fluid?: FluidObject | FluidObject[] | undefined;
    navigate: () => void;
};

type ContainerProps = PositioningProps & {};

type DetailsContainerProps = PositioningProps & {};

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    display: flex;

    ${flexbox}
    ${space}
    ${layout}
`;

const DetailsContainer: React.FC<DetailsContainerProps> = styled.div<
    DetailsContainerProps
>`
    display: flex;

    ${flexbox}
    ${space}
    ${layout}
`;

const Card: React.FC<Props> = ({
    headingText,
    bodyText,
    fluid,
    src,
    alt,
    navigate,
    ...rest
}) => {
    return (
        <Container
            flexDirection={['column', 'column', 'row']}
            alignItems="center"
            justifyContent={['center', 'center', 'space-evenly']}
            {...rest}
        >
            <ImgWithBorder
                imgComponent={
                    fluid ? (
                        <Img fluid={fluid} alt={alt} />
                    ) : (
                        <img src={src ? src : '/'} alt={alt} />
                    )
                }
                variant="primary"
            />
            <DetailsContainer
                flexDirection="column"
                alignItems={['center', 'center', 'flex-start']}
                px={2}
                ml={[0, 0, 7]}
                mt={[4, 5, 0]}
                width={[1, 0.8, 0.5]}
            >
                <H3 textAlign={['center', 'center', 'left']}>{headingText}</H3>
                <P my={3} textAlign={['center', 'center', 'left']}>
                    {bodyText}
                </P>
                <Button handleClick={navigate} variant="primary">
                    More info
                </Button>
            </DetailsContainer>
        </Container>
    );
};

export { Card };
