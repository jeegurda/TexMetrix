import { BuiltinFontData, FontData } from './types'

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
