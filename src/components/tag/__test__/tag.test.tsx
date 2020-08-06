import React from 'react';
import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';

import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Tag from '..';

describe('Tag component', () => {
    const mockContent = 'A tag!';
    const mockHandleClick = jest.fn(() => {});

    afterEach(cleanup);

    const el: React.ReactElement = (
        <Tag content={mockContent} handleClick={mockHandleClick} />
    );

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('should render with text content correctly', () => {
        const { queryByText } = render(el);
        const tag: HTMLElement | null = queryByText(mockContent);

        if (tag) {
            expect(true).toBe(true);
        } else fail();
    });

    it('should react to user click correctly', () => {
        const { getByText } = render(el);
        const tag: HTMLElement = getByText(mockContent);

        fireEvent.click(tag);

        expect(mockHandleClick).toBeCalled();
    });

    // it('matches snapshot', () => {

    //     const tree = renderer.create(el).toJSON()
    //     expect(tree).toMatchSnapshot()
    // })
});
