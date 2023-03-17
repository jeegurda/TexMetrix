import { te } from './utils'

const q = <T extends Element>(qs: string) =>
  document.querySelector<T>(qs) ?? te(`dom el missing (selector: ${qs})`)

const dom = {
  textInput: q<HTMLTextAreaElement>('.text-input'),
  fontSizeInput: q<HTMLInputElement>('.font-size-input'),
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
  lineInputs: {
    blAlign: {
      color: q<HTMLInputElement>('.bl-align-color-input'),
      width: q<HTMLInputElement>('.bl-align-width-input'),
    },
    fontBb: {
      color: q<HTMLInputElement>('.font-color-input'),
      width: q<HTMLInputElement>('.font-width-input'),
    },
    actualBb: {
      color: q<HTMLInputElement>('.actual-color-input'),
      width: q<HTMLInputElement>('.actual-width-input'),
    },
  },
} as const

export { dom }
