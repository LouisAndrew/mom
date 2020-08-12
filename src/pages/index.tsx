import React from 'react';
import { graphql } from 'gatsby';

import Layout from 'components/layout';
import { SEO } from 'components/seo';
import MainPage from 'templates/main-page';
import { FluidObject } from 'gatsby-image';

type FluidImg = {
    childImageSharp: {
        fluid: FluidObject;
    };
};

type QueryReturn = {
    heroImg: FluidImg;
    aboutImg: FluidImg;
};

const App = (props: any) => {
    const { data } = props;
    const { heroImg, aboutImg } = data as QueryReturn;

    return (
        <Layout>
            <SEO />
            <MainPage
                heroImgFluid={heroImg.childImageSharp.fluid}
                aboutImgFluid={aboutImg.childImageSharp.fluid}
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
    }
`;

export default App;

// 6042481188
