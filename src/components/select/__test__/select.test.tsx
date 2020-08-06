import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import Select from '..';
import { SelectItem } from '../select';

describe('Select component', () => {
    const mockOptions: SelectItem[] = [
        {
            key: 'Item one',
            value: 'itm1',
        },
        {
            key: 'Item two',
            value: 'itm2',
        },
    ];
    const mockHandleSelect = jest.fn(() => {});
    const mockDefaultOption = 'Choose one';
    const mockId = 'test-select';

    afterEach(cleanup);
    const el: React.ReactElement = (
        <Select
            items={mockOptions}
            defaultOption={mockDefaultOption}
            handleSelect={mockHandleSelect}
            id={mockId}
        />
    );

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('should be collapsed by default', () => {
        const { queryByText } = render(el);

        const option1: HTMLElement | null = queryByText(mockOptions[0].key);
        if (!option1) {
            expect(true).toBe(true);
        } else fail();
    });

    // TODO: write test about the component behavior
    // it('should expand by clicking the default option', () => {
    //     const { getByLabelText, queryByText } = render(el);

    //     const defaultOption: HTMLElement = getByLabelText(mockDefaultOption);
    //     fireEvent.change(defaultOption, { target: { checked: true } });

    //     const option1: HTMLElement | null = queryByText(mockOptions[0].key);
    //     if (option1) {
    //         expect(true).toBe(true);
    //     } else fail();
    // });

    // it('should react to user changes correctly', () => {
    //     const { getByText } = render(el);

    //     const defaultOption: HTMLElement = getByText(mockDefaultOption);
    //     fireEvent.click(defaultOption);

    //     const option1: HTMLElement = getByText(mockOptions[0].key);

    //     fireEvent.click(option1);

    //     expect(mockHandleSelect).toBeCalled();
    //     expect(defaultOption).toHaveTextContent(mockOptions[0].key);
    // });

    it('matches snapshot', () => {
        const tree = renderer.create(el).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
