import React from 'react';
import { Link } from 'gatsby';

import styled from 'styled-components';
import {} from 'styled-system';

// TODO: create dropdown component

import { PositioningProps, StylingProps } from 'styles';

type Props = {};

type LinkItemProps = {
    children: React.ReactNode;
    to: string;
};

type ContainerProps = {};

type SLinkItemProps = {};

const Container: React.FC<ContainerProps> = styled.ul<ContainerProps>``;

const SLinkItem: React.FC<SLinkItemProps> = styled.li<SLinkItemProps>``;

const Links: React.FC<Props> = () => {
    return <></>;
};

const LinkItem: React.FC<LinkItemProps> = ({ children, to }) => (
    <SLinkItem>
        <Link to={to}>{children}</Link>
    </SLinkItem>
);

export default Links;
