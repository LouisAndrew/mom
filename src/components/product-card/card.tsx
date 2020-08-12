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
    price?: number;
    src?: string;
    tags?: {
        text: string | undefined;
        tagType: string;
        handleClick?: () => void;
    }[];
    fluid?: FluidObject | FluidObject[] | undefined;
    fixed?: FixedObject | FixedObject[] | undefined;
    navigate: () => void;
};

type ContainerProps = PositioningProps &
    BoxShadowProps &
    BorderProps &
    StylingProps & {};

type DetailsContainerProps = PositioningProps & StylingProps & BorderProps & {};

type TagsWrapperProps = PositioningProps & {};

type ImgBoxProps = PositioningProps & {};

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`

    ${flexbox}
    ${space}
    ${color}
    ${layout}
    ${boxShadow}
    ${border}
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
    fixed,
    src,
    price,
    alt,
    tags,
    navigate,
    ...rest
}) => {
    return (
        <Container
            display="flex"
            flexDirection="column"
            overflow="hidden"
            alignItems="center"
            justifyContent={'space-between'}
            maxWidth={[300, 300, 420]}
            boxShadow="blend"
            borderRadius="4px"
            bg="light.0"
            borderWidth={1}
            borderStyle="solid"
            borderColor="accent.2"
            {...rest}
        >
            {/* img aspect ratio is about 3:2 */}
            {/* ImgBox serves as a container to help retain the aspect ratio.  */}
            <div style={{ width: '100%' }}>
                <ImgBox
                    overflow="hidden"
                    width={[1]}
                    height={['auto']}
                    css={`
                        position: relative;
                        border-top-right-radius: 4px;
                        border-top-left-radius: 4px;

                        display: grid;
                        place-items: center;

                        & > img {
                            position: absolute;
                            top: 0;
                            left: 0;
                            height: 100% !important;
                            width: 100%;
                        }
                    `}
                >
                    {fluid || fixed ? (
                        <Img
                            fluid={fluid}
                            alt={alt}
                            fixed={fixed}
                            imgStyle={{ objectFit: 'contain' }}
                        />
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
                    width={1}
                    // height={'100%'}
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
                        display="flex"
                        alignSelf={['flex-start']}
                        flexWrap="wrap"
                        width={1}
                    >
                        {tags &&
                            tags.map((tag, i) => (
                                <Tag
                                    key={`${headingText}-${tag.text}`}
                                    handleClick={tag.handleClick}
                                    variant={tag.tagType}
                                    tabIndex={i}
                                    mx={[2]}
                                    my={[1]}
                                >
                                    {tag.text}
                                </Tag>
                            ))}
                    </TagsWrapper>
                </DetailsContainer>
            </div>
            <DetailsContainer px={[3, 3, 4]} py={[3, 3, 4]} width={1}>
                <H2 textAlign="right" py={[2]} alignSelf="flex-end">
                    {price / 1000 < 1 ? `${price} Jt` : `${price / 1000} M`}
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
