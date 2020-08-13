import React from 'react';
import { find, get } from 'lodash';

import styled from 'styled-components';
import { layout, flexbox, space } from 'styled-system';
import { InlineIcon } from '@iconify/react';
import areaIcon from '@iconify/icons-bx/bxs-area';
import bathIcon from '@iconify/icons-bx/bxs-bath';
import roomIcon from '@iconify/icons-bx/bxs-bed';
import waIcon from '@iconify/icons-uil/whatsapp';

import { H1, H3, H2, PositioningProps, theme } from 'styles';
import Button from 'components/button';
import {
    selectSaleTypeItems,
    selectPropertyTypeItems,
} from 'templates/products/products';
import { contact } from 'helper/consts';

type ContainerProps = PositioningProps & {};

type TagContainerProps = PositioningProps & {};

const TagContainer: React.FC<TagContainerProps> = styled.div<TagContainerProps>`
    ${space}
    ${flexbox}
`;

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    ${layout}
    ${flexbox}
    ${space}
`;

type Props = PositioningProps & {
    name: string;
    address: string;
    area?: number;
    price?: number;
    roomQty?: number;
    bathQty?: number;
    location?: string;
    saleType: string;
    propertyType: string;
};

const Detail: React.FC<Props> = ({
    name,
    address,
    area,
    price,
    roomQty,
    bathQty,
    location,
    saleType,
    propertyType,
    ...rest
}) => {
    return (
        <Container display="flex" flexDirection="column" {...rest}>
            <H1 textAlign={['center', 'center', 'center', 'left']}>
                {name}
                <TagContainer
                    mb={[3, 3, 4]}
                    css={`
                        & > span {
                            display: inline-block;
                            width: 'fit-content';

                            border-radius: 4px;
                            padding: 4px 8px;
                            margin: 0 8px;

                            font-size: 18px;

                            @media screen and (min-width: ${theme
                                    .breakpoints[1]}) {
                                font-size: 24px;
                            }
                        }
                    `}
                >
                    {saleType && (
                        <>
                            <span
                                style={{
                                    border: `2px solid ${
                                        saleType === 'sell'
                                            ? theme.colors.badges.saleType.sell
                                            : theme.colors.badges.saleType.rent
                                    }`,
                                    color:
                                        saleType === 'sell'
                                            ? theme.colors.badges.saleType.sell
                                            : theme.colors.badges.saleType.rent,
                                }}
                            >
                                {
                                    find(
                                        selectSaleTypeItems,
                                        o => o.value === saleType
                                    )?.key
                                }
                            </span>
                        </>
                    )}
                    {propertyType && (
                        <>
                            <span
                                style={{
                                    border: `2px solid ${get(
                                        theme.colors.badges.propertyType,
                                        propertyType,
                                        ''
                                    )}`,
                                    color: get(
                                        theme.colors.badges.propertyType,
                                        propertyType,
                                        ''
                                    ),
                                    // marginLeft: 32,
                                }}
                            >
                                {
                                    find(
                                        selectPropertyTypeItems,
                                        o => o.value === propertyType
                                    )?.key
                                }
                            </span>
                        </>
                    )}
                </TagContainer>
            </H1>
            <H3
                my={[2]}
                textAlign={['left']}
                width={1}
                // css={`
                //     white-space: nowrap;
                // `}
            >
                {address}
                {location && (
                    <span
                        style={{
                            padding: '4px 8px',
                            borderRadius: 4,
                            border: `2px solid ${theme.colors.accent[0]}`,
                            color: theme.colors.accent[0],
                            marginLeft: 32,
                        }}
                    >
                        {location}
                    </span>
                )}
            </H3>
            <TagContainer
                my={[2, 2, 3]}
                alignSelf="flex-start"
                css={`
                    h3 > svg {
                        margin-right: 16px;
                    }
                `}
            >
                {area && area > 0 ? (
                    <H3>
                        <InlineIcon icon={areaIcon} />
                        {area}
                    </H3>
                ) : (
                    <></>
                )}
                {roomQty && roomQty > 0 ? (
                    <H3>
                        <InlineIcon icon={roomIcon} />
                        {roomQty}
                    </H3>
                ) : (
                    <></>
                )}
                {bathQty && bathQty > 0 ? (
                    <H3>
                        <InlineIcon icon={bathIcon} />
                        {bathQty}
                    </H3>
                ) : (
                    <></>
                )}
            </TagContainer>
            {price && (
                <H2 alignSelf="flex-end">
                    {price / 1000 < 1 ? `${price} Jt` : `${price / 1000} M`}
                </H2>
            )}
            <Button
                handleClick={contact}
                variant="primary"
                width={1}
                mt={[2, 2, 3]}
                css={`
                    & > svg {
                        margin-right: 16px;
                        transform: scale(1.6) !important;
                    }
                `}
            >
                <InlineIcon icon={waIcon} />
                Hubungi Saya
            </Button>
        </Container>
    );
};

export { Detail };
