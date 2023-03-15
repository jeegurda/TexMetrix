export enum Align {
  START = 'start',
  CENTER = 'center',
  END = 'end',
}

export enum Baseline {
  ALPHABETIC = 'alphabetic',
  BOTTOM = 'bottom',
  HANGING = 'hanging',
  IDEOGRAPHIC = 'ideographic',
  MIDDLE = 'middle',
  TOP = 'top',
}

export type Metrix = {
  props: {
    rw: number
    rh: number

    drawX: number
    drawY: number

    scaleMp: number

    text: string
    fs: number
    align: Align
    baseline: Baseline
    rr: number

    rest?: any // TEMP: remove
  }
  draw: () => void
  init: () => void
}

declare global {
  // TEMP: remove
  interface Window {
    M: Metrix
  }
}
