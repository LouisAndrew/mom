export interface ColorTheme {
    bg: string;
    light: string[];
    dark: string[];
    accent: string[];
    badges: {
        saleType: {
            sell: string;
            rent: string;
        };
        propertyType: {
            house: string;
            apartment: string;
            homeOffice: string;
            kavling: string;
        };
    };
}

export const colors: ColorTheme = {
    bg: '#F3F0F0',
    // plain white!     // lighhter shade of pink.
    light: ['#FFFFFF', '#FFECEC'],
    // font color
    dark: ['#2E282A'],
    //      green accent, pink accent, stroke-shade
    accent: ['#587B7F', '#F2D9C6', '#C3C2C2'],
    //
    badges: {
        saleType: {
            sell: '#007bff',
            rent: '#6c757d',
        },

        propertyType: {
            house: '#28a745',
            apartment: '#dc3545',
            homeOffice: '#ffc107',
            kavling: '#17a2b8',
        },
    },
};
