import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { get } from 'lodash';

import { theme } from 'styles';
import Layout from 'components/layout';
import { SEO } from 'components/seo';
import Products from 'templates/products';
import { Property } from 'interfaces/Property';

const ProductPage = (props: PageProps) => {
    // const mockProperty: Property[] = [
    //     {
    //         name: 'Rumah 1',
    //         address: 'Jalan rumah 1',
    //         propertyType: 'house',
    //         saleType: 'sell',

    //         imgs: [
    //             {
    //                 image:
    //                     'https://res.cloudinary.com/dsvdffre0/image/upload/v1597137791/webaliser-_TPTXZd9mOo-unsplash_pqtm1r.jpg',
    //                 imgAlt: 'Beautiful house',
    //             },
    //         ],
    //         description: 'Deskripsi bum bum bum',
    //         location: 'Penang',
    //         price: 200,
    //         area: 125,
    //     },
    //     {
    //         name: 'Rumah 2',
    //         address: 'Jalan apartment 2',
    //         propertyType: 'apartment',
    //         saleType: 'rent',

    //         imgs: [
    //             {
    //                 image:
    //                     'https://res.cloudinary.com/dsvdffre0/image/upload/v1597137791/jacques-bopp-Hh18POSx5qk-unsplash_lweaht.jpg',
    //                 imgAlt: 'Beautiful house 2',
    //             },
    //         ],
    //         description: 'Deskripsi bum bum bum',
    //         location: 'PIK',
    //         price: 500,
    //         area: 250,
    //     },
    //     {
    //         name: 'Rumah 10',
    //         address: 'Jalan ke dufan',
    //         propertyType: 'home-office',
    //         saleType: 'rent',

    //         imgs: [
    //             {
    //                 image:
    //                     'https://res.cloudinary.com/dsvdffre0/image/upload/v1597137792/digital-marketing-agency-ntwrk-g39p1kDjvSY-unsplash_kh6gti.jpg',
    //                 imgAlt: 'Beautiful house 3',
    //             },
    //         ],
    //         description: 'Deskripsi bum bum bum',
    //         location: 'jkarta Timur',
    //         price: 700,
    //         area: 500,
    //     },
    // ];

    const { data }: any = props;

    // mapping every fixed imgs from the query into an array with its corresponding names.
    const fixedImgS: any = data.responsiveImgS.edges.map((edge: any) => {
        return {
            name: edge.node.name,
            imgs: get(edge.node, 'imgs', []).map((imgObj: any) => ({
                ...imgObj,
                image: imgObj.image.asset.fixed,
            })),
        };
    });

    const fixedImgM: any = data.responsiveImgM.edges.map((edge: any) => {
        return {
            name: edge.node.name,
            imgs: get(edge.node, 'imgs', []).map((imgObj: any) => ({
                ...imgObj,
                image: imgObj.image.asset.fixed,
            })),
        };
    });

    // same as above. but for larger screens
    const fixedImgL: any = data.responsiveImgL.edges.map((edge: any) => {
        return {
            name: edge.node.name,
            imgs: get(edge.node, 'imgs', []).map((imgObj: any) => ({
                ...imgObj,
                image: imgObj.image.asset.fixed,
            })),
        };
    });

    const propertyData: Property[] = data.properties.edges.map((edge: any) => {
        const { node }: any = edge;

        const property: Property = {
            address: get(node, 'address', ''),
            area: get(node, 'area', 0),
            bathQty: get(node, 0),
            description: get(node, ''),
            geolocation: {
                lat: get(node, 'geolocation.lat', 0),
                lng: get(node, 'geolocation.lng', 0),
            },
            // getting all img objects from the mapped array.
            imgs: fixedImgS
                // filter based on its corresponding name..
                .filter((o: any) => o.name === get(node, 'name'))[0]
                .imgs.map((imgObj: any, index: number) => {
                    // get its larger screen img from the other mapped image array.
                    const imgL: any = fixedImgL.filter(
                        (o: any) => o.name === get(node, 'name')
                    )[0].imgs[index];

                    const imgM: any = fixedImgM.filter(
                        (o: any) => o.name === get(node, 'name')
                    )[0].imgs[index];

                    return {
                        // image is an array of fluidobject -> added media here to give a sense of respnosiveness..
                        image: [
                            imgObj.image,
                            // bug here? imgL must be ABOVE the smaller img(imgM)
                            {
                                ...imgL.image,
                                media: `(min-width: ${theme.breakpoints[2]})`,
                            },
                            {
                                ...imgM.image,
                                media: `(min-width: ${theme.breakpoints[1]})`,
                            },
                        ],
                        imgAlt: imgL.imgAlt,
                    };
                }),
            isTrending: get(node, 'isTrending', false),
            location: get(node, 'location.locationName', ''),
            name: get(node, 'name'),
            price: get(node, 'price', 0),
            propertyType: get(node, 'propertyType', 'house'),
            roomQty: get(node, 'roomQty', 0),
            saleType: get(node, 'saleType', 'sell'),
        };

        return property;
    });

    return (
        <Layout>
            <SEO />
            <Products properties={propertyData} />
        </Layout>
    );
};

export default ProductPage;

export const query = graphql`
    query {
        properties: allSanityProperty {
            edges {
                node {
                    address
                    area
                    bathQty
                    description
                    geolocation {
                        lat
                        lng
                    }
                    name
                    price
                    propertyType
                    roomQty
                    saleType
                    location {
                        locationName
                    }
                    isTrending
                }
            }
        }

        responsiveImgS: allSanityProperty {
            edges {
                node {
                    name
                    imgs {
                        image {
                            asset {
                                fixed(width: 300, height: 200) {
                                    ...GatsbySanityImageFixed
                                }
                            }
                        }
                    }
                }
            }
        }

        responsiveImgM: allSanityProperty {
            edges {
                node {
                    name
                    imgs {
                        image {
                            asset {
                                fixed(width: 333, height: 222) {
                                    ...GatsbySanityImageFixed
                                }
                            }
                        }
                    }
                }
            }
        }

        responsiveImgL: allSanityProperty {
            edges {
                node {
                    name
                    imgs {
                        image {
                            asset {
                                fixed(width: 420, height: 280) {
                                    ...GatsbySanityImageFixed
                                }
                            }
                        }
                        imgAlt
                    }
                }
            }
        }
    }
`;
