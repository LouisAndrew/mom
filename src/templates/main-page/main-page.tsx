import React from 'react';

import Hero from './hero';
import About from './about';
import HotList from './hot-list';
import { Property } from 'interfaces/Property';
import { FluidObject } from 'gatsby-image';

type Props = {
    heroImgFluid?: FluidObject;
    aboutImgFluid?: FluidObject;
    hotProperties?: Property[];
};

// TODO: gatsby context handling!
const MainPage: React.FC<Props> = ({
    heroImgFluid,
    aboutImgFluid,
    hotProperties,
}) => {
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
            propertyType: 'house',
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
            propertyType: 'apartment',
            saleType: 'rent',
        },
        {
            name: 'Apartment 2',
            address: 'jalan Mangga 25 blok F nomor 167',
            imgs: undefined,
            propertyType: 'apartment',
            saleType: 'rent',
        },
    ];

    const src =
        'https://res.cloudinary.com/dsvdffre0/image/upload/v1596841161/stefan-stefancik-QXevDflbl8A-unsplash_ei8bvp.jpg';
    const imgAlt = 'smiling-woman';

    return (
        <>
            <Hero heroImgFluid={heroImgFluid} />
            <About imgSrc={src} imgFluidSrc={aboutImgFluid} imgAlt={imgAlt} />
            <HotList
                hotProperties={hotProperties ? hotProperties : mockProperties}
            />
        </>
    );
};

export { MainPage };
