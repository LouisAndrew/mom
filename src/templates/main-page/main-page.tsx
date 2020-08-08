import React from 'react';

import Layout from 'components/layout';
import Hero from './hero';
import About from './about';
import HotList from './hot-list';
import { Property } from 'interfaces/Property';

// TODO: gatsby context handling!
const MainPage = () => {
    const mockProperties: Property[] = [
        {
            name: 'Rumah 1',
            address: 'jalan Mangga 24 blok G nomor 167',
            imgs: [
                {
                    image:
                        'https://res.cloudinary.com/dsvdffre0/image/upload/v1595340453/ovmhcixqqpfjla4mxovf.jpg',
                    imgAlt: 'Handsome boy',
                },
            ],
            porpertyType: 'house',
            saleType: 'sell',
        },
        {
            name: 'Rumah 2',
            address: 'jalan Mangga 25 blok F nomor 167',
            imgs: [
                {
                    image:
                        'https://res.cloudinary.com/dsvdffre0/image/upload/v1596838654/felix-lam-J7fxkhtOqt0-unsplash_wcncna.jpg',
                    imgAlt: 'Lakers logo',
                },
                {
                    image:
                        'https://res.cloudinary.com/dsvdffre0/image/upload/v1595015542/sample.jpg',
                    imgAlt: 'Flower',
                },
            ],
            porpertyType: 'apartment',
            saleType: 'rent',
        },
        {
            name: 'Apartment 2',
            address: 'jalan Mangga 25 blok F nomor 167',
            imgs: undefined,
            porpertyType: 'apartment',
            saleType: 'rent',
        },
    ];

    const src =
        'https://res.cloudinary.com/dsvdffre0/image/upload/v1596841161/stefan-stefancik-QXevDflbl8A-unsplash_ei8bvp.jpg';
    const imgAlt = 'smiling-woman';

    return (
        <Layout>
            <Hero />
            <About imgSrc={src} imgAlt={imgAlt} />
            <HotList hotProperties={mockProperties} />
        </Layout>
    );
};

export { MainPage };
