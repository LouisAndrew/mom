import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import more addons
import { Icon } from '@iconify/react';
import accessibleIcon from '@iconify/icons-uil/accessible-icon-alt';

import { theme } from 'styles';
import Button from '.';

const story = storiesOf('button component', module);

story
    .add('Primary button', () => (
        <Button handleClick={action('click')} variant="primary">
            Click me!
        </Button>
    ))
    .add('Secondary button', () => (
        <Button handleClick={action('click')} variant="secondary">
            Click me!
        </Button>
    ))
    .add('Primary button with icon', () => (
        <Button handleClick={action('click')} variant="primary">
            {<Icon icon={accessibleIcon} color={theme.colors.bg} />}
            Click me!
        </Button>
    ))
    .add('Secondary button with icon', () => (
        <Button handleClick={action('click')} variant="secondary">
            {<Icon icon={accessibleIcon} color={theme.colors.dark[0]} />}
            Click me!
        </Button>
    ))
    .add('Custom button', () => (
        <Button
            handleClick={action('click')}
            color={theme.colors.bg}
            bg={theme.colors.dark[0]}
        >
            {<Icon icon={accessibleIcon} color={theme.colors.bg} />}
            Click me!
        </Button>
    ));
