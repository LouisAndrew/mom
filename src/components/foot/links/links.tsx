import React from 'react';
import { Link } from '@reach/router';

import styled from 'styled-components';
import {
    typography,
    space,
    layout,
    flexbox,
    TypographyProps,
} from 'styled-system';

import { PositioningProps, theme } from 'styles';

type Props = PositioningProps & {};

type ContainerProps = PositioningProps & {};

type LinkItemProps = {
    children: React.ReactNode;
    to: string;
};

type SLinkItemProps = TypographyProps & {};

const Container: React.FC<ContainerProps> = styled.ul<ContainerProps>`
    ${space}
    ${layout}
    ${flexbox}
`;

const SLinkItem: React.FC<SLinkItemProps> = styled.li<SLinkItemProps>`
    ${typography}
`;

const Links: React.FC<Props> = ({ ...rest }) => {
    const linkItems: { text: string; to: string }[] = [
        {
            text: 'Home',
            to: '/',
        },
        {
            text: 'Katalog',
            to: '/',
        },
    ];

    return (
        <Container {...rest}>
            {linkItems.map(item => (
                <LinkItem key={`foot-to-${item.text}`} to={item.to}>
                    {item.text}
                </LinkItem>
            ))}
        </Container>
    );
};

const LinkItem: React.FC<LinkItemProps> = ({ children, to }) => {
    return (
        <SLinkItem
            fontSize={[2, 2]}
            fontFamily="heading"
            textAlign={['center', 'center', 'left']}
            css={`
                a {
                    text-decoration: none;
                    color: ${theme.colors.bg};
                }
            `}
        >
            <Link to={to}>{children}</Link>
        </SLinkItem>
    );
};

export { Links };
