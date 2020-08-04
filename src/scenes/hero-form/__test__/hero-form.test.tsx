import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HeroForm } from '../hero-form';

describe('Hero form component', () => {
    const mockHandleSubmit = jest.fn(() => {});
    afterEach(cleanup);
    const el: React.ReactElement = <HeroForm handleSubmit={mockHandleSubmit} />;

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('should react to user input correctly', () => {
        const { getByTestId } = render(el);
    });

    it('matches snapshot', () => {
        const tree = renderer.create(el).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
