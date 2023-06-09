import { dom } from './dom'
import { BuiltinFontData, FontMap, IMetrix } from './types'

const debounce = (fn: (...args: unknown[]) => unknown, delay: number) => {
  let t: null | number = null

  return (...args: unknown[]) => {
    typeof t === 'number' && clearTimeout(t)

    t = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

const validateEnumValue = <T>(
  value: string,
  enumObj: {
    [k: string]: T | string
  },
): T => {
  const values = Object.values(enumObj)

  if (values.includes(value)) {
    return value as T
  }
  console.warn(
    '%o does not exist in enum %o. Using %o',
    value,
    enumObj,
    values[0],
  )
  return values[0] as T
}

const te: (msg?: string, err?: ErrorConstructor) => never = (
  msg = 'Unknown',
  err = Error,
) => {
  throw new err(msg)
}

const getFontString = (m: IMetrix, size?: number): string => {
  return `${m.font.useItalic ? 'italic' : 'normal'} ${
    m.font.useWeight ? m.font.fw : ''
  } ${size ?? m.font.size}px ${m.font.useFs ? m.font.fs : m.font.ff}`
}

const getFonts = (fd: readonly BuiltinFontData[]) => {
  const fontMap: FontMap = fd.reduce(
    (acc: FontMap, { family, fullName, style, postscriptName }) => {
      let record = acc[family] || (acc[family] = [])

      record.push({ fullName, style, postscriptName })

      return acc
    },
    {},
  )

  const validateFontMap = (fm: FontMap) => {
    Object.entries(fm).forEach(([k, v]) => {
      if (v) {
        if (v.length === 0) {
          console.warn('%o font record has no variants', k)
        }
      } else {
        console.warn('%o font record missing value', k)
      }
    })
  }

  validateFontMap(fontMap)

  return fontMap
}

const getCssVarValue = (cssVar: string) => {
  const value = getComputedStyle(dom.document).getPropertyValue(cssVar)

  if (value === '') {
    console.warn(`CSS var "${cssVar}" not set`)
  }
  return value
}

export {
  debounce,
  validateEnumValue,
  te,
  getFontString,
  getFonts,
  getCssVarValue,
}
