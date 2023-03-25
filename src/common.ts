const defFontData = [
  { fullName: 'serif', family: 'serif', style: 'Regular' },
  { fullName: 'serif', family: 'serif', style: 'Bold' },
  { fullName: 'serif', family: 'serif', style: 'Italic' },
  { fullName: 'sans-serif', family: 'sans-serif', style: 'Regular' },
  { fullName: 'sans-serif', family: 'sans-serif', style: 'Bold' },
  { fullName: 'sans-serif', family: 'sans-serif', style: 'Italic' },
  { fullName: 'monospace', family: 'monospace', style: 'Regular' },
  { fullName: 'monospace', family: 'monospace', style: 'Bold' },
  { fullName: 'monospace', family: 'monospace', style: 'Italic' },
] as const

// TODO: these three should be generated from the arr above
export const ffList = ['serif', 'sans-serif', 'monospace'] as const

export const fwList = ['Regular', 'Bold'] as const

export const fsList = ['Normal', 'Italic'] as const

// array is mutable
export const ffLocalList: string[] = []
