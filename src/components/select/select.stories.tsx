import React from 'react';
import { storiesOf } from '@storybook/react';

import { SelectItem } from './select';
import Select from '.';
// import more addons

const story = storiesOf('Select element', module);

story
    .add('Primary select element', () => {
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

        const handleSelect = (value: string) => {
            console.log(value);
        };
        const defaultOption = 'Choose one';
        const mockId = 'test-select';

        return (
            <Select
                items={mockOptions}
                handleSelect={handleSelect}
                defaultOption={defaultOption}
                id={mockId}
                variant="primary"
            />
        );
    })

    .add('Secondary select element', () => {
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

        const handleSelect = (value: string) => {
            console.log(value);
        };
        const defaultOption = 'Choose one';
        const mockId = 'test-select';

        return (
            <Select
                items={mockOptions}
                handleSelect={handleSelect}
                defaultOption={defaultOption}
                id={mockId}
                variant="secondary"
            />
        );
    })
    .add('Primary multiple select element', () => {
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

        const handleSelect = (value: string) => {
            console.log(value);
        };
        const defaultOption = 'Choose one';
        const mockId = 'test-select';

        return (
            <Select
                items={mockOptions}
                handleSelect={handleSelect}
                defaultOption={defaultOption}
                id={mockId}
                multiple={true}
                variant="primary"
            />
        );
    });
