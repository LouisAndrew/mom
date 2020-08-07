import React from 'react';

import styled from 'styled-components';
import {
    typography,
    color,
    space,
    layout,
    flexbox,
    position,
    PositionProps,
} from 'styled-system';
import { InlineIcon } from '@iconify/react';
import chatIcon from '@iconify/icons-uil/comment-dots';
import emailIcon from '@iconify/icons-uil/envelope';

import { OuterWrapper, theme, StylingProps, PositioningProps } from 'styles';
import MailingList from './mailing-list';
import Links from './links';
import Logo from 'components/logo';

type Props = {};

type ContainerProps = StylingProps & PositioningProps & {};
type FootContainerProps = StylingProps & PositioningProps & PositionProps & {};
type ContactContainerProps = PositioningProps & {};
type SContactProps = StylingProps & PositioningProps & {};

const Container: React.FC<ContainerProps> = styled.footer<ContainerProps>`
    width: 100%;
    display: grid;
    place-items: center;

    ${color}
    ${space}
    ${layout}
`;

const FootContainer: React.FC<FootContainerProps> = styled.div<
    FootContainerProps
>`
    ${space}
    ${color}
    ${layout}
    ${position}
`;

const ContactContainer: React.FC<ContactContainerProps> = styled.div<
    ContactContainerProps
>`
    ${space}
    ${layout}
    ${flexbox}
`;

const SContact: React.FC<SContactProps> = styled.span<SContactProps>`
    ${typography}
    ${color}
    ${space}
`;

const Footer: React.FC<Props> = () => {
    const phoneNumber = '+6281808273193';
    const emailAddr = 'mock-email@yahoo.dev';

    return (
        <Container bg="bg">
            <MailingList />
            <FootContainer
                position="relative"
                zIndex={1}
                bg="dark.0"
                width={1}
                pt={[4, 4, 8]}
                pb={[4, 4, 6]}
                css={`
                    display: grid;
                    place-items: center;
                `}
            >
                <OuterWrapper
                    position="relative"
                    width={1}
                    display="flex"
                    alignItems={['center', 'center', 'flex-start']}
                    flexDirection={['column', 'column', 'row']}
                    justifyContent={[
                        'flex-start',
                        'flex-start',
                        'space-between',
                    ]}
                    css={`
                        #logo-foot {
                            width: 175px;
                            height: 30px;

                            margin-bottom: 32px;

                            path {
                                fill: ${theme.colors.bg};
                            }

                            @media screen and (min-width: ${theme
                                    .breakpoints[1]}) {
                                height: 45px;
                            }
                        }
                    `}
                >
                    <Logo id="logo-foot" />
                    <Links />
                    <ContactContainer
                        display="flex"
                        flexDirection="column"
                        mt={[5, 5, 0]}
                    >
                        <Contact>
                            <InlineIcon
                                icon={chatIcon}
                                color={theme.colors.bg}
                            />
                            {phoneNumber}
                        </Contact>
                        <Contact>
                            <InlineIcon
                                icon={emailIcon}
                                color={theme.colors.bg}
                            />
                            {emailAddr}
                        </Contact>
                    </ContactContainer>
                </OuterWrapper>
            </FootContainer>
        </Container>
    );
};

const Contact: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <SContact
        my={[1, 1]}
        fontFamily="heading"
        fontSize={[1, 1, 2]}
        color="bg"
        textAlign={['center', 'center', 'right']}
        css={`
            & > svg {
                height: 16px;
                width: 16px;
                margin-right: 16px;

                transform: translateY(2px) !important;
            }
        `}
    >
        {children}
    </SContact>
);

export { Footer };
