import React from 'react';
import { storiesOf } from '@storybook/react';
// import more addons
import About from '.';

const story = storiesOf('Main Page.About', module);

story.add('Component', () => {
    const src =
        'https://res.cloudinary.com/dsvdffre0/image/upload/v1596016031/github-icon.png';
    const imgAlt = 'github-icon';
    return <About imgSrc={src} imgAlt={imgAlt} />;
});
