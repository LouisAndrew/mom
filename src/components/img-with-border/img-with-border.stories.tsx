import React from 'react';
import { storiesOf } from '@storybook/react';

import ImgWithBorder from '.';
// import more addons

const story = storiesOf('A responsive img wrapped in a border', module);

const imgSrc =
    'https://res.cloudinary.com/dsvdffre0/image/upload/v1596016031/github-icon.png';

story
    .add('Primary border-type image', () => {
        const img: React.ReactElement = <img src={imgSrc} alt="github-logo" />;
        return <ImgWithBorder imgComponent={img} variant="primary" />;
    })
    .add('Secondary border-type image', () => {
        const img: React.ReactElement = <img src={imgSrc} alt="github-logo" />;
        return <ImgWithBorder imgComponent={img} variant="secondary" />;
    });
