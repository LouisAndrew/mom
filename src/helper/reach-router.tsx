import React from 'react';
import { LocationProvider } from '@reach/router';

const withReachRouter = (el: any) => <LocationProvider>{el}</LocationProvider>;

export { withReachRouter };
