import React from 'react';
import styled from 'styled-components';
import {
    color,
    space,
    flexbox,
    layout,
    ColorProps,
    SpaceProps,
} from 'styled-system';

import { OuterWrapper, H2, PositioningProps } from 'styles';
import { Property } from 'interfaces/Property';
import { Props as CardProps, Card } from 'components/product-card/card';

// hotProperties: fetched from gatsby and will be limited to either 3 or 4.
type Props = {
    hotProperties: Property[];
};

type ContainerProps = ColorProps & SpaceProps & {};

type HotListBoxProps = PositioningProps & {};

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    display: grid;
    place-items: center;

    ${color}
    ${space}
`;

const HotListBox: React.FC<HotListBoxProps> = styled.div<HotListBoxProps>`
    ${flexbox} 
    ${space} 
    ${layout}
`;

const HotList: React.FC<Props> = ({ hotProperties }) => {
    const headingText = 'Lagi hot!! 🔥🔥🔥';

    const navigateTo = (link: string) => {
        console.log(link);
    };

    const hotPropertiesToRender: CardProps[] = hotProperties.map(property => {
        const { name, address, /* saleType, porpertyType, */ imgs } = property;
        // check if the property contains an image
        // Todo: provide a default image.
        const imgSrc =
            imgs !== undefined && imgs.length > 0 ? imgs[0] : undefined;
        const item: CardProps = {
            headingText: name,
            bodyText: address,
            alt: imgSrc ? imgSrc.imgAlt : 'No image provided',
            // if typeof imgSrc.image is string -> means img hasn't been formatted to fluid.
            src:
                imgSrc && typeof imgSrc.image === 'string'
                    ? imgSrc.image
                    : undefined,
            // if type is not string -> img has been formatted to fluid, as the type is either string or FluidObject and/or FluidObject[]
            fluid:
                imgSrc && typeof imgSrc.image !== 'string'
                    ? imgSrc.image
                    : undefined,

            navigate: () => {
                navigateTo(name);
            },
        };

        return item;
    });

    return (
        <Container
            bg="bg"
            py={[5, 5, 6]}
            css={`
                @media screen and (max-width: 768px) and (min-height: 568px) {
                    position: relative;
                    top: -3vh;
                }
            `}
        >
            <OuterWrapper>
                <H2 mb={[4, 4, 5]} textAlign="center">
                    {headingText}
                </H2>
                <HotListBox
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    alignItems="center"
                >
                    {hotPropertiesToRender.map(propertyCard => (
                        <Card
                            my={[5, 5, 6]}
                            mx={['5%', '2.5%', '5%']}
                            key={propertyCard.headingText}
                            width={[0.9, 0.45, 0.4]}
                            {...propertyCard}
                        />
                    ))}
                </HotListBox>
            </OuterWrapper>
        </Container>
    );
};

export { HotList };
