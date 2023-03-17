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

export type LineStyle = {
  width: number
  color: string
  display: boolean
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
    lh: number
    align: Align
    baseline: Baseline
    rr: number
    style: {
      actualBb: LineStyle
      fontBb: LineStyle
      blAlign: LineStyle
    }

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
