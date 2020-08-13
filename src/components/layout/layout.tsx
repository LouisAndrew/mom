import React from 'react';
import { ThemeProvider } from 'styled-components';
// import { useStaticQuery, graphql } from 'gatsby';
import { theme, GlobalStyles } from '../../styles';
// Components
// import { CSSDebugger } from '../css-debugger';
import Nav from 'components/nav';
import Footer from 'components/foot';

const Layout: React.FC = ({ children }) => {
    // const data = useStaticQuery(graphql`
    //     query SiteTitleQuery {
    //         site {
    //             siteMetadata {
    //                 title
    //                 description
    //             }
    //         }
    //     }
    // `);

    // const { title, description } = data.site.siteMetadata;

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            {/* <CSSDebugger /> */}
            <Nav />

            <main
                style={{
                    backgroundColor: theme.colors.bg,
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                {children}
            </main>
            <Footer />
        </ThemeProvider>
    );
};

export { Layout };
