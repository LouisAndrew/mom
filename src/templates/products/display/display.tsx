import React from 'react';
import { find } from 'lodash';

import styled from 'styled-components';
import { layout, flexbox, space, color } from 'styled-system';

import { StylingProps, PositioningProps } from 'styles';
import { Property } from 'interfaces/Property';
import Card from 'components/product-card';
import { FluidObject } from 'gatsby-image';
import { selectSaleTypeItems, selectPropertyTypeItems } from '../products';

type ContainerProps = PositioningProps & StylingProps & {};

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    ${layout}
    ${space}
    ${flexbox}
    ${color}
`;

type Props = {
    display: Property[];
    handleSelectLocations: (value: string) => void;
    handleSelectSaleType: (value: string) => void;
    handleSelectPropertyType: (value: string) => void;
    applyFilters: () => void;
};

const Display: React.FC<Props> = ({
    display,
    handleSelectLocations,
    handleSelectPropertyType,
    handleSelectSaleType,
    applyFilters,
}) => {
    return (
        <Container display="flex" flexWrap="wrap" width={1} bg="bg">
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
                };

                const navigateTo = () => {
                    console.log(name);
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
                    fluid:
                        isImgArrayExist && imgs && isMainImageFluid
                            ? (imgs[0].image as FluidObject | FluidObject[])
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
                        price={
                            price
                                ? price / 1000 < 1
                                    ? `${price} Jt`
                                    : `${price} M`
                                : undefined
                        }
                        // casted to overcome an error that says tags is an array of undefined.
                        tags={tags.filter(tag => tag !== undefined) as Tag[]}
                        navigate={navigateTo}
                        {...imgProps}
                        // start of styling props
                        width={[0.9, 0.8, 0.45, 0.4]}
                        mx={['5%', '10%', '2.5%', '5%']}
                        my={[3, 3]}
                    />
                );
            })}
        </Container>
    );
};

export { Display };
