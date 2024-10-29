import * as React from 'react';

import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text
} from '@react-email/components';

export interface ConfirmEmailAddressProps {
  validationCode?: string;
}

const baseUrl =
  process.env.WEB_SITE_BASE_URL || 'https://portal.cocomastudiosindia.com';

const logoUrl = `${baseUrl}/static/media/app_name.fbcba9e59effd263721435a17795df5c.svg`;
const websiteName = 'cocoma digital';

export const ConfirmEmailAddressTemplate = ({
  validationCode
}: ConfirmEmailAddressProps) => (
  <Html>
    <Head />
    <Preview>Confirm your email address</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img src={`${logoUrl}`} width="120" height="36" alt={websiteName} />
        </Section>
        <Heading style={h1}>Confirm your email address</Heading>
        <Text style={heroText}>
          Your confirmation code is below - enter it in your open browser window
          and we'll help you get signed in.
        </Text>

        <Section style={codeBox}>
          <Text style={confirmationCodeText}>{validationCode}</Text>
        </Section>

        <Text style={text}>
          If you didn't request this email, there's nothing to worry about, you
          can safely ignore it.
        </Text>

        <Section>
          <Row style={footerLogos}>
            <Column style={{ width: '66%' }}>
              <Img
                src={`${logoUrl}`}
                width="120"
                height="36"
                alt="cocomastudiosindia"
              />
            </Column>
            <Column>
              <Section>
                <Row>
                  <Column>
                    <Link href="/">
                      <Img
                        src={`${logoUrl}`}
                        width="32"
                        height="32"
                        alt="cocomastudiosindia"
                        style={socialMediaIcon}
                      />
                    </Link>
                  </Column>
                  <Column>
                    <Link href="/">
                      <Img
                        src={`${baseUrl}/static/cocomastudiosindia-facebook.png`}
                        width="32"
                        height="32"
                        alt="cocomastudiosindia"
                        style={socialMediaIcon}
                      />
                    </Link>
                  </Column>
                  <Column>
                    <Link href="/">
                      <Img
                        src={`${baseUrl}/static/cocomastudiosindia-linkedin.png`}
                        width="32"
                        height="32"
                        alt="cocomastudiosindia"
                        style={socialMediaIcon}
                      />
                    </Link>
                  </Column>
                </Row>
              </Section>
            </Column>
          </Row>
        </Section>

        <Section>
          <Link
            style={footerLink}
            href="https://portal.cocomastudiosindia.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Our blog
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href="https://portal.cocomastudiosindia.com//legal"
            target="_blank"
            rel="noopener noreferrer"
          >
            Policies
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href="https://portal.cocomastudiosindia.com/help"
            target="_blank"
            rel="noopener noreferrer"
          >
            Help center
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href="https://portal.cocomastudiosindia.com//community"
            target="_blank"
            rel="noopener noreferrer"
            data-auth="NotApplicable"
            data-linkindex="6"
          >
            Community
          </Link>
          <Text style={footerText}>
            ©2024 Technologies, LLC company. <br />
            INDIA <br />
            <br />
            All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const footerText = {
  fontSize: '12px',
  color: '#b7b7b7',
  lineHeight: '15px',
  textAlign: 'left' as const,
  marginBottom: '50px'
};

const footerLink = {
  color: '#b7b7b7',
  textDecoration: 'underline'
};

const footerLogos = {
  marginBottom: '32px',
  paddingLeft: '8px',
  paddingRight: '8px',
  width: '100%'
};

const socialMediaIcon = {
  display: 'inline',
  marginLeft: '32px'
};

const main = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
};

const container = {
  margin: '0 auto',
  padding: '0px 20px'
};

const logoContainer = {
  marginTop: '32px'
};

const h1 = {
  color: '#1d1c1d',
  fontSize: '36px',
  fontWeight: '700',
  margin: '30px 0',
  padding: '0',
  lineHeight: '42px'
};

const heroText = {
  fontSize: '20px',
  lineHeight: '28px',
  marginBottom: '30px'
};

const codeBox = {
  background: 'rgb(245, 244, 245)',
  borderRadius: '4px',
  marginBottom: '30px',
  padding: '40px 10px'
};

const confirmationCodeText = {
  fontSize: '30px',
  textAlign: 'center' as const,
  verticalAlign: 'middle'
};

const text = {
  color: '#000',
  fontSize: '14px',
  lineHeight: '24px'
};
