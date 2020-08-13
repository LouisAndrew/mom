import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import Hero from '..';
import { withReachRouter } from 'helper/reach-router';

import * as Gatsby from 'gatsby';

describe('Hero element', () => {
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');

    beforeEach(() => {
        useStaticQuery.mockImplementationOnce(() => {
            return {
                allSanityLocation: {
                    edges: [
                        {
                            node: {
                                locationName: 'Mock name',
                            },
                        },
                    ],
                },
            };
        });
    });

    afterEach(cleanup);
    const el: React.ReactElement = withReachRouter(<Hero />);
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('matches snapshot', () => {
        const tree = renderer.create(el).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
