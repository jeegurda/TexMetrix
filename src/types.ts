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
    text: string
    fs: string
    align: string
    baseline: string
    dpr: string
  }
  actions: {
    draw: () => void
    init: () => void
  }
}
