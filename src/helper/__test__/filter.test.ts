import { Property } from 'interfaces/Property';
import { filter, FilterObj } from '../filter';

// sample data for testing purposes.
const mockProperty: Property[] = [
    {
        name: 'Rumah 1',
        address: 'Jalan rumah 1',
        propertyType: 'house',
        saleType: 'sell',

        imgs: [],
        description: 'Deskripsi bum bum bum',
        location: 'Penang',
        price: 200,
        area: 125,
    },
    {
        name: 'Rumah 2',
        address: 'Jalan apartment 2',
        propertyType: 'apartment',
        saleType: 'rent',

        imgs: [],
        description: 'Deskripsi bum bum bum',
        location: 'PIK',
        price: 500,
        area: 250,
    },
    {
        name: 'Rumah 10',
        address: 'Jalan ke dufan',
        propertyType: 'home-office',
        saleType: 'rent',

        imgs: [],
        description: 'Deskripsi bum bum bum',
        location: 'jkarta Timur',
        price: 700,
        area: 500,
    },
];

describe('Filter function', () => {
    const emptyFilterObj: FilterObj = {
        addressFilter: '',
        locationFilters: [],
        saleTypeFilters: [],
        propTypeFilters: [],
        areaFilter: { min: 0, max: Number.MAX_SAFE_INTEGER },
        priceFilter: { min: 0, max: Number.MAX_SAFE_INTEGER },
        properties: mockProperty,
    };

    it('Should filter based on address correctly', () => {
        return filter({
            ...emptyFilterObj,
            addressFilter: 'jalan apartment',
        }).then(properties => {
            expect(properties.length).toBe(1);
            // hardcodec value : manually filtered from mockProperty provided.
            expect(properties[0].name).toStrictEqual('Rumah 2');
        });
    });

    it('Should filter based on location correctly', () => {
        return filter({
            ...emptyFilterObj,
            locationFilters: ['Penang', 'PIK'],
        }).then(properties => {
            expect(properties.length).toBe(2);
            // hardcodec value : manually filtered from mockProperty provided.
            expect(
                properties.every(
                    property =>
                        property.location === 'Penang' ||
                        property.location === 'PIK'
                )
            ).toBe(true);
        });
    });

    it('Should filter based on sale type correctly', () => {
        return filter({
            ...emptyFilterObj,
            saleTypeFilters: ['rent'],
        }).then(properties => {
            expect(properties.length).toBe(
                mockProperty.filter(property => property.saleType === 'rent')
                    .length
            );
            // hardcodec value : manually filtered from mockProperty provided.
            expect(
                properties.every(property => property.saleType === 'rent')
            ).toBe(true);
        });
    });

    it('Should filter based on property type correctly', () => {
        return filter({
            ...emptyFilterObj,
            propTypeFilters: ['apartment', 'home-office'],
        }).then(properties => {
            expect(properties.length).toBe(
                mockProperty.filter(
                    property =>
                        property.propertyType === 'apartment' ||
                        property.propertyType === 'home-office'
                ).length
            );
            // hardcodec value : manually filtered from mockProperty provided.
            expect(
                properties.every(
                    property =>
                        property.propertyType === 'apartment' ||
                        property.propertyType === 'home-office'
                )
            ).toBe(true);
        });
    });

    it('Should filter based on price correctly', () => {
        return filter({
            ...emptyFilterObj,
            priceFilter: { min: 300, max: 700 },
        }).then(properties => {
            expect(properties.length).toBe(
                mockProperty.filter(
                    property =>
                        property.price &&
                        property.price >= 300 &&
                        property.price <= 700
                ).length
            );
            // hardcodec value : manually filtered from mockProperty provided.
            expect(
                properties.every(
                    property =>
                        property.price &&
                        property.price >= 300 &&
                        property.price <= 700
                )
            ).toBe(true);
        });
    });

    it('Should filter based on area correctly', () => {
        return filter({
            ...emptyFilterObj,
            areaFilter: { min: 125, max: 200 },
        }).then(properties => {
            expect(properties.length).toBe(
                mockProperty.filter(
                    property =>
                        property.price &&
                        property.price >= 125 &&
                        property.price <= 200
                ).length
            );
            // hardcodec value : manually filtered from mockProperty provided.
            expect(
                properties.every(
                    property =>
                        property.price &&
                        property.price >= 125 &&
                        property.price <= 200
                )
            ).toBe(true);
        });
    });

    it('Should apply multiple filters correctly', () => {
        return filter({
            ...emptyFilterObj,
            priceFilter: { min: 300, max: 700 },
            areaFilter: { min: 500, max: 700 },
            propTypeFilters: ['home-office'],
        }).then(properties => {
            expect(properties.length).toBe(1);
            // hardcodec value : manually filtered from mockProperty provided.
            expect(
                properties.every(
                    property =>
                        property.price &&
                        property.price >= 300 &&
                        property.price <= 700 &&
                        property.area &&
                        property.area >= 500 &&
                        property.propertyType === 'home-office'
                )
            ).toBe(true);
        });
    });
});
