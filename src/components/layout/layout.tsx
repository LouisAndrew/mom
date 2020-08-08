import React from 'react';
import { ThemeProvider } from 'styled-components';
// import { useStaticQuery, graphql } from 'gatsby';
import { theme, GlobalStyles } from '../../styles';
// Components
import { CSSDebugger } from '../css-debugger';
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
            <CSSDebugger />
            <main>
                <Nav />
                {children}
                <Footer />
            </main>
        </ThemeProvider>
    );
};

export { Layout };
