import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Icon } from '@iconify/react';
import accessibleIcon from '@iconify/icons-uil/accessible-icon-alt';

import Input from '..';

describe('Input element', () => {
    const mockHandleChange = jest.fn(() => {});
    const mockPlaceholderText: string = 'input here';

    afterEach(cleanup);
    const el: React.ReactElement = (
        <Input
            placeholderText={mockPlaceholderText}
            handleChange={mockHandleChange}
        />
    );
    const elWithIcon: React.ReactElement = (
        <Input
            placeholderText={mockPlaceholderText}
            handleChange={mockHandleChange}
            icon={<Icon icon={accessibleIcon} data-testid="icon" />}
        />
    );

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('should render with placeholder text correctly', () => {
        const { queryByPlaceholderText } = render(el);
        const inputEl: HTMLElement | null = queryByPlaceholderText(
            mockPlaceholderText
        );

        if (inputEl) {
            expect(true).toBe(true);
        } else fail();
    });

    it('should react to user changes', () => {
        const { getByPlaceholderText } = render(el);
        const inputEl: HTMLElement = getByPlaceholderText(mockPlaceholderText);

        fireEvent.change(inputEl, { target: { value: 'abcd' } });
        expect(mockHandleChange).toBeCalled();
    });

    it('should render when given a certain icon correctly', () => {
        const { queryByTestId } = render(elWithIcon);
        const icon: HTMLElement | null = queryByTestId('icon');

        if (icon) {
            expect(true).toBe(true);
        } else fail();
    });

    it('matches snapshot', () => {
        const tree = renderer.create(el).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
