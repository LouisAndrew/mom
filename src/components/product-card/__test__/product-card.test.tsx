import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Card from '..';

describe('Product card component', () => {
    const mockHeadingText: string = 'Heading';
    const mockBodyText: string = 'Body';
    const imgSrc: string =
        'https://res.cloudinary.com/dsvdffre0/image/upload/v1596016031/github-icon.png';
    const mockNavigate = jest.fn(() => {});

    afterEach(cleanup);
    const el: React.ReactElement = (
        <Card
            headingText={mockHeadingText}
            bodyText={mockBodyText}
            src={imgSrc}
            alt="github-icon"
            navigate={mockNavigate}
        />
    );

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('should react to user click correctly', () => {
        const { getByRole } = render(el);
        const button: HTMLElement = getByRole('button');

        fireEvent.click(button);
        expect(mockNavigate).toBeCalled();
    });

    it('matches snapshot', () => {
        const tree = renderer.create(el).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
