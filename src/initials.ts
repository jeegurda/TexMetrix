import { dom } from './dom'
import { IMetrix } from './types'
import { getCssVarValue } from './utils'

export const setInitials = (m: IMetrix) => {
  // Here goes whatever requires style's loaded state

  m.props.drawX = 100
  m.props.drawY = dom.canvas.clientHeight - 100
}

export const setColors = (m: IMetrix) => {
  let theme: 'dark' | 'light' = 'dark'

  const prefersLight =
    dom.disableDarkTheme.checked ||
    matchMedia('(prefers-color-scheme: light)').matches

  if (prefersLight) {
    theme = 'light'
  } else {
    theme = 'dark'
  }

  dom.document.classList.toggle('light', prefersLight)
  dom.document.classList.toggle('dark', !prefersLight)

  m.props.shared.colors = {
    text: getCssVarValue('--c-text'),
    bg: getCssVarValue('--c-bg'),
  }

  m.props.style.actualBb.color = theme === 'light' ? '#000000' : '#ffffff'
}
