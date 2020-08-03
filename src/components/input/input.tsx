import React from 'react';
import styled from 'styled-components';
import {
    color,
    typography,
    flexbox,
    space,
    layout,
    variant as inVariant,
} from 'styled-system';

import { StylingProps, PositioningProps } from 'styles';

type Props = PositioningProps & {
    placeholderText: string;
    icon?: React.ReactNode;
    variant?: string;
    // custom input type if needed.
    inputType?: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type SProps = PositioningProps &
    StylingProps & {
        placeholderText: string;
        variant?: string;
        inputType?: string;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    };

const SInput: React.FC<SProps> = styled.input.attrs(
    ({ inputType, placeholderText }: SProps) => ({
        type: inputType,
        placeholder: placeholderText,
    })
)<SProps>`

    ${inVariant({})}

    ${color}
    ${typography}
    ${flexbox}
    ${space}
    ${layout}
`;

const Input: React.FC<Props> = ({ icon, handleChange, ...rest }) => {
    return (
        <>
            {icon}
            <SInput onChange={handleChange} {...rest} />;
        </>
    );
};

export { Input };
