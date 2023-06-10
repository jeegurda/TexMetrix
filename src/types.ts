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

export interface IAdditionalBlStyle {
  display: boolean
}

export enum Fw {
  w100 = '100',
  w200 = '200',
  w300 = '300',
  w400 = '400',
  w500 = '500',
  w600 = '600',
  w700 = '700',
  w800 = '800',
  w900 = '900',
}

export interface IMetrix {
  text: string
  font: {
    ff: string
    fs: string
    useItalic: boolean
    useWeight: boolean
    useFs: boolean
    fw: Fw
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
      alphabeticBl: IAdditionalBlStyle
      hangingBl: IAdditionalBlStyle
      ideographicBl: IAdditionalBlStyle
    }

    shared: {
      cw: number
      ch: number
      fm: FontMap
      ctx: CanvasRenderingContext2D
      colors: {
        [key: string]: string | undefined
      }
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

// Manually extend TM interface with safari-only props
export interface IExtendedTextMetrics extends TextMetrics {
  alphabeticBaseline?: number
  hangingBaseline?: number
  ideographicBaseline?: number
}

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}
