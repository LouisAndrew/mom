import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import HeroForm from '..';

describe('Form on hero component', () => {
    const mockheadingText = 'Heading text about finding a house';
    const mockBodyText =
        'Exercitation aute eu nostrud do sit labore ex minim reprehenderit ut ipsum veniam ad laborum. Minim eiusmod sint officia ipsum ad dolore Lorem sunt tempor ut. Esse in elit exercitation elit ex laborum nulla do veniam amet. Ut est reprehenderit nisi laboris. In amet ea ut elit nulla officia ex. Est exercitation aliqua sunt nostrud enim velit non duis ipsum ea officia.';
    const mockAllLocations: string[] = ['PIK', 'Muara Karang', 'BSD'];

    const mockSubmitForm = jest.fn(() => {});

    afterEach(cleanup);
    const el: React.ReactElement = (
        <HeroForm
            headingText={mockheadingText}
            bodyText={mockBodyText}
            allLocations={mockAllLocations}
            submitForm={mockSubmitForm}
        />
    );

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('matches snapshot', () => {
        const tree = renderer.create(el).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
