import { BuiltinFontData, FontData } from './types'

export const builtinFontData: readonly BuiltinFontData[] = [
  { fullName: 'serif', family: 'serif', style: 'Regular' },
  { fullName: 'sans-serif', family: 'sans-serif', style: 'Regular' },
  { fullName: 'monospace', family: 'monospace', style: 'Regular' },
] as const

// array is mutable
export const localFontData: FontData[] = []
