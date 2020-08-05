import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
import '@storybook/addon-knobs/register';
import '@storybook/addon-a11y/register';
import '@storybook/addon-viewport/register';
import 'storybook-addon-responsive-views/register';

import { addParameters } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

addParameters({
    info: { inline: true },
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    },
});
