import React from 'react';

import styled from 'styled-components';
import { color, position, layout, PositionProps } from 'styled-system';

import { H2, StylingProps, PositioningProps } from 'styles';

type Props = PositioningProps & {};

type ContainerProps = PositionProps & StylingProps & PositioningProps & {};

type FormProps = PositioningProps & {};

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    ${position}
    ${color}
    ${layout}
`;

const Form: React.FC<FormProps> = styled.form<FormProps>``;

const Filter: React.FC<Props> = () => {
    return (
        <Container height={['100vh']} bg={['dark.0']}>
            <H2 color={['bg']}>Filters</H2>
            <Form>
                <Label></Label>
            </Form>
        </Container>
    );
};

export { Filter };
