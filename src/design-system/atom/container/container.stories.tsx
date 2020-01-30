import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { Container } from '.'
import mdx from './container.mdx'

export default {
  title: 'atom|Container',
  component: Container,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: 'Container Component',
    docs: {
      page: mdx,
    },
  },
}

export const basic = () => <Container>Basic Container</Container>
