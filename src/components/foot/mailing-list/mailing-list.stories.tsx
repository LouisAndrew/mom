import React from 'react';
import { storiesOf } from '@storybook/react';
// import more addons
import MailingList from '.';

const story = storiesOf('Component.Footer.Mailing List', module);

story.add('Component', () => <MailingList />);
