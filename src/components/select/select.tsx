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
import arrowIcon from '@iconify/icons-uil/arrow-down';
import { CSSTransition } from 'react-transition-group';

import { PositioningProps, StylingProps, theme } from 'styles';

// TODO: handle multiple select.

/**
 * key: actual rendered text
 * value: value that would be returned when the option is selected (key text clicked)
 */
export type SelectItem = PositioningProps & {
    key: string;
    value: string;
};

type Props = PositioningProps & {
    items: SelectItem[];
    id: string; // should not contain whitespace!
    defaultOption?: string;
    multiple?: boolean;
    variant?: string;
    handleSelect: (value: string) => void;
};

type SelectContainerProps = PositioningProps &
    PositionProps & {
        variant?: string;
    };

type OptionsProps = PositioningProps &
    StylingProps & {
        children?: React.ReactNode;
        variant?: string;
        onClick: () => void;
    };

type InputProps = PositioningProps &
    StylingProps & {
        for: string;
        expand: boolean;
        variant?: string;
    };

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

    .option-container {
        overflow: hidden;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0);

        display: flex;
        flex-direction: column;
        width: fit-content;

        position: absolute;
        z-index: 2;

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

        ${position}

        &.options-enter {
            opacity: 0;
            max-height: 0;
            transform: scale(0.9);
        }

        &.options-enter-active {
            opacity: 1;
            transform: translateX(0);
            max-height: fit-content;
            transition: transform 100, max-height 200;
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
    }
`;

const Input: React.FC<InputProps> = styled.label.attrs((props: InputProps) => ({
    htmlFor: props.for,
}))<InputProps>`
    input {
        display: none;
    }

    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0);

    display: flex;
    width: fit-content;

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

    svg {
        margin-left: 8px;
        transition: .2s;
        transform: ${({ expand }: InputProps) =>
            expand && 'rotate(180deg)'} translateY(-1px) !important;
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
    }, [items, multiple, selectedValue, defaultDisplay, handleSelect]);

    useEffect(() => {
        if (expand) {
            setSelectedValue('');
        }
    }, [expand]);

    const handleChangeExpand = () => {
        setExpand(expand => !expand); // eslint-disable-line @typescript-eslint/tslint/config
    };

    const handleClickOption = (value: string) => {
        setSelectedValue(value);
        setExpand(expand => !expand); // eslint-disable-line @typescript-eslint/tslint/config
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
            variant={variant}
            flexDirection="column"
            alignItems="center"
            top={[inputHeightM, inputHeightM, inputHeightD, inputHeightD]}
            {...rest}
        >
            <Input
                for={id}
                variant={variant}
                py={[1, 1, 2, 2]}
                px={[2, 2, 3, 3]}
                expand={expand}
                alignItems="center"
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
                <div className="option-container">
                    {items.map(item => (
                        <Options
                            key={item.value}
                            onClick={() => handleClickOption(item.value)}
                            variant={variant}
                            py={[1, 1, 2, 2]}
                            px={[2, 2, 3, 3]}
                            {...typographyStyle}
                        >
                            {item.key}
                        </Options>
                    ))}
                </div>
            </CSSTransition>
        </SelectContainer>
    );
};

export { Select };
