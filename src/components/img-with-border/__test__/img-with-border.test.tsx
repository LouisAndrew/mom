import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import path from 'path';

import ImgWithBorder from '..';

describe('Img with border component!', () => {
    afterEach(cleanup);

    const img: React.ReactElement = (
        <img
            src="https://res.cloudinary.com/dsvdffre0/image/upload/v1596031267/w3ufcacls7mqfmhbwpe4.png"
            alt="lakers-logo"
        />
    );
    const el: React.ReactElement = <ImgWithBorder imgComponent={img} />;

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('matches snapshot', () => {
        const tree = renderer.create(el).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
