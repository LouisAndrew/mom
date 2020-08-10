import React, { useState, useEffect } from 'react';
import { filter, indexOf } from 'lodash';

import Filter from './filter';
import { SelectItem } from 'components/select/select';

type MinMaxObj = {
    min: number;
    max: number;
};

type Props = {};

const Products: React.FC<Props> = () => {
    const [addressFilter, setAddressFilter] = useState('');

    const [locationFilters, setlocationFilters] = useState<string[]>([]);
    const [saleTypeFilters, setSaleTypeFilters] = useState<string[]>([]);
    const [propTypeFilters, setPropTypeFilters] = useState<string[]>([]);

    const [areaFilter, setAreaFilter] = useState<MinMaxObj>({
        min: 0,
        max: 0,
    });
    const [priceFilter, setPriceFilter] = useState<MinMaxObj>({
        min: 0,
        max: 0,
    });

    useEffect(() => {
        // call filter method and then update proivder.
        console.table({ locationFilters, saleTypeFilters, propTypeFilters });
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
        return;
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

    return (
        <>
            <Filter
                locationOptions={[]}
                saleTypeOptions={filterDisplayByValue(
                    selectSaleTypeItems,
                    saleTypeFilters
                )}
                propTypeOptions={filterDisplayByValue(
                    selectPropertyTypeItems,
                    propTypeFilters
                )}
                handleChangeAddress={handleChangeAddress}
                handleSelectLocations={handleSelectLocations}
                handleSelectSaleType={handleSelectSaleType}
                handleSelectPropertyType={handleSelectPropertyType}
            />
        </>
    );
};

export { Products };
