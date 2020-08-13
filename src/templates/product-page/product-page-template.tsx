import React from 'react';
import { PageProps, graphql } from 'gatsby';
import { get } from 'lodash';

import { theme } from 'styles';

import Layout from 'components/layout';
import { SEO } from 'components/seo';
import ProductPageTemplate from '.';
import { Property } from 'interfaces/Property';

const ProductPageT = (props: PageProps) => {
    const { data }: any = props;

    const fixedImgS: any = {
        imgs: get(data.responsiveImgS, 'imgs', []).map((imgObj: any) => ({
            image: imgObj.image.asset.fixed,
        })),
    };

    const fixedImgM: any = {
        imgs: get(data.responsiveImgM, 'imgs', []).map((imgObj: any) => ({
            image: imgObj.image.asset.fixed,
        })),
    };

    // same as above. but for larger screens
    const fixedImgL: any = {
        imgs: get(data.responsiveImgL, 'imgs', []).map((imgObj: any) => ({
            ...imgObj,
            image: imgObj.image.asset.fixed,
        })),
    };

    const node = data.property;

    const propertyData: Property = {
        address: get(node, 'address', ''),
        area: get(node, 'area', 0),
        bathQty: get(node, 0),
        description: get(node, ''),
        geolocation: {
            lat: get(node, 'geolocation.lat', 0),
            lng: get(node, 'geolocation.lng', 0),
        },
        // getting all img objects from the mapped array.
        imgs: fixedImgS.imgs.map((imgObj: any, index: number) => {
            // get its larger screen img from the other mapped image array.
            const imgL: any = fixedImgL.imgs[index];

            const imgM: any = fixedImgM.imgs[index];

            return {
                // image is an array of fluidobject -> added media here to give a sense of respnosiveness..
                image: [
                    imgObj.image,
                    // bug here? imgL must be ABOVE the smaller img(imgM)
                    {
                        ...imgL.image,
                        media: `(min-width: ${theme.breakpoints[1]})`,
                    },
                    {
                        ...imgM.image,
                        media: `(min-width: ${theme.breakpoints[0]})`,
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

    return (
        <Layout>
            <SEO />
            <ProductPageTemplate property={propertyData} />
        </Layout>
    );
};

export const query = graphql`
    query($name: String!) {
        property: sanityProperty(name: { eq: $name }) {
            address
            area
            bathQty
            description
            geolocation {
                lat
                lng
            }
            isTrending
            name
            location {
                locationName
            }
            price
            propertyType
            roomQty
            saleType
        }

        responsiveImgS: sanityProperty(name: { eq: $name }) {
            imgs {
                image {
                    asset {
                        fixed(width: 270, height: 180) {
                            ...GatsbySanityImageFixed
                        }
                    }
                }
            }
        }

        responsiveImgM: sanityProperty(name: { eq: $name }) {
            imgs {
                image {
                    asset {
                        fixed(width: 330, height: 222) {
                            ...GatsbySanityImageFixed
                        }
                    }
                }
            }
        }

        responsiveImgL: sanityProperty(name: { eq: $name }) {
            imgs {
                image {
                    asset {
                        fixed(width: 450, height: 300) {
                            ...GatsbySanityImageFixed
                        }
                    }
                }
                imgAlt
            }
        }
    }
`;

export default ProductPageT;
