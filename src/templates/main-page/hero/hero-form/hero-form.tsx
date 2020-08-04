import React, { useState } from 'react';
import styled from 'styled-components';
import {
    space,
    flexbox,
    typography,
    layout,
    grid,
    border,
    boxShadow,
    BorderProps,
    BoxShadowProps,
    SpaceProps,
    FlexboxProps,
} from 'styled-system';
import { debounce } from 'lodash';

import Select from 'components/select';
import Input from 'components/input';
import Button from 'components/button';
import { SelectItem } from 'components/select/select';

import { H1, P, StylingProps, PositioningProps } from 'styles';

type Props = {
    headingText: string;
    bodyText: string;
    allLocations: string[];
    submitForm: (location: string, area: number) => void;
};

type ContainerProps = StylingProps &
    PositioningProps &
    BorderProps &
    BoxShadowProps & {};

type FormProps = FlexboxProps & {};

type LabelProps = StylingProps &
    SpaceProps & {
        children: React.ReactNode;
        for?: string;
    };

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`

    display: flex;

    ${space}
    ${flexbox}
    ${layout}
    ${grid}
    ${border}
    ${boxShadow}
`;

const Form: React.FC<FormProps> = styled.form<FormProps>`
    display: flex;

    ${flexbox}
`;

const Label: React.FC<LabelProps> = styled.label.attrs((props: LabelProps) => ({
    htmlFor: props.for,
}))<LabelProps>`
    ${typography}
    ${space}
`;

const HeroForm: React.FC<Props> = ({
    headingText,
    bodyText,
    allLocations,
    submitForm,
}) => {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedArea, setSelectedArea] = useState(0);

    const submitDebounced = debounce(submitForm, 1000);

    const handleSelect = (value: string) => {
        const userInput: string[] = allLocations.filter(
            location => location.toLowerCase() === value
        );
        if (userInput.length > 0) {
            setSelectedLocation(userInput[0]);
        }
    };

    const handleChangeArea = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedArea(parseInt(event.target.value, 10));
    };

    const handleClick = () => {
        submitDebounced(selectedLocation, selectedArea);
    };

    return (
        <Container
            // gridTemplateRows="repeat(4, auto)"
            // gridGap={[3, 3, 4]}
            flexDirection="column"
            alignItems={['center', 'center', 'flex-start']}
            width={[1, 1, 3 / 5, 0.45]}
            py={[4, 4, 5, 5]}
            px={[4, 6, 5, 5]}
            borderWidth="2px"
            borderStyle="solid"
            borderColor="accent.2"
            borderRadius="8px"
            boxShadow="blendLarge"
            bg="light.0"
            color="dark.0"
        >
            <H1 textAlign={['center', 'center', 'left']} color="dark.0">
                {headingText}
            </H1>
            <P textAlign={['center', 'center', 'left']} my={[3, 4, 5]}>
                {bodyText}
            </P>
            <Form
                flexDirection="column"
                alignItems={['center', 'center', 'flex-start']}
            >
                <Label
                    fontSize={[1, 1, 2, 2]}
                    fontFamily="body"
                    fontWeight="bold"
                    for="hero-form-location"
                    textAlign={['center', 'center', 'left']}
                >
                    Daerah
                    <Select
                        optionPadX={['4', '4', '8']}
                        mt={[1, 1, 2]}
                        mb={[2, 2, 3]}
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
                </Label>
                <Label
                    fontSize={[1, 1, 2, 2]}
                    fontFamily="body"
                    fontWeight="bold"
                    for="hero-form-area"
                    textAlign={['center', 'center', 'left']}
                >
                    Luas
                    <Input
                        mt={[1, 1, 2]}
                        mb={[2, 2, 3]}
                        placeholderText="100"
                        id="hero-form-area"
                        variant="secondary"
                        handleChange={handleChangeArea}
                        width={[52, 52, 64]}
                        append={true}
                        appendContent="m²"
                        inputType="number"
                    />
                </Label>
            </Form>
            <Button
                mt={[2, 2, 3]}
                handleClick={handleClick}
                variant="secondary"
                width="fit-content"
            >
                Cari Sekarang!
            </Button>
        </Container>
    );
};

export { HeroForm };
