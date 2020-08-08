import React from 'react';
import { storiesOf } from '@storybook/react';
import { MainPage } from './main-page';
// import more addons

const story = storiesOf('Main Page', module);

story.add('Component', () => <MainPage />);
