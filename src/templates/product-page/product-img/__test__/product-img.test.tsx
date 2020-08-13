import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductImg from '..';

describe('Product img component.', () => {
    const mockImgs = [
        {
            image:
                'https://res.cloudinary.com/dsvdffre0/image/upload/v1597137791/webaliser-_TPTXZd9mOo-unsplash_pqtm1r.jpg',
            imgAlt: 'Beautiful house',
        },
        {
            image:
                'https://res.cloudinary.com/dsvdffre0/image/upload/v1597137791/jacques-bopp-Hh18POSx5qk-unsplash_lweaht.jpg',
            imgAlt: 'Beautiful house 2',
        },
        {
            image:
                'https://res.cloudinary.com/dsvdffre0/image/upload/v1597137792/digital-marketing-agency-ntwrk-g39p1kDjvSY-unsplash_kh6gti.jpg',
            imgAlt: 'Beautiful house 3',
        },
    ];
    const el: React.ReactElement = <ProductImg imgs={mockImgs} />;

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('should react to user input correctly', () => {
        const { getByTestId, getByAltText } = render(el);

        const mainImg: HTMLImageElement = getByTestId(
            'main'
        ) as HTMLImageElement;
        const img2: HTMLElement = getByAltText(mockImgs[2].imgAlt);
        fireEvent.click(img2);

        expect(mainImg.src).toBe(mockImgs[2].image);
    });

    it('matches snapshot', () => {
        const tree = renderer.create(el).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
