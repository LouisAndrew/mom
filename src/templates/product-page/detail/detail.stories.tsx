import React from 'react';
import { storiesOf } from '@storybook/react';
import { Detail } from './detail';
// import more addons

const mockProperty = {
    name: 'Rumah 1',
    address: 'Jalan rumah 1',
    propertyType: 'house',
    saleType: 'sell',
    description: 'Deskripsi bum bum bum',
    location: 'Penang',
    price: 200,
    area: 125,
    bathQty: 2,
    roomQty: 3,
};

const story = storiesOf('Product Page.Detail', module);

story.add('Component', () => <Detail {...mockProperty} />);
