import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import HeroForm from '.';
// import more addons

const story = storiesOf('Main Page.Hero', module);

story.add('Hero Form', () => {
    const headingText: string = text(
        'Heading text',
        'Heading text about finding a house'
    );
    const bodyText: string = text(
        'Body text',
        'Exercitation aute eu nostrud do sit labore ex minim reprehenderit ut ipsum veniam ad laborum. Minim eiusmod sint officia ipsum ad dolore Lorem sunt tempor ut. Esse in elit exercitation elit ex laborum nulla do veniam amet. Ut est reprehenderit nisi laboris. In amet ea ut elit nulla officia ex. Est exercitation aliqua sunt nostrud enim velit non duis ipsum ea officia.'
    );
    const allLocations: string[] = ['PIK', 'Muara Karang', 'BSD'];

    const mockSubmitForm = (location: string, area: number) => {
        console.log({ location, area });
    };

    return (
        <HeroForm
            submitForm={mockSubmitForm}
            allLocations={allLocations}
            headingText={headingText}
            bodyText={bodyText}
        />
    );
});
