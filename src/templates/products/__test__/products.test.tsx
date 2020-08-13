import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import Products from '..';
import { Property } from 'interfaces/Property';
import { withReachRouter } from 'helper/reach-router';

describe('All products component', () => {
    const mockProperty: Property[] = [
        {
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
        },
        {
            name: 'Rumah 2',
            address: 'Jalan apartment 2',
            propertyType: 'apartment',
            saleType: 'rent',

            imgs: [
                {
                    image:
                        'https://res.cloudinary.com/dsvdffre0/image/upload/v1597137791/jacques-bopp-Hh18POSx5qk-unsplash_lweaht.jpg',
                    imgAlt: 'Beautiful house 2',
                },
            ],
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

            imgs: [
                {
                    image:
                        'https://res.cloudinary.com/dsvdffre0/image/upload/v1597137792/digital-marketing-agency-ntwrk-g39p1kDjvSY-unsplash_kh6gti.jpg',
                    imgAlt: 'Beautiful house 3',
                },
            ],
            description: 'Deskripsi bum bum bum',
            location: 'jkarta Timur',
            price: 700,
            area: 500,
        },
    ];

    const el: React.ReactElement = withReachRouter(
        <Products properties={mockProperty} />
    ) as React.ReactElement;

    afterEach(cleanup);
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('matches snapshot', () => {
        const tree = renderer.create(el).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
