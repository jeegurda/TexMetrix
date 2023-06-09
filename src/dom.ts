import { te } from './utils'

const q = <T extends Element = Element>(qs: string) =>
  document.querySelector<T>(qs) ?? te(`dom el missing (selector: ${qs})`)

const dom = {
  document: document.documentElement,
  mainCss: q<HTMLLinkElement>('.main-css'),

  textInput: q<HTMLTextAreaElement>('.text-input'),
  ffInput: q<HTMLSelectElement>('.ff-input'),
  useFsInput: q<HTMLInputElement>('.use-fs-input'),
  fsInput: q<HTMLSelectElement>('.fs-input'),
  useItalicInput: q<HTMLInputElement>('.use-italic-input'),
  useWeightInput: q<HTMLInputElement>('.use-weight-input'),
  fwInput: q<HTMLSelectElement>('.fw-input'),
  localFontsButton: q<HTMLButtonElement>('.local-fonts-button'),
  fontSizeInput: q<HTMLInputElement>('.font-size-input'),
  fontSizeValue: q<HTMLSpanElement>('.font-size-value'),
  lhInput: q<HTMLInputElement>('.line-height-input'),
  lhValue: q<HTMLSpanElement>('.line-height-value'),
  alignInput: q<HTMLSelectElement>('.align-input'),
  baselineInput: q<HTMLSelectElement>('.baseline-input'),

  canvas: q<HTMLCanvasElement>('.canvas canvas'),
  canvasUi: q<HTMLDivElement>('.canvas-ui'),

  rrValue: q<HTMLSpanElement>('.rr-value'),
  dprValue: q<HTMLSpanElement>('.dpr-value'),
  rrInput: q<HTMLInputElement>('.rr-input'),
  canvasSizeValue: q<HTMLSpanElement>('.canvas-size-value'),
  renderPixelValue: q<HTMLSpanElement>('.render-pixel-value'),
  zoomValue: q<HTMLSpanElement>('.zoom-value'),
  lineStyle: {
    blAlign: {
      color: q<HTMLInputElement>('.bl-align-color-input'),
      width: q<HTMLInputElement>('.bl-align-width-input'),
      display: q<HTMLInputElement>('.bl-align-display-input'),
    },
    fontBb: {
      color: q<HTMLInputElement>('.font-color-input'),
      width: q<HTMLInputElement>('.font-width-input'),
      display: q<HTMLInputElement>('.font-display-input'),
    },
    actualBb: {
      color: q<HTMLInputElement>('.actual-color-input'),
      width: q<HTMLInputElement>('.actual-width-input'),
      display: q<HTMLInputElement>('.actual-display-input'),
    },
    alphabeticBl: {
      display: q<HTMLInputElement>('.alphabetic-bl-display-input'),
    },
    hangingBl: {
      display: q<HTMLInputElement>('.hanging-bl-display-input'),
    },
    ideographicBl: {
      display: q<HTMLInputElement>('.ideographic-bl-display-input'),
    },
  },

  disableDarkTheme: q<HTMLInputElement>('.disable-dark-theme-input'),
} as const

export { dom }
