import React from 'react';
import {
    GoogleMap,
    Marker,
    withGoogleMap,
    withScriptjs,
} from 'react-google-maps';

import styled from 'styled-components';
import { layout, flexbox, space } from 'styled-system';

import { Property } from 'interfaces/Property';
import { H2, P, OuterWrapper, PositioningProps } from 'styles';
import ProductImg from './product-img';
import Detail from './detail';
import { ImgObject } from './product-img/product-img';

type ContainerProps = PositioningProps & {};

type UpperProps = PositioningProps & {};

type DescProps = PositioningProps & {};

const Desc: React.FC<DescProps> = styled.div<DescProps>`
    ${space}
`;

const Upper: React.FC<UpperProps> = styled.div<UpperProps>`
    ${flexbox}

    ${layout}
`;

const Container: React.FC<ContainerProps> = styled.div<ContainerProps>`
    display: grid;
    place-items: center;

    @supports not (place-items: center) {
        justify-items: center;
        align-items: center;
    }

    ${layout}
    ${space}
`;

type Props = {
    property: Property;
};

const ProductPageTemplate: React.FC<Props> = ({ property }) => {
    const {
        name,
        description,
        location,
        saleType,
        propertyType,
        geolocation,
        address,
        bathQty,
        roomQty,
        area,
        price,
        imgs,
    } = property;

    const GoogleMapsComponent: any = withScriptjs(
        withGoogleMap(({ lat, lng }) => (
            <GoogleMap
                defaultZoom={16}
                defaultCenter={{
                    lat,
                    lng,
                }}
            >
                <Marker
                    position={{
                        lat,
                        lng,
                    }}
                />
            </GoogleMap>
        ))
    );

    return (
        <Container py={[8, 8, 9]}>
            <OuterWrapper
                width={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <Upper
                    display="flex"
                    flexDirection={['column', 'column', 'column', 'row']}
                    alignItems={['center', 'center', 'center', 'unset']}
                >
                    <ProductImg
                        imgs={
                            imgs !== undefined
                                ? imgs.map(o => o as ImgObject)
                                : []
                        }
                    />
                    <Detail
                        address={address}
                        name={name}
                        location={location}
                        saleType={saleType}
                        propertyType={propertyType}
                        bathQty={bathQty}
                        roomQty={roomQty}
                        area={area}
                        price={price}
                        width={[300, 400]}
                        alignItems={[
                            'center',
                            'center',
                            'center',
                            'flex-start',
                        ]}
                        pl={[0, 0, 4, 6]}
                    />
                </Upper>

                <Desc py={[4]}>
                    <H2 textAlign="center" my={[2, 2, 3]}>
                        Informasi lebih lanjut
                    </H2>
                    <P textAlign="center">
                        {description
                            ? description
                            : 'Maaf, informasi lebih lanjut tidak tersedia'}
                    </P>
                </Desc>
                {geolocation && geolocation.lat !== 0 ? (
                    <Container width={1}>
                        <H2 textAlign="center" my={[2, 2, 3]}>
                            Cek lokasi
                        </H2>
                        <GoogleMapsComponent
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}&callback=initMap`}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={
                                <div
                                    style={{ height: `400px`, width: '100%' }}
                                />
                            }
                            mapElement={
                                <div
                                    style={{ height: `100%`, width: '100%' }}
                                />
                            }
                            {...geolocation}
                        />
                    </Container>
                ) : (
                    <></>
                )}
            </OuterWrapper>
        </Container>
    );
};

export { ProductPageTemplate };
