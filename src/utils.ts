import { Align, Baseline, BuiltinFontData, FontMap } from './types'

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
  enumObj: typeof Align | typeof Baseline,
): T => {
  const values: string[] = Object.values(enumObj)

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

const getFontString = (
  size: number,
  ff: string,
  fsBold: boolean,
  fsItalic: boolean,
): string => {
  return `${fsItalic ? 'italic' : 'normal'} ${
    fsBold ? 'bold' : 'normal'
  } ${size}px ${ff}`
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

export { debounce, validateEnumValue, te, getFontString, getFonts }
