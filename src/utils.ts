import {
  Align,
  Baseline,
  BuiltinFontData,
  FontMap,
  FsEnum,
  FwEnum,
} from './types'

const debounce = (fn: (...args: unknown[]) => unknown, delay: number) => {
  let t: null | number = null

  return (...args: unknown[]) => {
    typeof t === 'number' && clearTimeout(t)

    t = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

const validateSelectValue = <T>(
  value: string,
  enumObj: typeof Align | typeof Baseline | typeof FwEnum | typeof FsEnum,
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
  fw: string,
  fs: string,
): string => {
  switch (fs) {
    case 'Normal':
    case 'Italic':
      fs = fs.toLowerCase()
      break
    default:
      console.warn('Unknown fs: %o. Using normal', fw)
      fs = 'normal'
  }
  switch (fw) {
    case 'Regular':
      fw = 'normal'
      break
    case 'Bold':
      fw = fw.toLowerCase()
      break
    default:
      console.warn('Unknown fw: %o. Using normal', fw)
      fw = 'normal'
  }

  return `${fs} ${fw} ${size}px ${ff}`
}

const getFonts = (fd: readonly BuiltinFontData[]) => {
  const fontMap: FontMap = fd.reduce((acc, c) => {
    let record =
      acc[c.family] || (acc[c.family] = { fs: [FsEnum.NORMAL], fw: [] })

    switch (c.style) {
      case 'Italic':
        record.fs ?? (record.fs = [])
        record.fs.push(FsEnum.ITALIC)
        break
      case 'Bold':
        record.fw ?? (record.fw = [])
        record.fw.push(FwEnum.BOLD)
        break
      case 'Regular':
        // skip (for font-style only) - assume every font a non-cursive variant (defined at initialization)

        record.fw ?? (record.fw = [])
        record.fw.push(FwEnum.REGULAR)
        break
      default:
        console.warn('Unknown "style" for setting font-style: %o', c.style)
    }

    return acc
  }, {} as FontMap)

  const validateFontMap = (fm: FontMap) => {
    Object.entries(fm).forEach(([k, v]) => {
      if (v) {
        if (v.fw.length === 1) {
          console.warn('%o font record has only 1 weight')
        }
      } else {
        console.warn('%o font record missing value')
      }
    })
  }

  return fontMap
}

export { debounce, validateSelectValue, te, getFontString, getFonts }
