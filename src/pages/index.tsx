import React from 'react';
import { graphql } from 'gatsby';
import { get } from 'lodash';

import Layout from 'components/layout';
import { SEO } from 'components/seo';
import MainPage from 'templates/main-page';
import { FluidObject } from 'gatsby-image';
import { Property } from 'interfaces/Property';
import { theme } from 'styles';

type FluidImg = {
    childImageSharp: {
        fluid: FluidObject;
    };
};

type QueryReturn = {
    heroImg: FluidImg;
    aboutImg: FluidImg;
    hotList: any;
    responsiveImgS: any;
    responsiveImgM: any;
    responsiveImgL: any;
};

const App = (props: any) => {
    const { data } = props;
    const {
        heroImg,
        aboutImg,
        hotList,
        responsiveImgS,
        responsiveImgM,
        responsiveImgL,
    } = data as QueryReturn;

    // copy-pasted from products.tsx -> a way to add responsiveness to gatsby fixed img.\
    const fixedImgS: any = responsiveImgS.edges.map((edge: any) => {
        return {
            name: edge.node.name,
            imgs: get(edge.node, 'imgs', []).map((imgObj: any) => ({
                ...imgObj,
                image: imgObj.image.asset.fixed,
            })),
        };
    });

    const fixedImgM: any = responsiveImgM.edges.map((edge: any) => {
        return {
            name: edge.node.name,
            imgs: get(edge.node, 'imgs', []).map((imgObj: any) => ({
                ...imgObj,
                image: imgObj.image.asset.fixed,
            })),
        };
    });

    // same as above. but for larger screens
    const fixedImgL: any = responsiveImgL.edges.map((edge: any) => {
        return {
            name: edge.node.name,
            imgs: get(edge.node, 'imgs', []).map((imgObj: any) => ({
                ...imgObj,
                image: imgObj.image.asset.fixed,
            })),
        };
    });

    const hotListData: Property[] = hotList.edges.map((edge: any) => {
        const { node }: any = edge;

        const property: Property = {
            address: get(node, 'address', ''),
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
            location: get(node, 'location.locationName', ''),
            name: get(node, 'name'),
            price: get(node, 'price', 0),
            propertyType: get(node, 'propertyType', 'house'),
            saleType: get(node, 'saleType', 'sell'),
        };

        return property;
    });

    return (
        <Layout>
            <SEO />
            <MainPage
                heroImgFluid={heroImg.childImageSharp.fluid}
                aboutImgFluid={aboutImg.childImageSharp.fluid}
                hotProperties={hotListData}
            />
        </Layout>
    );
};

export const query = graphql`
    query {
        heroImg: file(relativePath: { eq: "hero-img.jpg" }) {
            childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        aboutImg: file(relativePath: { eq: "about-img-mock.jpg" }) {
            childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        hotList: allSanityProperty(filter: { isTrending: { eq: true } }) {
            edges {
                node {
                    address
                    name
                    price
                    propertyType
                    saleType
                    location {
                        locationName
                    }
                }
            }
        }
        responsiveImgS: allSanityProperty(
            filter: { isTrending: { eq: true } }
        ) {
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

        responsiveImgM: allSanityProperty(
            filter: { isTrending: { eq: true } }
        ) {
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

        responsiveImgL: allSanityProperty(
            filter: { isTrending: { eq: true } }
        ) {
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

export default App;

// 6042481188
