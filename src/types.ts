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
  }
  draw: () => void
  init: () => void
}
