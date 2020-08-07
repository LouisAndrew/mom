import React from 'react';
import styled from 'styled-components';
import {} from 'styled-system';

import { OuterWrapper } from 'styles';
import MailingList from './mailing-list';

type Props = {};

type ContainerProps = {};
type FootContainerProps = {};

const Container: React.FC<ContainerProps> = styled.footer<ContainerProps>`
    width: 100%;
    display: grid;
    place-items: center;
`;

const FootContainer: React.FC<FootContainerProps> = styled.div<
    FootContainerProps
>``;

const Footer: React.FC<Props> = () => {
    return (
        <Container>
            <MailingList />
            <OuterWrapper
                display="flex"
                alignItems="center"
                flexDirection="column"
            >
                <FootContainer />
            </OuterWrapper>
        </Container>
    );
};
export { Footer };
