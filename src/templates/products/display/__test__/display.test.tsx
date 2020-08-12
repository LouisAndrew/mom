import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Property } from 'interfaces/Property';
import Display from '..';

describe('Display component on products', () => {
    const mockProperty: Property[] = [
        {
            name: 'Rumah 1',
            address: 'Jalan rumah 1',
            propertyType: 'house',
            saleType: 'sell',

            imgs: [
                {
                    image:
                        'https://res.cloudinary.com/dsvdffre0/image/upload/v1597137791/webaliser-_TPTXZd9mOo-unsplash_pqtm1r.jpg',
                    imgAlt: 'Beautiful house',
                },
            ],
            description: 'Deskripsi bum bum bum',
            location: 'Penang',
            price: 200,
            area: 125,
        },
        {
            name: 'Rumah 2',
            address: 'Jalan apartment 2',
            propertyType: 'apartment',
            saleType: 'rent',

            imgs: [
                {
                    image:
                        'https://res.cloudinary.com/dsvdffre0/image/upload/v1597137791/jacques-bopp-Hh18POSx5qk-unsplash_lweaht.jpg',
                    imgAlt: 'Beautiful house 2',
                },
            ],
            description: 'Deskripsi bum bum bum',
            location: 'PIK',
            price: 500,
            area: 250,
        },
        {
            name: 'Rumah 10',
            address: 'Jalan ke dufan',
            propertyType: 'home-office',
            saleType: 'rent',

            imgs: [
                {
                    image:
                        'https://res.cloudinary.com/dsvdffre0/image/upload/v1597137792/digital-marketing-agency-ntwrk-g39p1kDjvSY-unsplash_kh6gti.jpg',
                    imgAlt: 'Beautiful house 3',
                },
            ],
            description: 'Deskripsi bum bum bum',
            location: 'jkarta Timur',
            price: 700,
            area: 500,
        },
    ];

    const mockHandleSelectLocs = jest.fn(() => {
        return;
    });
    const mockHandleSelectProps = jest.fn(() => {
        return;
    });
    const mockHandleSelectSale = jest.fn(() => {
        return;
    });

    const mockApplyFilters = jest.fn(() => {
        return;
    });

    const el: React.ReactElement = (
        <Display
            display={mockProperty}
            blur={true}
            handleSelectLocations={mockHandleSelectLocs}
            handleSelectPropertyType={mockHandleSelectProps}
            handleSelectSaleType={mockHandleSelectSale}
            applyFilters={mockApplyFilters}
        />
    );

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('Should render children cards correctly', () => {
        const { queryByText } = render(el);
        mockProperty.forEach(o => {
            const textEl: HTMLElement | null = queryByText(o.name);
            if (textEl) {
                expect(textEl).toBeInTheDocument();
            } else fail();
        });
    });

    // TODO: why this test fails?
    // it('Should render with tags and calls its corresponding function correctly', () => {
    //     const { queryAllByText } = render(el);
    //     mockProperty.forEach(o => {
    //         const locsEl: HTMLElement[] = queryAllByText(
    //             o.location ? o.location : ''
    //         );
    //         const propsEl: HTMLElement[] = queryAllByText(o.propertyType);
    //         const saleEl: HTMLElement[] = queryAllByText(o.saleType);

    //         if (locsEl.length > 0) {
    //             fireEvent.click(locsEl[0]);
    //             expect(mockHandleSelectLocs).toBeCalled();
    //         }

    //         if (propsEl.length > 0) {
    //             fireEvent.click(propsEl[0]);
    //             expect(mockHandleSelectProps).toBeCalled();
    //         } else fail();

    //         if (saleEl.length > 0) {
    //             fireEvent.click(saleEl[0]);
    //             expect(mockHandleSelectSale).toBeCalled();
    //         }
    //     });
    // });

    it('matches snapshot', () => {
        const tree = renderer.create(el).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
