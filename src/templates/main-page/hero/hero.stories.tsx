import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
// import more addons
import Hero from '.';
import HeroForm from './hero-form';

const story = storiesOf('Main Page.Hero', module);

story
    .add('Hero component', () => <Hero />)
    .add('Hero Form', () => {
        const headingText: string = text(
            'Heading text',
            'Siapa bilang cari rumah jaman searang susah?'
        );
        const bodyText: string = text(
            'Body text',
            'Cari rumah idamanmu sekarang! Cukup cantumkan kriteria mu, tanpa ribet'
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
