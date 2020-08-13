import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Detail from '..';

describe('Detail on product page', () => {
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
    const el: React.ReactElement = <Detail {...mockProperty} />;
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
