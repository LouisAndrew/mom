/* eslint-disable immutable/no-mutation */
/* eslint-disable @typescript-eslint/tslint/config */
import React, { useState } from 'react';

import { InlineIcon } from '@iconify/react';
import collapseFIlterIcon from '@iconify/icons-uil/angle-double-left';
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
import { H2, H3, StylingProps, PositioningProps, theme } from 'styles';
import { Label } from 'templates/main-page/hero/hero-form/hero-form';
import Select from 'components/select';
import Input from 'components/input';
import { SelectItem } from 'components/select/select';
import { MinMaxObj } from '../products';
import Button from 'components/button';

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
    addressFilter: string;
    price: MinMaxObj;
    area: MinMaxObj;
    filterTags?: React.ReactNode;
    handleChangeAddress: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectLocations: (value: string) => void;
    handleSelectSaleType: (value: string) => void;
    handleSelectPropertyType: (value: string) => void;
    handleChangePrice: (value: number, max: boolean) => void;
    handleChangeArea: (value: number, max: boolean) => void;
    applyFilters: () => void;
    collapseFilter: () => void;
};

/**
 * A display component for filtering properties to be displayed!
 *
 */
const Filter: React.FC<Props> = ({
    locationOptions,
    saleTypeOptions,
    propTypeOptions,
    addressFilter,
    price,
    area,
    filterTags,
    handleChangeAddress,
    handleSelectLocations,
    handleSelectSaleType,
    handleSelectPropertyType,
    handleChangeArea,
    handleChangePrice,
    applyFilters,
    collapseFilter,
}) => {
    const [priceMinAccu, setPriceMinAccu] = useState(1);
    const [priceMaxAccu, setPriceMaxAccu] = useState(1);

    const handleChangeMinAccu = (value: string) => {
        if (value === 'billion') {
            setPriceMinAccu(1000);
        } else {
            setPriceMinAccu(1);
        }
    };

    const handleChangeMaxAccu = (value: string) => {
        if (value === 'billion') {
            setPriceMaxAccu(1000);
        } else {
            setPriceMaxAccu(1);
        }
    };

    return (
        <Container
            position="absolute"
            zIndex={2}
            // minHeight={['100vh', '100vh', 'fit-content']}
            bg={['dark.0']}
            width={['90%', '90%', 'fit-content']}
            mx={['5', '5%', 0]}
            maxWidth={['100%', '100%', '50vw']}
            borderStyle="solid"
            borderColor={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)']}
            borderRadius={[4]}
            py={[5]}
            px={[4]}
            css={`
                &.filter-enter {
                    opacity: 0;
                    left: -100%;
                }
                &.filter-enter-active {
                    opacity: 1;
                    transition: 200ms;
                    left: 0;
                }
                &.filter-exit {
                    opacity: 1;
                    left: 0;
                }
                &.filtere-exit-active {
                    opacity: 0;
                    transition: 200ms;
                    left: -100%;
                }
            `}
        >
            <span
                onClick={collapseFilter}
                onKeyDown={collapseFilter}
                tabIndex={0}
                role="button"
            >
                <H2
                    color={['bg']}
                    mb={[2, 2]}
                    width="fit-content"
                    css={`
                        &,
                        svg {
                            transition: 0.2s;
                        }

                        svg {
                            margin-left: 8px;
                        }

                        &:hover {
                            transform: translateX(-8px);
                            cursor: pointer;
                            svg {
                                transform: scale(1.2) !important;
                            }

                            @media screen and (min-width: ${theme
                                    .breakpoints[1]}) {
                                transform: translateX(-16px);
                            }
                        }
                    `}
                >
                    Filters
                    <InlineIcon
                        icon={collapseFIlterIcon}
                        color={theme.colors.bg}
                    />
                </H2>
            </span>
            {filterTags}
            <Form p={[2]}>
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
                        value={addressFilter}
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
                                value={area.min === 0 ? '' : area.min}
                                handleChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    const num: number = parseFloat(
                                        event.target.value
                                    );

                                    if (isNaN(num)) {
                                        handleChangeArea(0, false);
                                        return;
                                    }

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
                                value={
                                    area.max === Number.MAX_SAFE_INTEGER
                                        ? ''
                                        : area.max
                                }
                                handleChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    const num: number = parseFloat(
                                        event.target.value
                                    );

                                    if (isNaN(num)) {
                                        handleChangeArea(
                                            Number.MAX_SAFE_INTEGER,
                                            true
                                        );
                                        return;
                                    }

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
                                    value={
                                        price.min !== 0
                                            ? price.min / priceMinAccu
                                            : ''
                                    }
                                    handleChange={(
                                        event: React.ChangeEvent<
                                            HTMLInputElement
                                        >
                                    ) => {
                                        const num: number = parseFloat(
                                            event.target.value
                                        );

                                        if (isNaN(num)) {
                                            handleChangePrice(0, false);
                                            return;
                                        }

                                        handleChangePrice(
                                            num * priceMinAccu,
                                            false
                                        );
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
                                id="price-min-accumulator"
                                handleSelect={handleChangeMinAccu}
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
                                    value={
                                        price.max !== Number.MAX_SAFE_INTEGER
                                            ? price.max / priceMaxAccu
                                            : ''
                                    }
                                    handleChange={(
                                        event: React.ChangeEvent<
                                            HTMLInputElement
                                        >
                                    ) => {
                                        const num: number = parseFloat(
                                            event.target.value
                                        );

                                        if (isNaN(num)) {
                                            handleChangePrice(
                                                Number.MAX_SAFE_INTEGER,
                                                true
                                            );
                                            return;
                                        }

                                        handleChangePrice(
                                            num * priceMaxAccu,
                                            true
                                        );
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
                                id="price-max-accumulator"
                                handleSelect={handleChangeMaxAccu}
                                // {...horizontalFormStyles}
                                variant="filter"
                            />
                        </FormHorizontalBox>
                    </FormHorizontalBox>
                </PriceWrapper>
            </Form>
            <Button
                handleClick={applyFilters}
                variant="primary-outer"
                width={1}
            >
                Cari Sekarang
            </Button>
        </Container>
    );
};

export { Filter };
