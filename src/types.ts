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
    fw: FwEnum
    fs: FsEnum
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

export type FDFontStyle = 'Regular' | 'Bold' | 'Italic'

export type FontData = Readonly<{
  family: string
  fullName: string
  postscriptName: string
  style: FDFontStyle
  blob: () => Promise<Blob>
}>

export enum FsEnum {
  NORMAL = 'Normal',
  ITALIC = 'Italic',
}

export enum FwEnum {
  REGULAR = 'Regular',
  BOLD = 'Bold',
}

export type BuiltinFontData = Readonly<{
  family: string
  style: FDFontStyle
}>

export type FontMap = {
  [key: string]:
    | {
        fs: FsEnum[]
        fw: FwEnum[]
      }
    | undefined
}

declare global {
  var queryLocalFonts: (() => Promise<FontData[]>) | undefined
}
