import { FixedObject, FluidObject } from 'gatsby-image';

export type Property = {
    name: string;
    address: string;
    propertyType: 'house' | 'apartment' | 'kavling' | 'home-office';
    saleType: 'sell' | 'rent';

    // optional fields..
    location?: string;
    imgs?: {
        image:
            | string
            | FluidObject
            | FluidObject[]
            | FixedObject
            | FixedObject[];
        imgAlt: string;
    }[];
    description?: string;
    isTrending?: boolean;
    geolocation?: { lat: number; lng: number };
    price?: number;
    area?: number;
    roomQty?: number;
    bathQty?: number;
};
