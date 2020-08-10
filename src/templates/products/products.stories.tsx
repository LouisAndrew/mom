import React from 'react';
import { storiesOf } from '@storybook/react';

import { Products } from './products';
import { Property } from 'interfaces/Property';
// import more addons

const story = storiesOf('Products', module);

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

story.add('Component', () => <Products properties={mockProperty} />);
