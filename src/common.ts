import { BuiltinFontData } from './types'

export const builtinFontData: readonly BuiltinFontData[] = [
  {
    postscriptName: 'serif',
    fullName: 'Browser serif',
    family: 'serif',
    style: '(browser)',
  },
  {
    postscriptName: 'sans-serif',
    fullName: 'Browser sans-serif',
    family: 'sans-serif',
    style: '(browser)',
  },
  {
    postscriptName: 'monospace',
    fullName: 'Browser monospace',
    family: 'monospace',
    style: '(browser)',
  },
] as const

export const mlOffset = 30
export const mtOffset = 10

export const addBlProps = [
  { dProp: 'alphabeticBl', mProp: 'alphabeticBaseline' },
  { dProp: 'ideographicBl', mProp: 'ideographicBaseline' },
  { dProp: 'hangingBl', mProp: 'hangingBaseline' },
] as const

export const colors = {
  background: '#202020',
  color: '#cecece',
}
