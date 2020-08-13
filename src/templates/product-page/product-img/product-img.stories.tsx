import React from 'react';
import { storiesOf } from '@storybook/react';
import { ProductImg } from './product-img';
// import more addons

const story = storiesOf('Product Page.Product image', module);

const mockImgs = [
    {
        image:
            'https://res.cloudinary.com/dsvdffre0/image/upload/v1597137791/webaliser-_TPTXZd9mOo-unsplash_pqtm1r.jpg',
        imgAlt: 'Beautiful house',
    },
    {
        image:
            'https://res.cloudinary.com/dsvdffre0/image/upload/v1597137791/jacques-bopp-Hh18POSx5qk-unsplash_lweaht.jpg',
        imgAlt: 'Beautiful house 2',
    },
    {
        image:
            'https://res.cloudinary.com/dsvdffre0/image/upload/v1597137792/digital-marketing-agency-ntwrk-g39p1kDjvSY-unsplash_kh6gti.jpg',
        imgAlt: 'Beautiful house 3',
    },
];

story.add('Component', () => <ProductImg imgs={mockImgs} />);
