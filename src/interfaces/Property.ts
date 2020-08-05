import { FluidObject } from 'gatsby-image';

export type Property = {
    name: string;
    address: string;
    porpertyType: 'house' | 'apartment' | 'kavling' | 'home-office';
    saleType: 'sell' | 'rent';

    // optional fields..
    imgs?: { image: string | FluidObject | FluidObject[]; imgAlt: string }[];
    description?: string;
    isTrending?: boolean;
    location?: { lat: number; lng: number };
    price?: string;
    area?: number;
    roomQty?: number;
    bathQty?: number;
};
