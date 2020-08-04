import React from 'react';
import styled from 'styled-components';
import { flexbox } from 'styled-system';

import Img from './img';
import HeroForm from './hero-form';
import { PositioningProps, OuterWrapper } from 'styles';

type Props = {};

type ContainerProps = PositioningProps & {};

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    display: grid;
    place-items: center;
`;

const Hero: React.FC<Props> = () => {
    const mockheadingText = 'Heading text about finding a house';
    const mockBodyText =
        'Exercitation aute eu nostrud do sit labore ex minim reprehenderit ut ipsum veniam ad laborum. Minim eiusmod sint officia ipsum ad dolore Lorem sunt tempor ut. Esse in elit exercitation elit ex laborum nulla do veniam amet. Ut est reprehenderit nisi laboris. ';
    const mockAllLocations: string[] = ['PIK', 'Muara Karang', 'BSD'];

    const submitForm = (location: string, area: number) => {
        // naivgate to search page
        return;
    };

    return (
        <>
            <Container>
                <OuterWrapper
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <HeroForm
                        headingText={mockheadingText}
                        bodyText={mockBodyText}
                        allLocations={mockAllLocations}
                        submitForm={submitForm}
                    />
                    <Img id="img-hero" />
                </OuterWrapper>
            </Container>
        </>
    );
};

export { Hero };
