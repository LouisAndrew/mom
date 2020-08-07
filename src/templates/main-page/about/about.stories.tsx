import React from 'react';
import { storiesOf } from '@storybook/react';
// import more addons
import About from '.';

const story = storiesOf('Main Page.About', module);

story.add('Component', () => {
    const src =
        'https://res.cloudinary.com/dsvdffre0/image/upload/v1596841161/stefan-stefancik-QXevDflbl8A-unsplash_ei8bvp.jpg';
    const imgAlt = 'smiling-woman';
    return <About imgSrc={src} imgAlt={imgAlt} />;
});
