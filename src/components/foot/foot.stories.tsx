import React from 'react';
import { storiesOf } from '@storybook/react';

import MailingList from './mailing-list';
// import more addons

const story = storiesOf('Component.Footer', module);

story.add('Mailing List', () => <MailingList />);
