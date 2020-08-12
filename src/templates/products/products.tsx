import React, { useState, useEffect } from 'react';
import { filter, indexOf, get, find } from 'lodash';
import { CSSTransition } from 'react-transition-group';

import { InlineIcon } from '@iconify/react';
import expandFilterIcon from '@iconify/icons-uil/angle-double-right';
import styled from 'styled-components';
import { color, space, flexbox, layout } from 'styled-system';

import {
    H2,
    OuterWrapper,
    StylingProps,
    PositioningProps,
    theme,
} from 'styles';
import Filter from './filter';
// there's an error on storybook while importing display from its index.ts file.
import { Display } from './display/display';
import { SelectItem } from 'components/select/select';
import { Property } from 'interfaces/Property';
import { filter as initFilter } from 'helper/filter';
import Tag from 'components/tag';

type ContainerProps = StylingProps &
    PositioningProps & {
        id: string;
    };

type InnerWrapperProps = PositioningProps & {};

type FilterTagsContainerProps = PositioningProps & {};
const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    ${color}
`;

const InnerWrapper: React.FC<InnerWrapperProps> = styled.div<InnerWrapperProps>`
    ${space}
`;

const FilterTagsContainer: React.FC<FilterTagsContainerProps> = styled.div<
    FilterTagsContainerProps
>`
    display: flex;
    ${flexbox}
    ${layout}
`;

export type MinMaxObj = {
    min: number;
    max: number;
};

type Props = {
    properties: Property[];
};

export const selectSaleTypeItems: SelectItem[] = [
    { key: 'Jual', value: 'sell' },
    { key: 'Sewa', value: 'rent' },
];

export const selectPropertyTypeItems: SelectItem[] = [
    { key: 'Rumah', value: 'house' },
    { key: 'Apartment', value: 'apartment' },
    { key: 'Kavling', value: 'kavling' },
    { key: 'Ruko', value: 'home-office' },
];

const Products: React.FC<Props> = ({ properties }) => {
    const [display, setDisplay] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    // filter states

    const [addressFilter, setAddressFilter] = useState('');

    const [locationFilters, setlocationFilters] = useState<string[]>([]);
    const [saleTypeFilters, setSaleTypeFilters] = useState<string[]>([]);
    const [propTypeFilters, setPropTypeFilters] = useState<string[]>([]);

    const [areaFilter, setAreaFilter] = useState<MinMaxObj>({
        min: 0,
        max: Number.MAX_SAFE_INTEGER,
    });
    const [priceFilter, setPriceFilter] = useState<MinMaxObj>({
        min: 0,
        max: Number.MAX_SAFE_INTEGER,
    });

    // end of filter states

    useEffect(() => {
        setDisplay(properties);
    }, []);

    const toggleFilterView = () => {
        setShowFilter(prev => !prev);
    };

    const applyFilters = () => {
        (async () => {
            const newDisplay = await initFilter({
                addressFilter,
                locationFilters,
                saleTypeFilters,
                propTypeFilters,
                areaFilter,
                priceFilter,
                properties,
            });

            await setIsLoading(false);
            await setDisplay(newDisplay);

            // eslint-disable-next-line @typescript-eslint/tslint/config, immutable/no-mutation
            location.href = '#display-top';

            await toggleFilterView();
        })();
    };

    const handleChangeAddress = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setAddressFilter(event.target.value);
    };

    const handleSelectLocations = (value: string) => {
        if (locationFilters.indexOf(value) === -1) {
            setlocationFilters([...locationFilters, value]);
        }
    };

    const handleSelectSaleType = (value: string) => {
        if (saleTypeFilters.indexOf(value) === -1) {
            setSaleTypeFilters([...saleTypeFilters, value]);
        }
    };

    const handleSelectPropertyType = (value: string) => {
        if (propTypeFilters.indexOf(value) === -1) {
            setPropTypeFilters([...propTypeFilters, value]);
        }
    };

    const handleChangeArea = (value: number, max: boolean) => {
        if (max) {
            setAreaFilter(prev => ({ ...prev, max: value }));
        } else {
            setAreaFilter(prev => ({ ...prev, min: value }));
        }
    };

    const handleChangePrice = (value: number, max: boolean) => {
        if (max) {
            setPriceFilter(prev => ({ ...prev, max: value }));
        } else {
            setPriceFilter(prev => ({ ...prev, min: value }));
        }
    };

    const filterDisplayByValue = (
        originalItems: SelectItem[],
        stateItem: string[]
    ) => filter(originalItems, item => indexOf(stateItem, item.value) === -1);

    // here: max = 999
    const checkIfPriceIsFiltered = (): boolean =>
        priceFilter.max !== Number.MAX_SAFE_INTEGER || priceFilter.min !== 0;

    const checkIfAreaIsFiltered = (): boolean =>
        areaFilter.max !== Number.MAX_SAFE_INTEGER || areaFilter.min !== 0;

    const calculateNumsOfFilters = (): number => {
        return (
            locationFilters.length +
            saleTypeFilters.length +
            propTypeFilters.length +
            (addressFilter !== '' ? 1 : 0) +
            (checkIfPriceIsFiltered() ? 1 : 0) +
            (checkIfAreaIsFiltered() ? 1 : 0)
        );
    };

    // mock data here..
    const mockLocations: SelectItem[] = properties.map(property => {
        const location = get(property, 'location', '');
        return {
            key: location,
            value: location,
        };
    });

    const filterTagsComponent: JSX.Element = (
        <FilterTagsContainer flexWrap="wrap" width={1}>
            {locationFilters.map((location, i) => (
                <Tag
                    m={[1]}
                    key={`${location}-filter-tag`}
                    variant="location"
                    handleClick={() => {
                        setlocationFilters(prev =>
                            prev.filter(loc => loc !== location)
                        );
                    }}
                >
                    {location}
                </Tag>
            ))}
            {saleTypeFilters.map((saleType, i) => (
                <Tag
                    m={[1]}
                    key={`${saleType}-filter-tag`}
                    variant={saleType}
                    handleClick={() => {
                        setSaleTypeFilters(prev =>
                            prev.filter(sale => sale !== saleType)
                        );
                    }}
                >
                    {find(selectSaleTypeItems, o => o.value === saleType)?.key}
                </Tag>
            ))}
            {propTypeFilters.map((propType, i) => (
                <Tag
                    m={[1]}
                    key={`${propType}-filter-tag`}
                    variant={propType}
                    handleClick={() => {
                        setPropTypeFilters(prev =>
                            prev.filter(prop => prop !== propType)
                        );
                    }}
                >
                    {
                        find(selectPropertyTypeItems, o => o.value === propType)
                            ?.key
                    }
                </Tag>
            ))}
        </FilterTagsContainer>
    );

    return (
        <Container
            bg="bg"
            id="display-top"
            css={`
                display: grid;
                place-items: center;
            `}
        >
            <OuterWrapper width={1} position="relative">
                <CSSTransition
                    in={showFilter}
                    timeout={200}
                    classNames="filter"
                    unmountOnExit={true}
                >
                    <Filter
                        locationOptions={filterDisplayByValue(
                            mockLocations,
                            locationFilters
                        )}
                        saleTypeOptions={filterDisplayByValue(
                            selectSaleTypeItems,
                            saleTypeFilters
                        )}
                        propTypeOptions={filterDisplayByValue(
                            selectPropertyTypeItems,
                            propTypeFilters
                        )}
                        addressFilter={addressFilter}
                        area={areaFilter}
                        price={priceFilter}
                        filterTags={filterTagsComponent}
                        handleChangeAddress={handleChangeAddress}
                        handleSelectLocations={handleSelectLocations}
                        handleSelectSaleType={handleSelectSaleType}
                        handleSelectPropertyType={handleSelectPropertyType}
                        handleChangeArea={handleChangeArea}
                        handleChangePrice={handleChangePrice}
                        collapseFilter={toggleFilterView}
                        applyFilters={applyFilters}
                    />
                </CSSTransition>
                <InnerWrapper py={[3, 3, 5]} px={[3, 3, 4]}>
                    <span
                        onClick={toggleFilterView}
                        onKeyDown={toggleFilterView}
                        tabIndex={0}
                        role="button"
                    >
                        <H2
                            color={['dark.2']}
                            mb={[2, 2]}
                            css={`
                                &,
                                svg {
                                    transition: 0.2s;
                                }

                                &:hover {
                                    transform: translateX(8px);
                                    cursor: pointer;

                                    svg {
                                        transform: scale(1.2) !important;
                                    }

                                    @media screen and (min-width: ${theme
                                            .breakpoints[1]}) {
                                        transform: translateX(16px);
                                    }
                                }
                            `}
                        >
                            Filters {calculateNumsOfFilters()}
                            <InlineIcon
                                icon={expandFilterIcon}
                                color={theme.colors.dark[2]}
                            />
                        </H2>
                    </span>
                    <FilterTagsContainer>
                        {addressFilter !== '' && (
                            <Tag
                                handleClick={toggleFilterView}
                                variant="misc"
                                m={[1]}
                            >
                                {addressFilter}
                            </Tag>
                        )}
                        {checkIfAreaIsFiltered() && (
                            <Tag
                                handleClick={toggleFilterView}
                                variant="misc"
                                m={[1]}
                            >
                                {areaFilter.min > 0 && `${areaFilter.min} < `}
                                Luas
                                {areaFilter.max < 999 && ` < ${areaFilter.max}`}
                            </Tag>
                        )}
                        {checkIfPriceIsFiltered() && (
                            <Tag
                                handleClick={toggleFilterView}
                                variant="misc"
                                m={[1]}
                            >
                                {priceFilter.min > 0 &&
                                    `${
                                        priceFilter.min / 1000 < 1
                                            ? `${priceFilter.min} Jt`
                                            : `${priceFilter.min / 1000} M`
                                    } < `}
                                Harga
                                {priceFilter.max < Number.MAX_SAFE_INTEGER &&
                                    ` < ${
                                        priceFilter.max / 1000 < 1
                                            ? `${priceFilter.max} Jt`
                                            : `${priceFilter.max / 1000} M`
                                    }  `}
                            </Tag>
                        )}
                        {locationFilters.map((location, i) => (
                            <Tag
                                m={[1]}
                                key={`${location}-filter-tag`}
                                variant="location"
                                handleClick={toggleFilterView}
                            >
                                {location}
                            </Tag>
                        ))}
                        {saleTypeFilters.map((saleType, i) => (
                            <Tag
                                m={[1]}
                                key={`${saleType}-filter-tag`}
                                variant={saleType}
                                handleClick={toggleFilterView}
                            >
                                {
                                    find(
                                        selectSaleTypeItems,
                                        o => o.value === saleType
                                    )?.key
                                }
                            </Tag>
                        ))}
                        {propTypeFilters.map((propType, i) => (
                            <Tag
                                m={[1]}
                                key={`${propType}-filter-tag`}
                                variant={propType}
                                handleClick={toggleFilterView}
                            >
                                {
                                    find(
                                        selectPropertyTypeItems,
                                        o => o.value === propType
                                    )?.key
                                }
                            </Tag>
                        ))}
                    </FilterTagsContainer>
                    <Display
                        display={display}
                        handleSelectLocations={handleSelectLocations}
                        handleSelectPropertyType={handleSelectPropertyType}
                        handleSelectSaleType={handleSelectSaleType}
                        applyFilters={applyFilters}
                    />
                </InnerWrapper>
            </OuterWrapper>
        </Container>
    );
};

export { Products };
