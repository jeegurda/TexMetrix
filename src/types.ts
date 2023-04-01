declare global {
  var queryLocalFonts: (() => Promise<FontData[]>) | undefined
}

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

export interface ILineStyle {
  width: number
  color: string
  display: boolean
}

export interface IMetrix {
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
      actualBb: ILineStyle
      fontBb: ILineStyle
      blAlign: ILineStyle
    }

    shared: {
      cw: number
      ch: number
      fm: FontMap
      ctx: CanvasRenderingContext2D
    }
  }
}

interface IFontData {
  family: string
  fullName: string
  postscriptName: string
  style: string
  blob: () => Promise<Blob>
}

export type FontData = Readonly<IFontData>

export type BuiltinFontData = Pick<
  FontData,
  'family' | 'fullName' | 'postscriptName' | 'style'
>

export interface IFont {
  fullName: string
  postscriptName: string
  style: string
}

export type FontMap = {
  [key: string]: IFont[] | undefined
}
