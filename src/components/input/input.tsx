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
    grid,
    position,
    BorderColorProps,
    BoxShadowProps,
    PositionProps,
} from 'styled-system';

import { StylingProps, PositioningProps, theme } from 'styles';

type Props = PositioningProps &
    StylingProps &
    BorderColorProps & {
        placeholderText: string;
        // for labeling!
        id: string;
        icon?: React.ReactNode;
        variant?: string;
        value?: any;
        // custom input type if needed.
        inputType?: string;
        append?: boolean;
        appendContent?: string;
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    };

type SProps = PositioningProps &
    StylingProps &
    BorderColorProps &
    BoxShadowProps & {
        placeholderText: string;
        value?: any;
        variant?: string;
        inputType?: string;
        append?: boolean;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    };

type SAppendProps = PositioningProps &
    StylingProps &
    PositionProps &
    BoxShadowProps & {};

type InputGroupProps = PositioningProps & {
    children?: React.ReactNode;
};

const SInput: React.FC<SProps> = styled.input.attrs(
    ({ inputType, placeholderText, value }: SProps) => ({
        type: inputType,
        placeholder: placeholderText,
        value,
    })
)<SProps>`

    outline: none;
    transition: .2s;
    /* border: none; */
    border: 2px solid rgba(0, 0, 0, 0);
    border-radius: 4px;

    position: relative;
    display: block;
    width: fit-content;

    ${inVariant({
        variants: {
            primary: {
                bg: 'light.0',
                color: 'dark',
                borderColor: 'accent.2',
                '& + span': {
                    borderColor: 'accent.2',
                },
            },
            secondary: {
                bg: 'light.0',
                color: 'dark',
                borderColor: 'accent.2',
                '& + span': {
                    borderColor: 'accent.2',
                },
            },
            filter: {
                bg: 'dark.1',
                color: 'bg',
                borderColor: 'dark.2',
                '& + span': {
                    borderColor: 'accent.2',
                },
            },
        },
    })}

    &::after {
        content: '%'
    }

    &:focus, &:active {
        ${inVariant({
            variants: {
                primary: {
                    borderColor: 'accent.1',
                },
                secondary: {
                    borderColor: 'accent.0',
                },
                filter: {
                    borderColor: 'accent.0',
                },
            },
        })}

        & + span {
            ${({ append }: SProps) =>
                append &&
                inVariant({
                    variants: {
                        primary: {
                            bg: 'accent.1',
                            color: 'dark.0',
                            borderColor: 'accent.1',
                        },
                        secondary: {
                            bg: 'accent.0',
                            color: 'bg',
                            borderColor: 'accent.0',
                        },
                        filter: {
                            bg: 'dark.1',
                            color: 'bg',
                            borderColor: 'dark.2',
                        },
                    },
                })}
        }
    }

    /* if type: number -> remove arrows. */
    &[type=number] {
        -moz-appearance: textfield;
    }

    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
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

    ${borderColor}
    ${color}
    ${typography}
    ${flexbox}
    ${space}
    ${layout}
    ${boxShadow}
    ${grid}

    border-right: ${({ append }: SProps) =>
        append && '0px solid rgba(0, 0, 0, 0)'};
    border-top-right-radius: ${({ append }: SProps) => append && '0px'};
    border-bottom-right-radius: ${({ append }: SProps) => append && '0px'};
`;

const SAppend: React.FC<SAppendProps> = styled.span<SAppendProps>`

    /* display: block; */
    position: relative;

    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 2px solid rgba(0, 0, 0, 0);

    transition: .2s;

    ${typography}
    ${boxShadow}
    ${position}
    ${space}
    ${color}
`;

const InputGroup: React.FC<InputGroupProps> = styled.div<InputGroupProps>`
    display: flex;
`;

const Input: React.FC<Props> = ({
    icon,
    append,
    appendContent,
    handleChange,
    ...rest
}) => {
    // provide append element to add element at the end of the input
    return !append ? (
        <>
            <SInput
                onChange={handleChange}
                pr={[2, 2, 3]}
                py={[1, 1, 2]}
                pl={icon ? [4, 4, 5, 5] : [2, 2, 3]}
                fontSize={[1, 1, 2, 2]}
                fontFamily="body"
                fontWeight="bold"
                // boxShadow="blend"
                {...rest}
            />
            {icon}
        </>
    ) : (
        <InputGroup>
            <SInput
                onChange={handleChange}
                pr={[2, 2, 3]}
                py={[1, 1, 2]}
                pl={icon ? [4, 4, 5, 5] : [2, 2, 3, 3]}
                fontSize={[1, 1, 2, 2]}
                fontFamily="body"
                fontWeight="bold"
                // boxShadow="blend"
                append={append}
                {...rest}
            />
            {icon}
            <SAppend
                bg="accent.2"
                py={[1, 1, 2]}
                px={[2, 2, 3]}
                fontSize={[1, 1, 2, 2]}
                fontFamily="body"
                fontWeight="bold"
                // boxShadow="blend"
                {...rest}
            >
                {appendContent}
            </SAppend>
        </InputGroup>
    );
};

export { Input };
