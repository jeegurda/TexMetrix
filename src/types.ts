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
  text: string
  font: {
    size: number
    lh: number
    align: Align
    baseline: Baseline
    fw: string
    fs: string
    ff: string
  }
  props: {
    rw: number
    rh: number

    drawX: number
    drawY: number

    scaleMp: number

    rr: number
    style: {
      actualBb: LineStyle
      fontBb: LineStyle
      blAlign: LineStyle
    }

    shared: {
      cw: number
      ch: number
    }
  }
  draw: () => void
  init: () => void
}

declare global {
  var queryLocalFonts: () => Promise<any>
}
