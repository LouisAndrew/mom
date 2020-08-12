import React from 'react';
import { graphql } from 'gatsby';

import Layout from 'components/layout';
import { SEO } from 'components/seo';
import Products from 'templates/products';
import { Property } from 'interfaces/Property';

const ProductPage = (props: any) => {
    const mockProperty: Property[] = [
        {
            name: 'Rumah 1',
            address: 'Jalan rumah 1',
            propertyType: 'house',
            saleType: 'sell',

            imgs: [
                {
                    image:
                        'https://res.cloudinary.com/dsvdffre0/image/upload/v1597137791/webaliser-_TPTXZd9mOo-unsplash_pqtm1r.jpg',
                    imgAlt: 'Beautiful house',
                },
            ],
            description: 'Deskripsi bum bum bum',
            location: 'Penang',
            price: 200,
            area: 125,
        },
        {
            name: 'Rumah 2',
            address: 'Jalan apartment 2',
            propertyType: 'apartment',
            saleType: 'rent',

            imgs: [
                {
                    image:
                        'https://res.cloudinary.com/dsvdffre0/image/upload/v1597137791/jacques-bopp-Hh18POSx5qk-unsplash_lweaht.jpg',
                    imgAlt: 'Beautiful house 2',
                },
            ],
            description: 'Deskripsi bum bum bum',
            location: 'PIK',
            price: 500,
            area: 250,
        },
        {
            name: 'Rumah 10',
            address: 'Jalan ke dufan',
            propertyType: 'home-office',
            saleType: 'rent',

            imgs: [
                {
                    image:
                        'https://res.cloudinary.com/dsvdffre0/image/upload/v1597137792/digital-marketing-agency-ntwrk-g39p1kDjvSY-unsplash_kh6gti.jpg',
                    imgAlt: 'Beautiful house 3',
                },
            ],
            description: 'Deskripsi bum bum bum',
            location: 'jkarta Timur',
            price: 700,
            area: 500,
        },
    ];

    return (
        <Layout>
            <SEO />
            <Products properties={mockProperty} />
        </Layout>
    );
};

export default ProductPage;

// export const query = graphql`

// `
