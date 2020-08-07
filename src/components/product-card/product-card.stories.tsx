import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Card } from './card';
// import more addons

const story = storiesOf('Component.Product card element', module);

story
    .add('Component', () => (
        <Card
            src="https://res.cloudinary.com/dsvdffre0/image/upload/v1596838654/felix-lam-J7fxkhtOqt0-unsplash_wcncna.jpg"
            alt="github-icon"
            headingText={text('Heading text', 'This is a heading text')}
            bodyText={text('Body text', 'Isi alamat rumah disini, sbg contoh')}
            navigate={action('click-navigate')}
        />
    ))
    .add('Component with tags', () => (
        <Card
            src="https://res.cloudinary.com/dsvdffre0/image/upload/v1596838654/felix-lam-J7fxkhtOqt0-unsplash_wcncna.jpg"
            alt="github-icon"
            headingText={text('Heading text', 'This is a heading text')}
            bodyText={text('Body text', 'Isi alamat rumah disini, sbg contoh')}
            tags={[
                {
                    text: 'Sell',
                    tagType: 'SALE_TYPE',
                    handleClick: action('click-sell'),
                },
                {
                    text: 'Rumah',
                    tagType: 'PROPERTY_TYPE',
                    handleClick: action('click-rumah'),
                },
            ]}
            price="1.3 M"
            navigate={action('click-navigate')}
        />
    ));
