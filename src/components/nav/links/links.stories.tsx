import React from 'react';
import { storiesOf } from '@storybook/react';

import Dropdown from './dropdown';
// import more addons

const story = storiesOf('Component.Nav.Links', module);

story.add('Dropdown component', () => <Dropdown />);
