import Select from 'components/select';
import { SelectItem } from 'components/select/select';
import Input from 'components/input';
import React from 'react';

import styled from 'styled-components';
import { color, position, layout, PositionProps } from 'styled-system';

import { H2, H3, StylingProps, PositioningProps } from 'styles';
import { Label } from 'templates/main-page/hero/hero-form/hero-form';

type Props = PositioningProps & {};

type ContainerProps = PositionProps & StylingProps & PositioningProps & {};

type FormProps = PositioningProps & {};

type AreaWrapperProps = {};

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    ${position}
    ${color}
    ${layout}
`;

const Form: React.FC<FormProps> = styled.form<FormProps>``;

const AreaWrapper: React.FC<AreaWrapperProps> = styled.div<AreaWrapperProps>``;

const Filter: React.FC<Props> = () => {
    const handleSelectLocations = (value: string) => {
        console.log(value);
    };

    const handleChangeAddress = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        return;
    };

    const handleSelectSaleType = (value: string) => {
        console.log(value);
    };

    const handleSelectPropertyType = (value: string) => {
        console.log(value);
    };

    const mockSelectLocations: SelectItem[] = [
        {
            key: 'Penang',
            value: 'penang',
        },
        {
            key: 'Malaysia',
            value: 'malay',
        },
    ];

    const selectPropertyTypeItems: SelectItem[] = [
        {
            key: 'Rumah',
            value: 'house',
        },
        {
            key: 'Apartment',
            value: 'apartment',
        },
        {
            key: 'Ruko',
            value: 'home-office',
        },
        {
            key: 'Kavling',
            value: 'kavling',
        },
    ];

    const selectSaleTypeItems: SelectItem[] = [
        {
            key: 'Jual',
            value: 'sell',
        },
        {
            key: 'Sewa',
            value: 'rent',
        },
    ];

    const labelFontStyles: {
        fontFamily: string;
        fontSize: number[];
        fontWeight: string;
    } = {
        fontFamily: 'body',
        fontSize: [1, 1, 2],
        fontWeight: 'regular',
    };

    const labelTypographyStyles: string[] = ['bg'];

    return (
        <Container height={['100vh']} bg={['dark.0']}>
            <H2 color={['bg']}>Filters</H2>
            <Form>
                <>
                    <Label
                        for="location-filter"
                        color={labelTypographyStyles}
                        {...labelFontStyles}
                    >
                        Daerah
                    </Label>
                    <Select
                        id="location-filter"
                        items={mockSelectLocations}
                        handleSelect={handleSelectLocations}
                        variant="primary"
                    />
                </>
                <Label
                    for="address-filter"
                    color={labelTypographyStyles}
                    {...labelFontStyles}
                >
                    Alamat
                    <Input
                        placeholderText="Alamat rumah"
                        id="address-filter"
                        handleChange={handleChangeAddress}
                        variant="primary"
                    />
                </Label>
                <>
                    <Label
                        for="sale-type-filter"
                        color={labelTypographyStyles}
                        {...labelFontStyles}
                    >
                        Tipe penjualan property
                    </Label>
                    <Select
                        id="sale-type-filter"
                        items={selectSaleTypeItems}
                        variant="primary"
                        multiple={true}
                        handleSelect={handleSelectSaleType}
                    />
                </>
                <>
                    <Label
                        for="property-type-filter"
                        color={labelTypographyStyles}
                        {...labelFontStyles}
                    >
                        Tipe property
                    </Label>
                    <Select
                        id="property-type-filter"
                        items={selectPropertyTypeItems}
                        variant="primary"
                        multiple={true}
                        handleSelect={handleSelectPropertyType}
                    />
                </>
                <AreaWrapper>
                    <H3 {...labelFontStyles} color={labelTypographyStyles}>
                        Luas rumah
                    </H3>
                    <Label
                        for="min-area-filter"
                        color={labelTypographyStyles}
                        {...labelFontStyles}
                        fontSize={[0, 0, 1]}
                    >
                        Dari
                        <Input
                            placeholderText="MIN"
                            id="min-area-filter"
                            handleChange={handleChangeAddress}
                            variant="primary"
                        />
                    </Label>
                    <Label
                        for="max-area-filter"
                        color={labelTypographyStyles}
                        {...labelFontStyles}
                        fontSize={[0, 0, 1]}
                    >
                        Sampai
                        <Input
                            placeholderText="MAX"
                            id="max-area-filter"
                            handleChange={handleChangeAddress}
                            variant="primary"
                        />
                    </Label>
                </AreaWrapper>
            </Form>
        </Container>
    );
};

export { Filter };
