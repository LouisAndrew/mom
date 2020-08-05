import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import HotList from '..';
import { Property } from 'interfaces/Property';

describe('Hot List component', () => {
    const mockProperties: Property[] = [
        {
            name: 'Rumah 1',
            address: 'jalan Mangga 24 blok G nomor 167',
            imgs: [
                {
                    image:
                        'https://res.cloudinary.com/dsvdffre0/image/upload/v1595340453/ovmhcixqqpfjla4mxovf.jpg',
                    imgAlt: 'Handsome boy',
                },
            ],
            porpertyType: 'house',
            saleType: 'sell',
        },
        {
            name: 'Rumah 2',
            address: 'jalan Mangga 25 blok F nomor 167',
            imgs: [
                {
                    image:
                        'https://res.cloudinary.com/dsvdffre0/image/upload/v1596031267/w3ufcacls7mqfmhbwpe4.png',
                    imgAlt: 'Lakers logo',
                },
                {
                    image:
                        'https://res.cloudinary.com/dsvdffre0/image/upload/v1595015542/sample.jpg',
                    imgAlt: 'Flower',
                },
            ],
            porpertyType: 'apartment',
            saleType: 'rent',
        },
        {
            name: 'Apartment 2',
            address: 'jalan Mangga 25 blok F nomor 167',
            imgs: undefined,
            porpertyType: 'apartment',
            saleType: 'rent',
        },
    ];
    afterEach(cleanup);
    const el: React.ReactElement = <HotList hotProperties={mockProperties} />;

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('matches snapshot', () => {
        const tree = renderer.create(el).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
