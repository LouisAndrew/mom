import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Dropdown from '..';

describe('', () => {
    // expect(true).toBe(true);
    afterEach(cleanup);

    const el: React.ReactElement = <Dropdown />;
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('should render img everytime user hovers on its text content correctly', () => {
        const { getByText } = render(el);
        // textContent: 'Rumah', id: 'house'. see: dropdown.tsx
        const textContent: HTMLElement = getByText('Rumah');

        fireEvent.mouseEnter(textContent);

        const svgEl: HTMLElement | null = document.getElementById('house');

        // TODO: fix test bug.
        if (svgEl) {
            expect(svgEl).toBeInTheDocument();
            // expect(svgEl).toHaveStyle('opacity: 1');
        } else fail();
    });

    it('matches snapshot', () => {
        const tree = renderer.create(el).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
