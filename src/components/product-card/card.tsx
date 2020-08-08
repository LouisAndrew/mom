import React from 'react';
import styled from 'styled-components';
import {
    flexbox,
    space,
    layout,
    color,
    border,
    boxShadow,
    BorderProps,
    BoxShadowProps,
} from 'styled-system';
import Img, { FluidObject } from 'gatsby-image';

import { PositioningProps, H3, H2, P, StylingProps } from 'styles';
import Button from 'components/button';
import Tag from 'components/tag';

export type Props = PositioningProps & {
    headingText: string;
    bodyText: string;
    alt: string;
    price?: string;
    src?: string;
    tags?: {
        text: string;
        tagType: 'SALE_TYPE' | 'PROPERTY_TYPE' | string;
        handleClick?: () => void;
    }[];
    fluid?: FluidObject | FluidObject[] | undefined;
    navigate: () => void;
};

type ContainerProps = PositioningProps & BoxShadowProps & {};

type DetailsContainerProps = PositioningProps & StylingProps & BorderProps & {};

type TagsWrapperProps = PositioningProps & {};

type ImgBoxProps = PositioningProps & {};

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`

    ${flexbox}
    ${space}
    ${color}
    ${layout}
    ${boxShadow}
`;

const DetailsContainer: React.FC<DetailsContainerProps> = styled.div<
    DetailsContainerProps
>`
    ${flexbox}
    ${space}
    ${layout}
    ${border}
    ${color}
`;

const TagsWrapper: React.FC<TagsWrapperProps> = styled.div<TagsWrapperProps>`
    ${layout}
    ${flexbox}
`;

const ImgBox: React.FC<ImgBoxProps> = styled.div<ImgBoxProps>`
    ${layout}
`;

const Card: React.FC<Props> = ({
    headingText,
    bodyText,
    fluid,
    src,
    price,
    alt,
    tags,
    navigate,
    ...rest
}) => {
    return (
        <Container
            flexDirection="column"
            alignItems="center"
            justifyContent={['center', 'center', 'space-evenly']}
            boxShadow="blend"
            width="fit-content"
            {...rest}
        >
            {/* img aspect ratio is about 3:2 */}
            {/* ImgBox serves as a container to help retain the aspect ratio.  */}
            <ImgBox
                overflow="hidden"
                css={`
                    position: relative;
                    border-top-right-radius: 4px;
                    border-top-left-radius: 4px;

                    &::after {
                        display: block;
                        content: '';
                        padding-top: 66.6%;
                    }

                    & > img {
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        width: 100%;
                    }
                `}
            >
                {fluid ? (
                    <Img fluid={fluid} alt={alt} />
                ) : (
                    // TODO: change / to a remote url: show that image is not found
                    <img src={src ? src : '/'} alt={alt} />
                )}
            </ImgBox>
            <DetailsContainer
                display="flex"
                flexDirection="column"
                alignItems={['flex-start']}
                px={[3, 3, 4]}
                py={[3, 3, 4]}
                width={'auto'}
                bg="light.0"
                borderWidth={1}
                borderStyle="solid"
                borderColor="accent.2"
                css={`
                    border-bottom-right-radius: 4px;
                    border-bottom-left-radius: 4px;
                `}
            >
                <H3 textAlign={'left'}>{headingText}</H3>
                <P my={3} textAlign={['left']}>
                    {bodyText}
                </P>
                <TagsWrapper
                    alignSelf={['flex-start']}
                    css={`
                        width: fit-content;
                    `}
                >
                    {tags &&
                        tags.map((tag, i) => (
                            <Tag
                                key={`${headingText}-${tag.text}`}
                                handleClick={tag.handleClick}
                                variant={
                                    tag.tagType === 'SALE_TYPE'
                                        ? 'primary'
                                        : tag.tagType === 'PROPERTY_TYPE'
                                        ? 'secondary'
                                        : 'default'
                                }
                                tabIndex={i}
                                mx={[2]}
                            >
                                {tag.text}
                            </Tag>
                        ))}
                </TagsWrapper>
                <H2 textAlign="right" py={[2]} alignSelf="flex-end">
                    {price}
                </H2>
                <Button
                    handleClick={navigate}
                    variant="secondary-outer"
                    ml={[2]}
                    alignSelf={['center']}
                    width={[1]}
                >
                    More info
                </Button>
            </DetailsContainer>
        </Container>
    );
};

export { Card };
