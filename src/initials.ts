import { dom } from './dom'
import { IMetrix } from './types'

export const setInitials = (m: IMetrix) => {
  // Here goes whatever requires style's loaded state

  m.props.drawX = 100
  m.props.drawY = dom.canvas.clientHeight - 100
}

export const setColors = (m: IMetrix) => {
  const getValue = (cssVar: string) => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(
      cssVar,
    )

    if (value === '') {
      console.warn(`CSS var "${cssVar}" not set`)
    }
    return value
  }

  m.props.shared.colors = {
    text: getValue('--c-text'),
    bg: getValue('--c-bg'),
  }
}
