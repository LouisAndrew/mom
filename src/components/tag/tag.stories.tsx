import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { InlineIcon } from '@iconify/react';
import home from '@iconify/icons-uil/home';

import Tag from '.';
// import more addons

const story = storiesOf('Component.Tag', module);

story
    .add('Primary tag element', () => (
        <Tag variant="primary" handleClick={action('span-click')}>
            {text('Content', 'Click')}
        </Tag>
    ))
    .add('Secondary tag element', () => (
        <Tag variant="secondary" handleClick={action('span-click')}>
            {text('Content', 'Click')}
        </Tag>
    ))
    .add('Tag element with icon', () => (
        <Tag variant="primary" handleClick={action('span-click')}>
            {text('Content', 'Click')}
            <InlineIcon icon={home} color="#F3F0F0" />
        </Tag>
    ));
