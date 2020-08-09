import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import {
    space,
    flexbox,
    typography,
    layout,
    border,
    color,
    boxShadow,
    position,
    grid,
    BorderProps,
    BoxShadowProps,
    PositionProps,
} from 'styled-system';
import { debounce } from 'lodash';

import Select from 'components/select';
import Input from 'components/input';
import Button from 'components/button';
import { SelectItem } from 'components/select/select';

import { H1, P, StylingProps, PositioningProps, theme } from 'styles';

type Props = {
    headingText: string;
    bodyText: string;
    allLocations: string[];
    submitForm: (
        location: string,
        area: number,
        type: 'buy' | 'rent' | ''
    ) => void;
};

type ContainerProps = StylingProps & PositioningProps & PositionProps & {};

type FormProps = PositioningProps &
    BorderProps &
    BoxShadowProps &
    StylingProps & {};

type LabelProps = StylingProps &
    PositioningProps & {
        children: React.ReactNode;
        for?: string;
    };

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`

    display: flex;

    ${space}
    ${flexbox}
    ${layout}
    ${position}
`;

const Form: React.FC<FormProps> = styled.form<FormProps>`
    display: flex;

    ${flexbox}
    ${layout}
    ${border}
    ${boxShadow}
    ${space}
    ${color}

    span.select-span { 

        margin: 8px 0;

        &.type {
            width: fit-content;
        }

        @media screen and (min-width: ${theme.breakpoints[1]}) {
            margin: 0;
            /* &.type { width: 100%; } */
        }
    }
`;

export const Label: React.FC<LabelProps> = styled.label.attrs(
    (props: LabelProps) => ({
        htmlFor: props.for,
    })
)<LabelProps>`
    ${typography}
    ${space}
    ${layout} /* 100% width */
    ${flexbox} /* flexbox properties for the second label */
    ${grid}
    ${color}
`;

const HeroForm: React.FC<Props> = ({
    headingText,
    bodyText,
    allLocations,
    submitForm,
}) => {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedArea, setSelectedArea] = useState(0);
    const [selectedType, setSelectedType] = useState<'buy' | 'rent' | ''>('');

    const types: SelectItem[] = [
        {
            key: 'Beli',
            value: 'buy',
        },
        {
            key: 'Sewa',
            value: 'rent',
        },
    ];

    const submitDebounced = debounce(submitForm, 1000);

    const locationItems = useMemo(() => {
        return allLocations.map(location => {
            const item: SelectItem = {
                key: location,
                value: location.toLowerCase(),
            };

            return item;
        });
    }, [allLocations]);

    const handleSelectLocation = (value: string) => {
        const userInput: string[] = allLocations.filter(
            location => location.toLowerCase() === value
        );
        if (userInput.length > 0) {
            setSelectedLocation(userInput[0]);
        } else {
            setSelectedLocation('');
        }
    };

    const handleChangeArea = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedArea(parseInt(event.target.value, 10));
    };

    const handleSelectType = (value: string) => {
        const userInput: SelectItem[] = types.filter(
            type => type.value === value
        );
        if (
            (userInput.length > 0 && userInput[0].value === 'buy') ||
            userInput[0].value === 'rent'
        ) {
            setSelectedType(userInput[0].value);
        } else {
            setSelectedType('');
        }
    };

    const handleClick = () => {
        submitDebounced(selectedLocation, selectedArea, selectedType);
    };

    return (
        <Container
            flexDirection="column"
            alignItems={['center', 'center', 'flex-start']}
            flexWrap="wrap"
            py={[4, 4, 5, 5]}
            px={[4, 6, 5, 5]}
            position={'relative'}
            zIndex={2}
        >
            <H1 textAlign={['center', 'center', 'left']} color="dark.0">
                {headingText}
            </H1>
            <P
                textAlign={['center', 'center', 'left']}
                width={1}
                my={[5, 5, 4]}
            >
                {bodyText}
            </P>
            <Form
                width={[1, 1, 0.6, 0.5]}
                flexDirection="row"
                alignItems={['center', 'center', 'flex-start']}
                flexWrap={['wrap']}
                borderWidth="2px"
                borderStyle="solid"
                borderColor="accent.2"
                borderRadius="8px"
                boxShadow="blend"
                px={[3, 3, 4, 4]}
                py={[2, 2, 3, 3]}
                bg="light.0"
                color="dark.0"
            >
                <span className="select-span" style={{ width: '100%' }}>
                    <Label
                        fontSize={[1, 1, 2, 2]}
                        fontFamily="body"
                        fontWeight="bold"
                        for="hero-form-location"
                        textAlign={['center', 'center', 'left']}
                        width={1}
                    >
                        Daerah
                    </Label>
                    <Select
                        optionWidth={[1]}
                        mt={[1, 1, 2]}
                        mb={[2, 2, 3]}
                        items={locationItems}
                        id="hero-form-location"
                        handleSelect={handleSelectLocation}
                        variant="secondary"
                    />
                    {/* Weird bug here: select doesn't function correctly when it is the child of label */}
                </span>
                <Label
                    fontSize={[1, 1, 2, 2]}
                    fontFamily="body"
                    fontWeight="bold"
                    for="hero-form-area"
                    textAlign={['center', 'center', 'left']}
                    width={['fit-content']}
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    mr={[4, 5]}
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
                <span className="select-span type">
                    <Label
                        fontSize={[1, 1, 2, 2]}
                        fontFamily="body"
                        fontWeight="bold"
                        for="hero-form-type"
                        textAlign="left"
                        width={[1]}
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                    >
                        Jual/Beli
                    </Label>
                    <Select
                        mt={[1, 1, 2]}
                        mb={[2, 2, 3]}
                        items={types}
                        id="hero-form-type"
                        handleSelect={handleSelectType}
                        variant="secondary"
                    />
                </span>
                <Button
                    my={[2, 2, 3]}
                    px={[5, 5, 4, 6]}
                    py={2}
                    handleClick={handleClick}
                    variant="secondary"
                    width={[1]}
                >
                    Cari Sekarang!
                </Button>
            </Form>
        </Container>
    );
};

export { HeroForm };
