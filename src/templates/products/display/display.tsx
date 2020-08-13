import React from 'react';
import { find } from 'lodash';
import { useNavigate } from '@reach/router';

import styled from 'styled-components';
import { layout, flexbox, space, color } from 'styled-system';

import { StylingProps, PositioningProps } from 'styles';
import { Property } from 'interfaces/Property';
import Card from 'components/product-card';
import { FixedObject, FluidObject } from 'gatsby-image';
import { selectSaleTypeItems, selectPropertyTypeItems } from '../products';
import { createSlug } from 'helper/lower-case';

type ContainerProps = PositioningProps & StylingProps & {};

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    ${layout}
    ${space}
    ${flexbox}
    ${color}
`;

type Props = {
    display: Property[];
    blur: boolean;
    handleSelectLocations: (value: string) => void;
    handleSelectSaleType: (value: string) => void;
    handleSelectPropertyType: (value: string) => void;
    applyFilters: () => void;
};

const Display: React.FC<Props> = ({
    display,
    blur,
    handleSelectLocations,
    handleSelectPropertyType,
    handleSelectSaleType,
    applyFilters,
}) => {
    const navigate = useNavigate();

    return (
        <Container
            display="flex"
            flexDirection={['column', 'column', 'row']}
            alignItems={['center', 'center', 'unset']}
            flexWrap="wrap"
            width={1}
            minHeight={'60vh'}
            bg="bg"
            css={`
                transition: 0.2s;
                filter: ${blur && 'blur(8px)'};
            `}
        >
            {display.map(property => {
                const {
                    name,
                    address,
                    location,
                    price,
                    imgs,
                    propertyType,
                    saleType,
                } = property;

                type Tag = {
                    text: string | undefined;
                    tagType: string;
                    handleClick: () => void;
                };

                type ImgProps = {
                    alt: string;
                    src?: string;
                    fluid?: FluidObject | FluidObject[];
                    fixed?: FixedObject | FixedObject[];
                };

                const navigateTo = (link: string) => {
                    navigate(`/products/${createSlug(link)}`, {
                        replace: false,
                    });
                };

                const tags: (Tag | undefined)[] = [
                    location
                        ? {
                              text: location,
                              tagType: 'location',
                              handleClick: () => {
                                  handleSelectLocations(location);
                                  applyFilters();
                              },
                          }
                        : undefined,
                    propertyType
                        ? {
                              text: find(
                                  selectPropertyTypeItems,
                                  o => o.value === propertyType
                              )?.key,
                              tagType: propertyType,
                              handleClick: () => {
                                  handleSelectPropertyType(propertyType);
                                  applyFilters();
                              },
                          }
                        : undefined,
                    saleType
                        ? {
                              text: find(
                                  selectSaleTypeItems,
                                  o => o.value === saleType
                              )?.key,
                              tagType: saleType,
                              handleClick: () => {
                                  handleSelectSaleType(saleType);
                                  applyFilters();
                              },
                          }
                        : undefined,
                ];

                const isImgArrayExist: boolean =
                    imgs !== undefined && imgs.length > 0;

                // should check if imgs exist one more time, otherwise ts throws an error.
                const isMainImageFluid: boolean =
                    imgs !== undefined &&
                    isImgArrayExist &&
                    typeof imgs[0].image !== 'string';

                // explicit casting here: to overcome the type error because property.img could
                // have the type of string (regular src) or FluidObject (gatsby-image format)
                const imgProps: ImgProps = {
                    alt: isImgArrayExist && imgs ? imgs[0].imgAlt : 'No-image',
                    // fluid:
                    //     isImgArrayExist && imgs && isMainImageFluid
                    //         ? (imgs[0].image as FluidObject | FluidObject[])
                    //         : undefined,
                    fixed:
                        isImgArrayExist && imgs && isMainImageFluid
                            ? (imgs[0].image as FixedObject | FixedObject[])
                            : undefined,
                    src:
                        isImgArrayExist && imgs && !isMainImageFluid
                            ? (imgs[0].image as string)
                            : undefined,
                };

                return (
                    <Card
                        key={name}
                        headingText={name}
                        bodyText={address}
                        price={price}
                        // casted to overcome an error that says tags is an array of undefined.
                        tags={tags.filter(tag => tag !== undefined) as Tag[]}
                        navigate={() => {
                            navigateTo(name);
                        }}
                        {...imgProps}
                        // start of styling props
                        width={[0.9, 0.8, 0.45, 0.4]}
                        mx={['0', '0', '2.5%', '5%']}
                        my={[3, 3]}
                    />
                );
            })}
        </Container>
    );
};

export { Display };
