import React from 'react';
import { storiesOf } from '@storybook/react';
import { Property } from 'interfaces/Property';
import { ProductPageTemplate } from './product-page';

const mockProperty: Property = {
    name: 'Rumah 1',
    address: 'Jalan rumah 1',
    propertyType: 'house',
    saleType: 'sell',

    imgs: [
        {
            image:
                'https://res.cloudinary.com/dsvdffre0/image/upload/v1597137791/webaliser-_TPTXZd9mOo-unsplash_pqtm1r.jpg',
            imgAlt: 'Beautiful house',
        },
    ],
    description: 'Deskripsi bum bum bum',
    location: 'Penang',
    price: 200,
    area: 125,
    geolocation: {
        lat: -6.174355262420816,
        lng: 106.77378352982794,
    },
};

// import more addons

const story = storiesOf('Product Page', module);

story.add('Component', () => <ProductPageTemplate property={mockProperty} />);
