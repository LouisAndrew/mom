import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Icon } from '@iconify/react';
import accessibleIcon from '@iconify/icons-uil/accessible-icon-alt';

import { Input } from './input';
import { theme } from 'styles';
// import more addons

const story = storiesOf('Input element', module);

story
    .add('Primary input element', () => (
        <Input
            id="input"
            handleChange={action('user-change')}
            placeholderText="Change here!"
            variant="primary"
        />
    ))
    .add('Secondary input element', () => (
        <Input
            id="input"
            handleChange={action('user-change')}
            placeholderText="Change here!"
            variant="secondary"
        />
    ))
    .add('Primary input element with icon', () => (
        <Input
            id="input"
            handleChange={action('user-change')}
            placeholderText="Change here!"
            icon={<Icon icon={accessibleIcon} color={theme.colors.accent[1]} />}
            variant="primary"
        />
    ))
    .add('Custom input element', () => (
        <Input
            id="input"
            handleChange={action('user-change')}
            placeholderText="Change here!"
            borderColor={theme.colors.dark[0]}
        />
    ));
