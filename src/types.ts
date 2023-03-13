export type Align = 'start' | 'right' | 'end'

export type Baseline =
  | 'alphabetic'
  | 'bottom'
  | 'hanging'
  | 'ideographic'
  | 'middle'
  | 'top'

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
