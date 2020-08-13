const path = require('path');

const createSlug = name =>
    name
        .toLowerCase()
        .split(' ')
        .join('-');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await graphql(`
        query {
            allSanityProperty {
                edges {
                    node {
                        name
                    }
                }
            }
        }
    `);

    result.data.allSanityProperty.edges.forEach(({ node }) => {
        createPage({
            path: `/products/${createSlug(node.name)}`,
            component: path.resolve(
                './src/templates/product-page/product-page-template.tsx'
            ),
            context: {
                name: node.name,
            },
        });
    });
};
