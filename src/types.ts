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

    text: string
    fs: number
    align: Align
    baseline: Baseline
    dpr: number
  }
  draw: () => void
  init: () => void
}
