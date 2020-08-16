import React, { useState, useEffect } from 'react';
import { filter, indexOf, get, find, set } from 'lodash';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from '@reach/router';

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
        className: string;
    };

type InnerWrapperProps = PositioningProps & {};

type FilterTagsContainerProps = PositioningProps & {};
const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    ${color}
    ${layout}
    ${space}
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
    // const [isLoading, setIsLoading] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    // filter states
    const [addressFilter, setAddressFilter] = useState('');

    const [locationFilters, setlocationFilters] = useState<string[]>([]);
    const [saleTypeFilters, setSaleTypeFilters] = useState<string[]>([]);
    const [propTypeFilters, setPropTypeFilters] = useState<string[]>([]);

    const navigate = useNavigate();

    const [areaFilter, setAreaFilter] = useState<MinMaxObj>({
        min: 0,
        max: Number.MAX_SAFE_INTEGER,
    });
    const [priceFilter, setPriceFilter] = useState<MinMaxObj>({
        min: 0,
        max: Number.MAX_SAFE_INTEGER,
    });

    const searchQuery: string = location.search;

    // end of filter states
    // Function to extract filters from the url request...
    // Separated this funcyion from the useEffect hook to provide reusability.. -> This function could be called everytime
    // The search params changes.
    const getFiltersFromQuery = (query: string) => {
        const searchParams: { [key: string]: string } = {};

        // extract filter parameters from the url
        query
            .substr(1)
            .split('&')
            .forEach(param => {
                // then assign the corresponding parameter into the searchParams object
                set(searchParams, param.split('=')[0], param.split('=')[1]);
            });

        // then apply filter if needed.
        const urlSaleFilter: string = get(searchParams, 'sale', '');
        const urlPropFilter: string = get(searchParams, 'prop', '');
        const urlLocationFilter: string = get(searchParams, 'loc', '');
        const urlAreaFilter: string = get(searchParams, 'area', '');

        if (urlSaleFilter) {
            setSaleTypeFilters([urlSaleFilter]);
        }

        if (urlPropFilter) {
            setPropTypeFilters([urlPropFilter]);
        }

        if (urlLocationFilter) {
            setlocationFilters([urlLocationFilter]);
        }

        if (urlAreaFilter && urlAreaFilter !== '0') {
            setAreaFilter(prev => ({
                ...prev,
                min: parseInt(urlAreaFilter, 10),
            }));
        }

        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        applyFilters();
    };

    useEffect(() => {
        if (searchQuery) {
            getFiltersFromQuery(searchQuery);
        } else if (location.href[location.href.length - 1] === '?') {
            // check if last of the url is just ? -> means a bug from the hero-form
            // where reach router can't directly navigate to the url but instead redirecting
            // to /products/?
            navigate(-1);
        } else {
            setDisplay(properties);
        }
    }, []);

    useEffect(() => {
        getFiltersFromQuery(searchQuery);
    }, [searchQuery]);

    // There's an error here? msg: cannot read property 'baseVal' of undefined
    // https://stackoverflow.com/questions/55380937/typeerror-cannot-read-property-baseval-of-undefined -> error thrown from CSSTransition element?
    // Fix error?
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

            // await setIsLoading(false);
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
            {locationFilters.map(location => (
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
            {saleTypeFilters.map(saleType => (
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
            {propTypeFilters.map(propType => (
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
            className="top"
            minHeight={'70vh'}
            py={[5, 4]}
            css={`
                display: grid;
                place-items: center;
            `}
        >
            <OuterWrapper width={1} position="relative" pt={[5]}>
                <CSSTransition
                    in={showFilter}
                    timeout={0}
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
                            width="fit-content"
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
                        {locationFilters.map(location => (
                            <Tag
                                m={[1]}
                                key={`${location}-filter-tag`}
                                variant="location"
                                handleClick={toggleFilterView}
                            >
                                {location}
                            </Tag>
                        ))}
                        {saleTypeFilters.map(saleType => (
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
                        {propTypeFilters.map(propType => (
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
                        blur={showFilter}
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
