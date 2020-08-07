import React from 'react';
import styled from 'styled-components';
import {
    space,
    typography,
    layout,
    color,
    flexbox,
    position,
    grid,
    SpaceProps,
    TypographyProps,
    LayoutProps,
    ColorProps,
    FlexboxProps,
    PositionProps,
    GridProps,
} from 'styled-system';

import { theme } from 'styles';

interface WithChildrenProps {
    children: string | React.ReactNode;
}

interface FullSystemProps
    extends SpaceProps,
        LayoutProps,
        TypographyProps,
        ColorProps,
        FlexboxProps,
        GridProps {}

const SH1: React.FC<FullSystemProps> = styled.h1<FullSystemProps>`
        ${space}
        ${typography}
        ${layout}
        ${color}
        ${flexbox}
        ${grid}
`;

const SH2: React.FC<FullSystemProps> = styled.h2<FullSystemProps>`
        ${space}
        ${typography}
        ${layout}
        ${color}
        ${flexbox}
        ${grid}
`;

const SH3: React.FC<FullSystemProps> = styled.h3<FullSystemProps>`
        ${space}
        ${typography}
        ${layout}
        ${color}
        ${flexbox}
        ${grid}

`;

const SH5: React.FC<FullSystemProps> = styled.h5<FullSystemProps>`
        ${space}
        ${color}
        ${typography}
        ${layout}
        ${flexbox}
        ${grid}

`;

const SP: React.FC<FullSystemProps> = styled.p<FullSystemProps>`
        ${space}
        ${typography}
        ${layout}
        ${color}
        ${flexbox}
        ${grid}

`;

// provide max-width to inner elements.
const SOuterWrapper: React.FC<FullSystemProps & PositionProps> = styled.div<
    FullSystemProps & PositionProps
>`
    ${space}
    ${layout}
    ${color}
    ${flexbox}
    ${position}
        ${grid}

`;

const H1: React.FC<WithChildrenProps & FullSystemProps> = ({
    children,
    ...rest // eslint-disable-line @typescript-eslint/tslint/config
}: WithChildrenProps & FullSystemProps) => {
    return (
        <SH1
            fontFamily="heading"
            fontWeight="extraBold"
            fontSize={[4, 5, 6, 6]}
            {...rest}
        >
            {children}
        </SH1>
    );
};

const H2: React.FC<WithChildrenProps & FullSystemProps> = ({
    children,
    ...rest // eslint-disable-line @typescript-eslint/tslint/config
}: WithChildrenProps & FullSystemProps) => {
    return (
        <SH2 fontFamily="heading" fontSize={[4, 4, 5, 5]} {...rest}>
            {children}
        </SH2>
    );
};
const H3: React.FC<WithChildrenProps & FullSystemProps> = ({
    children,
    ...rest // eslint-disable-line @typescript-eslint/tslint/config
}: WithChildrenProps & FullSystemProps) => {
    return (
        <SH3 fontFamily="heading" fontSize={[3, 3, 4, 4]} {...rest}>
            {children}
        </SH3>
    );
};

const H5: React.FC<WithChildrenProps & FullSystemProps> = ({
    children,
    ...rest // eslint-disable-line @typescript-eslint/tslint/config
}: WithChildrenProps & FullSystemProps) => {
    return (
        <SH5 fontFamily="heading" {...rest} fontSize={[0, 0, 1, 1]}>
            {children}
        </SH5>
    );
};

const P: React.FC<WithChildrenProps & FullSystemProps> = ({
    children,
    ...rest // eslint-disable-line @typescript-eslint/tslint/config
}: WithChildrenProps & FullSystemProps) => {
    return (
        <SP fontFamily="body" fontSize={[1, 1, 2, 2]} {...rest}>
            {children}
        </SP>
    );
};

const OuterWrapper: React.FC<WithChildrenProps &
    FullSystemProps &
    PositionProps> = ({ children, ...rest }) => (
    <SOuterWrapper
        maxWidth={[
            '100%',
            theme.breakpoints[0],
            theme.breakpoints[1],
            theme.breakpoints[2],
        ]}
        {...rest}
    >
        {children}
    </SOuterWrapper>
);

export { H1, H2, H3, H5, P, OuterWrapper };
