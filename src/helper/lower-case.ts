export const createSlug = (name: string): string =>
    name
        .toLowerCase()
        .split(' ')
        .join('-');
