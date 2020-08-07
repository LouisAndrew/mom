import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    typography,
    color,
    flexbox,
    space,
    layout,
    grid,
    position,
    variant as selectVariant,
    PositionProps,
} from 'styled-system';
import { Icon } from '@iconify/react';
import arrowIcon from '@iconify/icons-uil/angle-down';
import { CSSTransition } from 'react-transition-group';
import { debounce } from 'lodash';

import { PositioningProps, StylingProps, theme } from 'styles';

// TODO: handle multiple select.

/**
 * key: actual rendered text
 * value: value that would be returned when the option is selected (key text clicked)
 */
export type SelectItem = {
    key: string;
    value: string;
};

type Props = PositioningProps &
    PositionProps & {
        items: SelectItem[];
        id: string; // should not contain whitespace!
        optionWidth?: string | string[] | number[];
        defaultOption?: string;
        optionPadX?: number[];
        optionPadY?: number[];
        multiple?: boolean;
        variant?: string;
        handleSelect: (value: string) => void;
    };

type SelectContainerProps = PositioningProps & PositionProps & {};

type OptionsProps = PositioningProps &
    StylingProps & {
        role: string;
        tabIndex: number;
        children?: React.ReactNode;
        variant?: string;
        onClick: () => void;
        onKeyDown: () => void;
    };

type InputProps = PositioningProps &
    StylingProps &
    PositionProps & {
        for: string;
        expand: boolean;
        variant?: string;
    };

type OptionContainerProps = PositioningProps &
    PositionProps & { variant?: string };

const SelectContainer: React.FC<SelectContainerProps> = styled.div<
    SelectContainerProps
>`
    display: flex;
    width: fit-content;

    position: relative;

    ${flexbox}
    ${layout}
    ${space}
    ${grid}
`;

const OptionContainer: React.FC<OptionContainerProps> = styled.div<
    OptionContainerProps
>`
    overflow: hidden;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0);

    display: flex;
    flex-direction: column;
    width: fit-content;

    position: absolute;
    z-index: 1;
    /* transform: translate(-5%); */

    transition: 0.2s;

    ${selectVariant({
        variants: {
            primary: {
                borderColor: 'accent.2',
                boxShadow: 'blend',
            },
            secondary: {
                borderColor: 'accent.2',
                boxShadow: 'blend',
            },
        },
    })}

    /* classnames generated from csstransition! */

        &.options-enter {
        opacity: 0;
        max-height: 0;
        transform: scale(0.9) translate(-5%);
    }

    &.options-enter-active {
        opacity: 1;
        transform: scale(1) translate(-5%);
        max-height: fit-content;
    }

    &.options-exit {
        opacity: 1;
        max-height: 0;
    }

    &.options-exit-active {
        opacity: 0;
        /* transform: translate(0);s */
        transform: scale(0.9);
        max-height: fit-content;
    }

    ${position} /* positioning from styled-system props! */
    ${layout}
`;

const Input: React.FC<InputProps> = styled.label.attrs((props: InputProps) => ({
    htmlFor: props.for,
}))<InputProps>`
    input {
        display: none;
    }

    border-radius: 4px;
    border: 2px solid rgba(0, 0, 0, 0);

    display: flex;
    width: fit-content;

    position: relative;

    ${({ expand }: InputProps) =>
        selectVariant({
            variants: {
                primary: {
                    bg: 'light.0',
                    color: 'dark.0',
                    borderColor: expand ? 'accent.1' : 'accent.2',
                    boxShadow: 'blend',
                },
                secondary: {
                    bg: 'light.0',
                    color: 'dark.0',
                    borderColor: expand ? 'accent.0' : 'accent.2',
                    boxShadow: 'blend',
                },
            },
        })}

    ${flexbox}
    ${typography} 
    ${color}
    ${space}
    ${position}
    ${layout}

    svg {

        /* add absolute positioning here? */

        position: absolute;
        ${position} /* Positions expand arrow based on padding provided.. */

        /* margin-left: 8px; */
        transition: .2s;
        transform: ${({ expand }: InputProps) =>
            expand && 'rotate(180deg)'} scale(1.2) !important;
    }

    &:hover {
        cursor: pointer;
    }
`;

const Options: React.FC<OptionsProps> = styled.div<OptionsProps>`

    transition: .2s;

    ${typography}
    ${color}
    ${space}
    ${position}
    ${layout}

    ${selectVariant({
        variants: {
            primary: {
                bg: 'light.0',
                color: 'dark.0',
            },
            secondary: {
                bg: 'light.0',
                color: 'dark.0',
            },
        },
    })}

    &:hover {
        cursor: pointer;
        filter: brightness(0.9);
    }
`;

const Select: React.FC<Props> = ({
    items,
    id,
    defaultOption,
    multiple,
    variant,
    optionWidth,
    optionPadX,
    optionPadY,
    handleSelect,
    ...rest
}) => {
    const defaultOptionIfNotProvided = 'Choose one';

    const [inputDisplay, setInputDisplay] = useState('');
    const [defaultDisplay, setDefaultDisplay] = useState(
        defaultOptionIfNotProvided
    );
    const [selectedValue, setSelectedValue] = useState('');
    const [expand, setExpand] = useState(false);

    const debouncedExpand = debounce(setExpand, 200);

    useEffect(() => {
        if (defaultOption) {
            setDefaultDisplay(defaultOption);
        }
    }, []);

    useEffect(() => {
        if (selectedValue !== '') {
            handleSelect(selectedValue);

            // change input display to selected item if it is not a multiple select.
            if (!multiple) {
                const selectedSelectItem: SelectItem = items.filter(
                    item => item.value === selectedValue
                )[0];

                setInputDisplay(selectedSelectItem.key);
            }
        } else {
            setInputDisplay(defaultDisplay);
        }
    }, [selectedValue]);

    useEffect(() => {
        if (expand && selectedValue !== '') {
            setSelectedValue('');
        }
    }, [expand]);

    const handleChangeExpand = () => {
        debouncedExpand(expand => !expand); // eslint-disable-line @typescript-eslint/tslint/config
    };

    const handleClickOption = (value: string) => {
        setSelectedValue(value);
        debouncedExpand(expand => !expand); // eslint-disable-line @typescript-eslint/tslint/config
    };

    const typographyStyle: {
        fontFamily: string;
        fontSize: number[];
        fontWeight: string;
    } = {
        fontSize: [1, 1, 2, 2],
        fontFamily: 'body',
        fontWeight: 'bold',
    };

    const inputHeightM: number = theme.space[1] * 4 + theme.fontSizes[1];
    const inputHeightD: number = theme.space[2] * 3 + theme.fontSizes[2];

    return (
        <SelectContainer
            flexDirection="column"
            // alignItems="center"
            width={1} // provides 100% of parent's width to the children
            {...rest}
        >
            <Input
                for={id}
                variant={variant}
                py={optionPadY ? optionPadY : [1, 1, 2, 2]}
                pl={optionPadX ? optionPadX : [2, 2, 3, 3]}
                pr={optionPadX ? optionPadX.map(pad => 2 * pad) : [4, 4, 5, 5]}
                right={optionPadX ? optionPadX : [1, 1, 2, 2]}
                expand={expand}
                alignItems="center"
                width={optionWidth}
                {...typographyStyle}
            >
                {inputDisplay}
                <Icon
                    icon={arrowIcon}
                    color={variant ? theme.colors.dark[0] : '#C3C2C2'} // when variant not provided: color from props
                />
                <input type="checkbox" id={id} onChange={handleChangeExpand} />
            </Input>

            <CSSTransition
                in={expand}
                timeout={200}
                classNames="options"
                unmountOnExit={true}
            >
                <OptionContainer
                    variant={variant}
                    width={optionWidth}
                    top={[
                        inputHeightM,
                        inputHeightM,
                        inputHeightD,
                        inputHeightD,
                    ]}
                >
                    {items.map((item, i) => (
                        <Options
                            key={item.value}
                            onClick={() => handleClickOption(item.value)}
                            variant={variant}
                            py={optionPadY ? optionPadY : [1, 1, 2, 2]}
                            px={optionPadX ? optionPadX : [2, 2, 3, 3]}
                            width={1}
                            onKeyPress={() => handleClickOption(item.value)}
                            role="button"
                            tabIndex={i}
                            {...typographyStyle}
                        >
                            {item.key}
                        </Options>
                    ))}
                </OptionContainer>
            </CSSTransition>
        </SelectContainer>
    );
};

export { Select };
