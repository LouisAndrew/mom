import React from 'react';
import { storiesOf } from '@storybook/react';

import { Filter } from './filter';
// import more addons

const story = storiesOf('Products.Filter', module);

story.add('Component', () => (
    <Filter
        locationOptions={[]}
        saleTypeOptions={[]}
        propTypeOptions={[]}
        price={{ min: 0, max: 0 }}
        area={{ min: 0, max: 0 }}
        handleChangeAddress={() => {
            return;
        }}
        handleSelectLocations={() => {
            return;
        }}
        handleSelectSaleType={() => {
            return;
        }}
        handleSelectPropertyType={() => {
            return;
        }}
        handleChangeArea={() => {
            return;
        }}
        handleChangePrice={() => {
            return;
        }}
    />
));
