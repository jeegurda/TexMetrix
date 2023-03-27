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
    ff: string
    fs: string
    fsItalic: boolean
    fsBold: boolean
    size: number
    lh: number
    align: Align
    baseline: Baseline
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
      fm: FontMap
    }
  }
  draw: () => void
  init: () => void
}

export type FontData = Readonly<{
  family: string
  fullName: string
  postscriptName: string
  style: string
  blob: () => Promise<Blob>
}>

export type BuiltinFontData = Pick<
  FontData,
  'family' | 'fullName' | 'postscriptName' | 'style'
>

export type FontRecord = {
  fullName: string
  postscriptName: string
  style: string
}

export type FontMap = {
  [key: string]: FontRecord[] | undefined
}

declare global {
  var queryLocalFonts: (() => Promise<FontData[]>) | undefined
}
