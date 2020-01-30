import styled, { css } from 'styled-components'
import {
  marginMixin,
  paddingMixin,
  formatMarginPadding,
} from '../../mixins/margin-padding'

interface ContainerProps {
  display?: string
  centered?: boolean
  bg?: string
}

export const Container = styled.div<ContainerProps>`
  ${marginMixin}
  ${paddingMixin}

  ${({ display }) =>
    display &&
    css`
      display: ${display};
    `}
  
  ${({ centered }) =>
    centered && formatMarginPadding({ left: 'auto', right: 'auto' }, 'margin')}
  
  ${({ bg, theme }) =>
    bg &&
    theme.colors[bg] &&
    css`
      background-color: ${theme.colors[bg]};
    `}  
`
