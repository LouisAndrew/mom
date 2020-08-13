import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import Filter from '..';

describe('Filter component', () => {
    const el: React.ReactElement = (
        <Filter
            locationOptions={[]}
            saleTypeOptions={[]}
            propTypeOptions={[]}
            addressFilter={''}
            price={{ min: 0, max: 0 }}
            area={{ min: 0, max: 0 }}
            handleChangeAddress={() => {
                return;
            }}
            handleSelectLocations={() => {
                return;
            }}
            handleSelectSaleType={() => {
                return;
            }}
            handleSelectPropertyType={() => {
                return;
            }}
            handleChangeArea={() => {
                return;
            }}
            handleChangePrice={() => {
                return;
            }}
            applyFilters={() => {
                return;
            }}
            collapseFilter={() => {
                return;
            }}
        />
    );

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
