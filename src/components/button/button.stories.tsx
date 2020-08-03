import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import more addons
import Button from '.';

const story = storiesOf('button component', module);

story.add('Regular button', () => (
    <Button handleClick={action('click')}>Click me!</Button>
));
