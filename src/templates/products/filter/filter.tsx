/* eslint-disable immutable/no-mutation */
/* eslint-disable @typescript-eslint/tslint/config */
import React from 'react';

import styled from 'styled-components';
import {
    color,
    position,
    layout,
    flexbox,
    space,
    typography,
    border,
    PositionProps,
    BorderProps,
} from 'styled-system';

import {
    labelFontStyles,
    horizontalFormStyles,
    calculateAreaFormWidth,
    labelTypographyStyles,
    inputElementSpacingProps,
} from './styling-helper';
import { H2, H3, StylingProps, PositioningProps } from 'styles';
import { Label } from 'templates/main-page/hero/hero-form/hero-form';
import Select from 'components/select';
import Input from 'components/input';
import { SelectItem } from 'components/select/select';
import { MinMaxObj } from '../products';

type ContainerProps = PositionProps &
    StylingProps &
    PositioningProps &
    BorderProps & {};

type FormProps = PositioningProps & {};

type AreaWrapperProps = {};

type FormHorizontalBoxProps = StylingProps & PositioningProps & {};

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    ${position}
    ${color}
    ${layout}
    ${space}
    ${border}
`;

const Form: React.FC<FormProps> = styled.form<FormProps>`
    ${space}
`;

const AreaWrapper: React.FC<AreaWrapperProps> = styled.div<AreaWrapperProps>``;

const PriceWrapper: React.FC<AreaWrapperProps> = styled(AreaWrapper)``;

const FormHorizontalBox: React.FC<FormHorizontalBoxProps> = styled.div<
    FormHorizontalBoxProps
>`
    ${color}
    ${flexbox}
    ${layout}
    ${space}

    & > span {
        ${typography}
        margin: 0 8px;
    }
`;

type Props = PositioningProps & {
    locationOptions: SelectItem[];
    saleTypeOptions: SelectItem[];
    propTypeOptions: SelectItem[];
    price: MinMaxObj;
    area: MinMaxObj;
    handleChangeAddress: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectLocations: (value: string) => void;
    handleSelectSaleType: (value: string) => void;
    handleSelectPropertyType: (value: string) => void;
    handleChangePrice: (value: number, max: boolean) => void;
    handleChangeArea: (value: number, max: boolean) => void;
};

/**
 * A display component for filtering properties to be displayed!
 *
 */
const Filter: React.FC<Props> = ({
    locationOptions,
    saleTypeOptions,
    propTypeOptions,
    price,
    area,
    handleChangeAddress,
    handleSelectLocations,
    handleSelectSaleType,
    handleSelectPropertyType,
    handleChangeArea,
    handleChangePrice,
}) => {
    return (
        <Container
            height={['100vh', '100vh', 'fit-content']}
            bg={['dark.0']}
            width={['100%', '100%', 'fit-content']}
            borderStyle="solid"
            borderColor={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)']}
            borderRadius={[0, 0, 4]}
            py={[3, 3, 5]}
            px={[3, 3, 4]}
        >
            <H2 color={['bg']} mb={[2, 2]}>
                Filters
            </H2>
            <Form px={[2]}>
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
                        variant="filter"
                        {...inputElementSpacingProps}
                    />
                </Label>

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
                        items={locationOptions}
                        handleSelect={handleSelectLocations}
                        variant="filter"
                        multiple={true}
                        {...inputElementSpacingProps}
                    />
                </>

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
                        items={saleTypeOptions}
                        variant="filter"
                        multiple={true}
                        handleSelect={handleSelectSaleType}
                        {...inputElementSpacingProps}
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
                        items={propTypeOptions}
                        variant="filter"
                        multiple={true}
                        handleSelect={handleSelectPropertyType}
                        {...inputElementSpacingProps}
                    />
                </>

                <AreaWrapper>
                    <H3 {...labelFontStyles} color={labelTypographyStyles}>
                        Luas rumah
                    </H3>
                    <FormHorizontalBox
                        width={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-start"
                        flexWrap="wrap"
                        bg={['dark.1']}
                        px={[2]}
                        py={[2]}
                        color={['bg']}
                        fontSize={[2, 2, 3]}
                        fontFamily="body"
                        fontWeight="regular"
                        {...inputElementSpacingProps}
                        css={`
                            border-radius: 4px;
                        `}
                    >
                        <Label for="area-min">
                            <Input
                                inputType="number"
                                placeholderText="Min"
                                id="area-min"
                                variant="filter"
                                value={area.min}
                                handleChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    const num: number = parseFloat(
                                        event.target.value
                                    );

                                    handleChangeArea(num, false);
                                }}
                                width={calculateAreaFormWidth(4)}
                                {...horizontalFormStyles}
                            />
                        </Label>
                        <span>-</span>
                        <Label for="area-max">
                            <Input
                                inputType="number"
                                placeholderText="Max"
                                variant="filter"
                                id="area-max"
                                value={area.max}
                                handleChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    const num: number = parseFloat(
                                        event.target.value
                                    );

                                    handleChangeArea(num, true);
                                }}
                                width={calculateAreaFormWidth(4)}
                                {...horizontalFormStyles}
                            />
                        </Label>
                        <span>M²</span>
                    </FormHorizontalBox>
                </AreaWrapper>

                <PriceWrapper>
                    <H3 {...labelFontStyles} color={labelTypographyStyles}>
                        Harga rumah
                    </H3>
                    <FormHorizontalBox
                        bg={['dark.1']}
                        px={[2]}
                        py={[1]}
                        width={1}
                        css={`
                            border-radius: 4px;

                            span {
                                display: block;
                                width: 30%;
                            }
                        `}
                        {...inputElementSpacingProps}
                    >
                        <FormHorizontalBox
                            width={1}
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-start"
                            py={[1]}
                            color={['bg']}
                            fontSize={[2, 2, 3]}
                            fontFamily="body"
                            fontWeight="regular"
                            css={`
                                border-radius: 4px;
                            `}
                        >
                            <span>Dari Rp</span>
                            <Label for="price-min">
                                <Input
                                    inputType="number"
                                    placeholderText="dari harga"
                                    variant="filter"
                                    id="price-min"
                                    width={calculateAreaFormWidth(6)}
                                    value={price.min}
                                    handleChange={(
                                        event: React.ChangeEvent<
                                            HTMLInputElement
                                        >
                                    ) => {
                                        const num: number = parseFloat(
                                            event.target.value
                                        );

                                        handleChangePrice(num, false);
                                    }}
                                    {...horizontalFormStyles}
                                />
                            </Label>
                            <Select
                                width="fit-content"
                                items={[
                                    {
                                        key: 'Jt',
                                        value: 'million',
                                    },
                                    {
                                        key: 'M',
                                        value: 'billion',
                                    },
                                ]}
                                defaultValue={{ key: 'Jt', value: 'million' }}
                                id="price-min-select"
                                handleSelect={() => {
                                    return;
                                }}
                                // {...horizontalFormStyles}
                                variant="filter"
                            />
                        </FormHorizontalBox>
                        <FormHorizontalBox
                            width={1}
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-start"
                            py={[1]}
                            color={['bg']}
                            fontSize={[2, 2, 3]}
                            fontFamily="body"
                            fontWeight="regular"
                            css={`
                                border-radius: 4px;
                            `}
                        >
                            <span>Sampai Rp</span>
                            <Label for="price-max">
                                <Input
                                    inputType="number"
                                    placeholderText="Sampai harga"
                                    variant="filter"
                                    id="price-max"
                                    width={calculateAreaFormWidth(6)}
                                    value={price.max}
                                    handleChange={(
                                        event: React.ChangeEvent<
                                            HTMLInputElement
                                        >
                                    ) => {
                                        const num: number = parseFloat(
                                            event.target.value
                                        );

                                        handleChangePrice(num, true);
                                    }}
                                    {...horizontalFormStyles}
                                />
                            </Label>
                            <Select
                                width="fit-content"
                                items={[
                                    {
                                        key: 'Jt',
                                        value: 'million',
                                    },
                                    {
                                        key: 'M',
                                        value: 'billion',
                                    },
                                ]}
                                defaultValue={{ key: 'Jt', value: 'million' }}
                                id="price-max-select"
                                handleSelect={() => {
                                    return;
                                }}
                                // {...horizontalFormStyles}
                                variant="filter"
                            />
                        </FormHorizontalBox>
                    </FormHorizontalBox>
                </PriceWrapper>
            </Form>
        </Container>
    );
};

export { Filter };
