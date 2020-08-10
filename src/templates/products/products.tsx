import React, { useState, useEffect } from 'react';
import { filter, indexOf, get } from 'lodash';

import styled from 'styled-components';
import { color } from 'styled-system';

import { OuterWrapper, StylingProps, PositioningProps } from 'styles';
import Filter from './filter';
import { SelectItem } from 'components/select/select';
import { Property } from 'interfaces/Property';
import { filter as initFilter } from 'helper/filter';

type ContainerProps = StylingProps & PositioningProps & {};

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    ${color}
`;

export type MinMaxObj = {
    min: number;
    max: number;
};

type Props = {
    properties: Property[];
};

const Products: React.FC<Props> = ({ properties }) => {
    const [addressFilter, setAddressFilter] = useState('');

    const [locationFilters, setlocationFilters] = useState<string[]>([]);
    const [saleTypeFilters, setSaleTypeFilters] = useState<string[]>([]);
    const [propTypeFilters, setPropTypeFilters] = useState<string[]>([]);

    const [areaFilter, setAreaFilter] = useState<MinMaxObj>({
        min: 0,
        max: 999,
    });
    const [priceFilter, setPriceFilter] = useState<MinMaxObj>({
        min: 0,
        max: 999,
    });

    const [display, setDisplay] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setDisplay(properties);
    }, []);

    useEffect(() => {
        // call filter method and then update proivder.

        console.log('chnge');

        setIsLoading(true);

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

            console.log(newDisplay);

            await setIsLoading(false);
            await setDisplay(newDisplay);
        })();
    }, [
        addressFilter,
        locationFilters,
        saleTypeFilters,
        propTypeFilters,
        areaFilter,
        priceFilter,
    ]);

    const handleChangeAddress = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setAddressFilter(event.target.value);
    };

    const handleSelectLocations = (value: string) => {
        setlocationFilters([...locationFilters, value]);
    };

    const handleSelectSaleType = (value: string) => {
        setSaleTypeFilters([...saleTypeFilters, value]);
    };

    const handleSelectPropertyType = (value: string) => {
        setPropTypeFilters([...propTypeFilters, value]);
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

    const selectSaleTypeItems: SelectItem[] = [
        { key: 'Jual', value: 'sell' },
        { key: 'Sewa', value: 'rent' },
    ];

    const selectPropertyTypeItems: SelectItem[] = [
        { key: 'Rumah', value: 'house' },
        { key: 'Apartment', value: 'apartment' },
        { key: 'Kavling', value: 'kavling' },
        { key: 'Ruko', value: 'home-office' },
    ];

    // mock data here..
    const mockLocations: SelectItem[] = properties.map(property => {
        const location = get(property, 'location', '');
        return {
            key: location,
            value: location,
        };
    });
    // .filter(item => item !== undefined);

    console.table(display);

    return (
        <Container
            bg="bg"
            css={`
                display: grid;
                place-items: center;
            `}
        >
            <OuterWrapper width={1} bg="dark.2">
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
                    area={areaFilter}
                    price={priceFilter}
                    handleChangeAddress={handleChangeAddress}
                    handleSelectLocations={handleSelectLocations}
                    handleSelectSaleType={handleSelectSaleType}
                    handleSelectPropertyType={handleSelectPropertyType}
                    handleChangeArea={handleChangeArea}
                    handleChangePrice={handleChangePrice}
                />
                {isLoading && <h1>AAAAA LOADINGGG</h1>}
            </OuterWrapper>
        </Container>
    );
};

export { Products };
