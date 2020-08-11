import React from 'react';

import styled from 'styled-components';
import { layout, flexbox, space, color } from 'styled-system';

import { StylingProps, PositioningProps } from 'styles';
import { Property } from 'interfaces/Property';
import Card from 'components/product-card';
import { FluidObject } from 'gatsby-image';

type ContainerProps = PositioningProps & {};

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    ${layout}
    ${space}
    ${flexbox}
`;

type Props = {
    display: Property[];
};

const Display: React.FC<Props> = ({ display }) => {
    return (
        <Container display="flex" flexWrap="wrap" width={1}>
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
                    text: string;
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
                                  console.log(location);
                              },
                          }
                        : undefined,
                    propertyType
                        ? {
                              text: propertyType,
                              tagType: propertyType,
                              handleClick: () => {
                                  console.log(propertyType);
                              },
                          }
                        : undefined,
                    saleType
                        ? {
                              text: saleType,
                              tagType: saleType,
                              handleClick: () => {
                                  console.log(saleType);
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
