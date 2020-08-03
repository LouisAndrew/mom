import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Card } from './card';
// import more addons

const story = storiesOf('Product card element', module);

story.add('Regular product card', () => (
    <Card
        src="https://res.cloudinary.com/dsvdffre0/image/upload/v1596016031/github-icon.png"
        alt="github-icon"
        headingText={text('Heading text', 'This is a heading text')}
        bodyText={text(
            'Body text',
            'Occaecat id sint est anim anim qui tempor officia quis cupidatat laborum. Minim eu cillum ipsum ex do cupidatat elit. Nulla magna adipisicing eu irure.'
        )}
        navigate={action('click-navigate')}
    />
));
