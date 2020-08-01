import React from 'react';
import styled from 'styled-components';
import {
    space,
    typography,
    layout,
    color,
    flexbox,
    SpaceProps,
    TypographyProps,
    LayoutProps,
    ColorProps,
    FlexboxProps,
} from 'styled-system';

interface WithChildrenProps {
    children: string;
}

interface FullSystemProps
    extends SpaceProps,
        LayoutProps,
        TypographyProps,
        ColorProps,
        FlexboxProps {}

const SH1: React.FC<FullSystemProps> = styled.h1<FullSystemProps>`
        ${space}
        ${typography}
        ${layout}
        ${color}
        ${flexbox}
`;

const SH2: React.FC<FullSystemProps> = styled.h2<FullSystemProps>`
        ${space}
        ${typography}
        ${layout}
        ${color}
        ${flexbox}
`;

const SH3: React.FC<FullSystemProps> = styled.h3<FullSystemProps>`
        ${space}
        ${typography}
        ${layout}
        ${color}
        ${flexbox}
`;

const SH5: React.FC<FullSystemProps> = styled.h5<FullSystemProps>`
        ${space}
        ${color}
        ${typography}
        ${layout}
        ${flexbox}
`;

const SP: React.FC<FullSystemProps> = styled.p<FullSystemProps>`
        ${space}
        ${typography}
        ${layout}
        ${color}
        ${flexbox}
`;

const H1: React.FC<WithChildrenProps & FullSystemProps> = ({
    children,
    ...rest // eslint-disable-line @typescript-eslint/tslint/config
}: WithChildrenProps & FullSystemProps) => {
    return (
        <SH1 fontFamily="heading" fontSize={[5, 5, 6, 6]} {...rest}>
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
        <SP fontFamily="body" fontSize={[2, 2, 3, 3]} {...rest}>
            {children}
        </SP>
    );
};

export { H1, H2, H3, H5, P };
