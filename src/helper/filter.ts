import { intersection, flatten } from 'lodash';

import { Property } from 'interfaces/Property';
import { MinMaxObj } from 'templates/products/products';

type FilterObj = {
    addressFilter: string;
    locationFilters: string[];
    saleTypeFilters: string[];
    propTypeFilters: string[];
    areaFilter: MinMaxObj;
    priceFilter: MinMaxObj;
    properties: Property[];
};

const filterByAddress = (addr: string, properties: Property[]): Property[] =>
    properties.filter(
        property =>
            property.address.toLowerCase().indexOf(addr.toLowerCase()) !== -1
    );

const filterByLocation = (
    locations: string[],
    properties: Property[]
): Property[] =>
    flatten(
        locations.map(location =>
            properties.filter(property => property.location === location)
        )
    );

const filterBySaleType = (
    saleTypes: string[],
    properties: Property[]
): Property[] =>
    flatten(
        saleTypes.map(saleType =>
            properties.filter(property => property.saleType === saleType)
        )
    );

const filterByPropType = (
    propTypes: string[],
    properties: Property[]
): Property[] =>
    flatten(
        propTypes.map(propType =>
            properties.filter(property => property.propertyType === propType)
        )
    );

const filterByArea = (area: MinMaxObj, properties: Property[]): Property[] =>
    properties.filter(
        property =>
            property.area &&
            property.area >= area.min &&
            property.area <= area.max
    );

const filterByPrice = (price: MinMaxObj, properties: Property[]): Property[] =>
    properties.filter(
        property =>
            property.price &&
            property.price >= price.min &&
            property.price <= price.max
    );

/**
 * filters properties given by all filter properties.
 */
export const filter = ({
    addressFilter,
    locationFilters,
    saleTypeFilters,
    propTypeFilters,
    areaFilter,
    priceFilter,
    properties,
}: FilterObj): Promise<Property[]> => {
    const filteredByAddress = filterByAddress(addressFilter, properties);
    // just use the filter if any tags is provided.
    const filteredByLocation =
        locationFilters.length > 0
            ? filterByLocation(locationFilters, properties)
            : properties;
    const filteredBySaleType =
        saleTypeFilters.length > 0
            ? filterBySaleType(saleTypeFilters, properties)
            : properties;
    const filteredByPropType =
        propTypeFilters.length > 0
            ? filterByPropType(propTypeFilters, properties)
            : properties;
    //
    const filteredByArea = filterByArea(areaFilter, properties);
    const filteredByPrice = filterByPrice(priceFilter, properties);

    // returns a promise to provide the ability to use any loader.
    return new Promise<Property[]>((res, rej) => {
        res(
            intersection(
                properties,
                filteredByAddress,
                filteredBySaleType,
                filteredByLocation,
                filteredByPropType,
                filteredByArea,
                filteredByPrice
            )
        );
    });
};
