import React from 'react';
import { storiesOf } from '@storybook/react';

import Dropdown from './dropdown';
import Links from '.';
// import more addons

const story = storiesOf('Component.Nav.Links', module);

story
    .add('Links component', () => <Links />)
    .add('Dropdown component', () => <Dropdown expand={true} />);
