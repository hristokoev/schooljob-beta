import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { EmailTemplate } from '@payload-types'
import { RichText } from 'src/app/(app)/_components/RichText/index'

interface EmailTemplateProps {
  blocks: EmailTemplate['blocks']
  previewText: string
  footerText: string
}

const Email = ({ blocks, previewText, footerText }: EmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>{previewText}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/logo.png`}
          width="170"
          height="50"
          alt="SchoolJob"
          style={logo}
        />
        {blocks.map((block, index) => {
          switch (block.blockType) {
            case 'Text':
              return (
                <Text key={index} style={paragraph}>
                  <RichText content={block.text} />
                </Text>
              )
            case 'Button':
              return (
                <Section key={index} style={btnContainer}>
                  <Button style={button} href={block.link}>
                    {block.text}
                  </Button>
                </Section>
              )
            default:
              return null
          }
        })}
        <Hr style={hr} />
        <Text style={footer}>{footerText}</Text>
      </Container>
    </Body>
  </Html>
)

export { Email }

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const logo = {
  margin: '0 auto',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const btnContainer = {
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#4169e1',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
}
