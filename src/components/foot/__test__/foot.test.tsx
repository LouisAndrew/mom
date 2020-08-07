import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import Footer from '..';

describe('Footer component', () => {
    const el: React.ReactElement = <Footer />;
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
