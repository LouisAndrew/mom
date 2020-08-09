import React from 'react';
import { storiesOf } from '@storybook/react';

import { Filter } from './filter';
// import more addons

const story = storiesOf('Products.Filter component', module);

story.add('Component', () => <Filter />);
