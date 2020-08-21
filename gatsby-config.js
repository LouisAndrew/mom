const siteTitle = 'Agen property PIK, BSD dan sekitarnya';
const siteDescription =
    'Temukan rumah / apartment idamanmu tanpa ribet. 100% terpercaya dan tanpa ribet.';
const siteAuthor = '@louisandrew3';
const siteUrl = 'https://connie-property.com';
const siteImage = `${siteUrl}/icons/icon_512x512.png`;
const siteKeywords = ['beli rumah', 'rumah', 'sewa rumah', 'apartment'];

const path = require('path');
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    siteMetadata: {
        title: siteTitle,
        description: siteDescription,
        author: siteAuthor,
        url: siteUrl,
        keywords: siteKeywords,
        image: siteImage,
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/images`,
                name: 'images',
            },
        },
        {
            resolve: 'gatsby-plugin-react-axe',
            options: {
                showInProduction: false,
                // Options to pass to axe-core.
                // See: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#api-name-axeconfigure
                axeOptions: {
                    // Your axe-core options.
                },
            },
        },
        `gatsby-plugin-styled-components`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        'gatsby-plugin-react-helmet',
        `gatsby-plugin-typescript`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: siteTitle,
                short_name: siteTitle,
                description: siteDescription,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: 'src/images/icon.png',
                icons: [
                    {
                        src: 'icons/icon_512x512.png',
                        sizes: '512x512',
                        types: 'image/png',
                    },
                    {
                        src: 'icons/icon_192x192.png',
                        sizes: '192x192',
                        types: 'image/png',
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-root-import',
            options: {
                components: path.join(__dirname, 'src/components'),
                hooks: path.join(__dirname, 'src/hooks'),
                images: path.join(__dirname, 'src/images'),
                pages: path.join(__dirname, 'src/pages'),
                scenes: path.join(__dirname, 'src/scenes'),
                styles: path.join(__dirname, 'src/styles'),
                templates: path.join(__dirname, 'src/templates'),
                helper: path.join(__dirname, 'src/helper'),
            },
        },
        {
            resolve: `gatsby-source-sanity`,
            options: {
                projectId: `zh1i25wh`,
                dataset: `production`,
                // a token with read permissions is required
                // if you have a private dataset
                // token: process.env.SANITY_TOKEN,

                // If the Sanity GraphQL API was deployed using `--tag <name>`,
                // use `graphqlTag` to specify the tag name. Defaults to `default`.
                // graphqlTag: 'default',
            },
        },
        // {
        //     resolve: 'gatsby-plugin-react-svg',
        //     options: {
        //         rule: {
        //             include: 'src/images',
        //         },
        //     },
        // },
        `gatsby-plugin-offline`,
    ],
};
