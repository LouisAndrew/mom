import React from 'react';

import styled from 'styled-components';
import { layout } from 'styled-system';

import { Property } from 'interfaces/Property';
import { OuterWrapper, PositioningProps, StylingProps } from 'styles';

type ContainerProps = {};

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    display: grid;
    place-items: center;
`;

type Props = {
    property: Property;
};

const ProductPageTemplate: React.FC<Props> = ({ property }) => {
    const {
        name,
        description,
        location,
        saleType,
        propertyType,
        geolocation,
        bathQty,
        roomQty,
        area,
        price,
        imgs,
    } = property;

    return (
        <Container>
            <OuterWrapper></OuterWrapper>
        </Container>
    );
};

export { ProductPageTemplate };
