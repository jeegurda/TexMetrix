import { BuiltinFontData, FontData } from './types'

export const builtinFontData: readonly BuiltinFontData[] = [
  { family: 'serif', style: 'Regular' },
  { family: 'serif', style: 'Bold' },
  { family: 'serif', style: 'Italic' },
  { family: 'sans-serif', style: 'Regular' },
  { family: 'sans-serif', style: 'Bold' },
  { family: 'sans-serif', style: 'Italic' },
  { family: 'monospace', style: 'Regular' },
  { family: 'monospace', style: 'Bold' },
  { family: 'monospace', style: 'Italic' },
] as const

// array is mutable
export const localFontData: FontData[] = []
