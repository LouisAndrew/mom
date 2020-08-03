import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Icon } from '@iconify/react';
import adobeIcon from '@iconify/icons-uil/adobe';

// import Button from '..';
import Button from '..';

describe('Button element', () => {
    const mockHandleClick = jest.fn(() => {});
    const mockInnerText: string = 'Click me!';

    afterEach(cleanup);
    const el: React.ReactElement = (
        <Button handleClick={mockHandleClick}>{mockInnerText}</Button>
    );
    const elWithIcon: React.ReactElement = (
        <Button handleClick={mockHandleClick}>
            <Icon data-testid="icon" icon={adobeIcon} />
            {mockInnerText}
        </Button>
    );
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('should render and react to user changes correctly', () => {
        const { getByText } = render(el);

        const buttonEl: HTMLElement = getByText(mockInnerText);
        fireEvent.click(buttonEl);
        expect(mockHandleClick).toBeCalled();
    });

    it('should render with icon correctly', () => {
        const { queryByTestId } = render(elWithIcon);
        const iconEl: HTMLElement | null = queryByTestId('icon');

        if (iconEl) {
            // if query is successful = test successful!
            expect(iconEl).toBeInTheDocument();
        } else fail();
    });

    it('matches snapshot', () => {
        const tree = renderer.create(el).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
