import { Align, Baseline } from './types'

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
  enumObj: typeof Align | typeof Baseline,
): T => {
  const values: string[] = Object.values(enumObj)
  // const valuesStr: string[] = values
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
    default:
      console.warn('Unknown fw: %o. Using normal', fw)
      fw = 'normal'
  }

  return `${fs} ${fw} ${size}px ${ff}`
}

export { debounce, validateSelectValue, te, getFontString }
