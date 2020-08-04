import React, { useState } from 'react';
import styled from 'styled-components';
import { typography } from 'styled-system';

import Select from 'components/select';
import Input from 'components/input';
import { SelectItem } from 'components/select/select';

import { H1, P, StylingProps } from 'styles';

type Props = {
    headingText: string;
    bodyText: string;
    allLocations: string[];
};

type ContainerProps = {};

type FormProps = {};

type LabelProps = StylingProps & {
    children: React.ReactNode;
    for?: string;
};

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>``;

const Form: React.FC<FormProps> = styled.form<FormProps>``;

const Label: React.FC<LabelProps> = styled.label.attrs((props: LabelProps) => ({
    htmlFor: props.for,
}))<LabelProps>`
    ${typography}
`;

const HeroForm: React.FC<Props> = ({ headingText, bodyText, allLocations }) => {
    const [selectedLocation, setSelectedLocation] = useState('');

    const handleSelect = (value: string) => {};
    const handleChangeArea = (event: React.ChangeEvent<HTMLInputElement>) => {};

    return (
        <Container>
            <H1>{headingText}</H1>
            <P>{bodyText}</P>
            <Form>
                <Label
                    fontSize={[1, 1, 2, 2]}
                    fontFamily="body"
                    fontWeight="bold"
                    for="hero-form-location"
                >
                    Daerah
                </Label>
                <Select
                    items={allLocations.map(location => {
                        const item: SelectItem = {
                            key: location,
                            value: location.toLowerCase(),
                        };

                        return item;
                    })}
                    id="hero-form-location"
                    handleSelect={handleSelect}
                    variant="secondary"
                />
                <Label
                    fontSize={[1, 1, 2, 2]}
                    fontFamily="body"
                    fontWeight="bold"
                    for="hero-form-area"
                >
                    Luas
                    <Input
                        placeholderText="100"
                        id="hero-form-area"
                        variant="secondary"
                        handleChange={handleChangeArea}
                        width={[52, 52, 64]}
                    />
                </Label>
            </Form>
        </Container>
    );
};

export { HeroForm };
