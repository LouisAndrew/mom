import React from 'react';
import styled from 'styled-components';
import {
    color,
    typography,
    flexbox,
    space,
    layout,
    borderColor,
    boxShadow,
    variant as inVariant,
    BorderColorProps,
    BoxShadowProps,
} from 'styled-system';

import { StylingProps, PositioningProps, theme } from 'styles';

type Props = PositioningProps &
    BoxShadowProps & {
        placeholderText: string;
        // for labeling!
        id: string;
        icon?: React.ReactNode;
        variant?: string;
        // custom input type if needed.
        inputType?: string;
        color?: string;
        borderColor?: string;
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    };

type SProps = PositioningProps &
    StylingProps &
    BorderColorProps & {
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

    outline: none;
    transition: .2s;
    /* border: none; */
    border-style: solid;
    border: -2px solid rgba(0, 0, 0, 0);
    border-radius: 4px;

    position: relative;

    ${inVariant({
        variants: {
            primary: {
                borderColor: 'accent.2',
                color: 'dark',
            },
            secondary: {
                borderColor: 'accent.2',
                color: 'dark',
            },
        },
    })}

    ${borderColor}
    ${color}
    ${typography}
    ${flexbox}
    ${space}
    ${layout}
    ${boxShadow}

    &:focus, &:active {
        ${inVariant({
            variants: {
                primary: {
                    borderColor: 'accent.1',
                },
                secondary: {
                    borderColor: 'accent.0',
                },
            },
        })}
    }

    & + svg {
        position: absolute;
        left: 12px;
        top: 2px;
        transform: translate(-6px, 4px) !important;

        @media screen and (min-width: ${theme.breakpoints[1]}) {

            left: 32px;
            top: 8px;
            transform: translate(-20px, 4px) !important;
        }
    }
`;

const Input: React.FC<Props> = ({ icon, handleChange, ...rest }) => (
    <>
        <SInput
            onChange={handleChange}
            pr={[2, 2, 3, 3]}
            py={[1, 1, 2, 2]}
            pl={icon ? [4, 4, 5, 5] : [2, 2, 3, 3]}
            bg="accent.3"
            fontSize={[1, 1, 2, 2]}
            fontFamily="body"
            fontWeight="bold"
            boxShadow="blend"
            {...rest}
        />
        {icon}
    </>
);

export { Input };
